import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

export const config = {
  api: {
    bodyParser: false // Necesario para validar la firma HMAC
  }
};

export default async function handler(req, res) {
  // Responder 200 INMEDIATAMENTE (MercadoPago espera respuesta rápida)
  res.status(200).send('OK');

  try {
    const body = JSON.parse(req.body.toString());

    // Validar firma HMAC (opcional pero recomendado)
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

    // Procesar solo notificaciones de pagos
    if (body.type !== 'payment') return;

    const paymentId = body.data?.id;
    if (!paymentId) return;

    // Consultar el pago real a MercadoPago
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    const orderId = paymentInfo.external_reference;
    const status = paymentInfo.status;

    console.log(`💳 Pago ${paymentId} — Estado: ${status}`);

    if (status === 'approved') {
      console.log(`✅ PAGO APROBADO — Pedido: ${orderId}`);
      // TODO: Guardar pedido, enviar WhatsApp, actualizar stock
    }

  } catch (error) {
    console.error('Error webhook:', error);
  }
}