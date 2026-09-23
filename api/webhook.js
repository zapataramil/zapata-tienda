import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  // ==================== CORS ====================
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Responder 200 INMEDIATAMENTE (MercadoPago espera respuesta rápida)
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

    console.log(`💳 Pago ${paymentId} — Estado: ${status} — Pedido: ${orderId}`);

    if (status === 'approved') {
      console.log(`✅ PAGO APROBADO — Pedido: ${orderId}`);
      // TODO: guardar pedido, enviar WhatsApp, etc.
    }

  } catch (error) {
    console.error('Error webhook:', error);
  }
}
