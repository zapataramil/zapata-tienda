import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {
  // ==================== CORS ====================
  // Permite que tu tienda en github.io llame a este backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder al "preflight" que hace el navegador antes del POST
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map(item => ({
          title: item.nombre,
          unit_price: Number(item.precio),
          quantity: Number(item.cantidad),
          currency_id: 'ARS'
        })),
        back_urls: {
          success: 'https://zapataramil.github.io/zapata-tienda/pago-exitoso.html',
          failure: 'https://zapataramil.github.io/zapata-tienda/pago-fallido.html',
          pending: 'https://zapataramil.github.io/zapata-tienda/pago-pendiente.html'
        },
        auto_return: 'approved',
        statement_descriptor: 'ZAPATA INDUMENTARIA',
        notification_url: `${process.env.BACKEND_URL}/api/webhook`
      }
    });

    res.status(200).json({ id: result.id });
  } catch (error) {
    console.error('Error MP:', error);
    res.status(500).json({ 
      error: 'Error al crear la preferencia', 
      detalle: error.message 
    });
  }
}
