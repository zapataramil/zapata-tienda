import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Resend } from 'resend';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    if (Buffer.isBuffer(body)) {
      try { body = JSON.parse(body.toString()); } catch (e) { body = {}; }
    }
    if (!body) body = {};

    const type = body.type || req.query.type || req.query.topic;
    const paymentId = body.data?.id || req.query['data.id'] || req.query.id;

    console.log(`🔔 Webhook recibido - Tipo: ${type} - ID del Pago: ${paymentId}`);

    if (type !== 'payment' || !paymentId) {
      console.log('⏭️ No es un pago válido o falta el ID. Ignorando.');
      return res.status(200).send('Ignorado');
    }

    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    const orderId = paymentInfo.external_reference || 'Sin ID de orden';
    const status = paymentInfo.status;
    const monto = paymentInfo.transaction_amount;

    console.log(`💳 Pago ${paymentId} — Estado: ${status} — Pedido: ${orderId}`);

    if (status === 'approved') {
      console.log(`✅ PAGO APROBADO — Preparando correo para ${orderId}`);

      const metadata = paymentInfo.metadata || {};
      const cliente = metadata.cliente || {};

      const htmlEmail = `
        <h2>🎉 ¡Nueva venta en ZAPATA!</h2>
        <p><strong>Pedido:</strong> ${orderId}</p>
        <p><strong>Monto total pagado:</strong> $${monto.toLocaleString('es-AR')}</p>
        
        <h3>📦 Datos del Envío</h3>
        <p><strong>Método:</strong> ${cliente.metodoEnvio || 'No especificado'}</p>
        <p><strong>Dirección:</strong> ${cliente.direccion || 'No especificada'}</p>
        <p><strong>Localidad:</strong> ${cliente.localidad || 'No especificada'}</p>
        <p><strong>Provincia:</strong> ${cliente.provincia || 'No especificada'}</p>
        <p><strong>Código Postal:</strong> ${cliente.codigoPostal || 'No especificado'}</p>
        
        <h3>👤 Datos de Contacto</h3>
        <p><strong>Nombre:</strong> ${cliente.nombre || 'No especificado'}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefono || 'No especificado'}</p>
        
        <h3>🛍️ Productos</h3>
        <ul>
          ${cliente.productos?.map(prod => `<li>${prod}</li>`).join('') || '<li>No hay detalles de productos</li>'}
        </ul>
        
        <br>
        <p><em>Este es un aviso automático de tu tienda ZAPATA.</em></p>
      `;

      try {
        await resend.emails.send({
          from: 'ZAPATA Indumentaria <onboarding@resend.dev>',
          to: [process.env.EMAIL_DESTINO],
          subject: `🛍️ Nueva venta - Pedido ${orderId}`,
          html: htmlEmail,
        });
        console.log('📧 Correo de venta enviado con éxito');
      } catch (emailError) {
        console.error('❌ Error al enviar el correo con Resend:', emailError);
      }
    }

    // AHORA RESPONDEMOS OK AL FINAL DE TODO
    return res.status(200).send('OK');

  } catch (error) {
    console.error('❌ Error general en el webhook:', error);
    // Aunque haya error, le decimos OK a MercadoPago para que no reintente infinitamente
    return res.status(200).send('Error manejado');
  }
}
