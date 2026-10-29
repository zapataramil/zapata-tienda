import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';
import { Resend } from 'resend';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

// Inicializamos Resend con tu API Key
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

  res.status(200).send('OK');

  try {
    const body = JSON.parse(req.body.toString());

    // Validar firma HMAC
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (xSignature && xRequestId && process.env.MP_WEBHOOK_SECRET) {
      const partes = xSignature.split(',');
      const ts = partes.find(p => p.startsWith('ts='))?.replace('ts=', '');
      const v1 = partes.find(p => p.startsWith('v1='))?.replace('v1=', '');

      const dataId = body.data?.id || req.query['data.id'];
      const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

      const hmac = crypto
        .createHmac('sha256', process.env.MP_WEBHOOK_SECRET)
        .update(manifest)
        .digest('hex');

      if (hmac !== v1) {
        console.warn('⚠️ Firma del webhook inválida');
        return;
      }
    }

    if (body.type !== 'payment') return;

    const paymentId = body.data?.id;
    if (!paymentId) return;

    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    const orderId = paymentInfo.external_reference;
    const status = paymentInfo.status;
    const monto = paymentInfo.transaction_amount;

    console.log(`💳 Pago ${paymentId} — Estado: ${status} — Pedido: ${orderId}`);

    if (status === 'approved') {
      console.log(`✅ PAGO APROBADO — Pedido: ${orderId}`);

      // Recuperamos los datos del comprador desde metadata
      const metadata = paymentInfo.metadata || {};
      const cliente = metadata.cliente || {};

      // Construimos el HTML del correo con todos los datos
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

      // Enviamos el correo con Resend
      try {
        await resend.emails.send({
          from: 'ZAPATA Indumentaria <onboarding@resend.dev>', // Cambiar por tu dominio verificado en producción
          to: [process.env.EMAIL_DESTINO], // Tu correo personal
          subject: `🛍️ Nueva venta - Pedido ${orderId}`,
          html: htmlEmail,
        });
        console.log('📧 Correo de venta enviado con éxito');
      } catch (emailError) {
        console.error('Error al enviar el correo:', emailError);
      }
    }

  } catch (error) {
    console.error('Error webhook:', error);
  }
}
