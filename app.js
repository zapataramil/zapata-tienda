// ==================== CONFIGURACIÓN ====================
const BACKEND_URL = 'https://zapata-tienda.vercel.app';

// ==================== PRODUCTOS ====================
const productos = [
  {
    id: 1,
    nombre: 'Vestido Floral Primavera',
    precio: 12500,
    imagenes: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'
    ],
    descripcion: 'Vestido largo con estampado floral, tela liviana ideal para media estación. Corte holgado, manga corta y cintura elastizada.',
    talles: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Floral Rosa', hex: '#FFB6C1' },
      { nombre: 'Floral Azul', hex: '#87CEEB' }
    ]
  },
  {
    id: 2,
    nombre: 'Blusa de Seda Elegante',
    precio: 8200,
    imagenes: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800',
      'https://images.unsplash.com/photo-1564257577352-c2e2c4c1e7d0?w=800'
    ],
    descripcion: 'Blusa de seda con cuello redondo y manga larga. Suave al tacto, caída fluida. Perfecta para look formal o casual.',
    talles: ['S', 'M', 'L'],
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Rosa', hex: '#FF1493' }
    ]
  },
  {
    id: 3,
    nombre: 'Falda Midi Plisada',
    precio: 9400,
    imagenes: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    descripcion: 'Falda midi plisada con cintura elastizada. Largo por debajo de la rodilla. Combina con todo.',
    talles: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Beige', hex: '#D4C4A8' },
      { nombre: 'Verde', hex: '#7C9A6B' }
    ]
  },
  {
    id: 4,
    nombre: 'Blazer Oversize',
    precio: 15200,
    imagenes: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    descripcion: 'Blazer oversize con solapa clásica y botón frontal. Ideal para elevar cualquier outfit.',
    talles: ['S', 'M', 'L'],
    colores: [
      { nombre: 'Beige', hex: '#D4C4A8' },
      { nombre: 'Negro', hex: '#000000' }
    ]
  },
  {
    id: 5,
    nombre: 'Top Tejido Artesanal',
    precio: 6800,
    imagenes: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800'
    ],
    descripcion: 'Top tejido a mano con hilo de algodón. Liviano, fresco y único. Ideal para el verano.',
    talles: ['Único'],
    colores: [
      { nombre: 'Natural', hex: '#E8DCC4' },
      { nombre: 'Rosa', hex: '#FF1493' }
    ]
  },
  {
    id: 6,
    nombre: 'Pantalón Palazzo Negro',
    precio: 10300,
    imagenes: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'
    ],
    descripcion: 'Pantalón palazzo de pierna ancha y tiro alto. Cómodo, elegante y versátil. Cintura elastizada.',
    talles: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Azul Marino', hex: '#1B2845' }
    ]
  }
];

// ==================== FLORES ====================
const FLORES = ['🌸', '🌺', '🌷', '💐', '🌹', '🌸'];

// ==================== ESTADO ====================
let carrito = JSON.parse(localStorage.getItem('zapata-carrito')) || [];
let productoActual = null;
let imagenActualIndex = 0;
let talleSeleccionado = null;
let colorSeleccionado = null;
let cantidadSeleccionada = 1;

// ==================== RENDER PRODUCTOS ====================
function renderizarProductos() {
  const grid = document.getElementById('grid-productos');
  grid.innerHTML = productos.map(p => `
    <div class="card-producto" onclick="abrirDetalle(${p.id})">
      <div class="card-flores">
        ${FLORES.map((flor, i) => `<span class="flor flor-${i + 1}">${flor}</span>`).join('')}
      </div>
      <img src="${p.imagenes[0]}" alt="${p.nombre}" loading="lazy">
      <div class="info-producto">
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio.toLocaleString('es-AR')}</p>
        <button class="btn-agregar" onclick="event.stopPropagation(); abrirDetalle(${p.id})">
          Ver producto
        </button>
      </div>
    </div>
  `).join('');
}

// ==================== ABRIR DETALLE ====================
function abrirDetalle(id) {
  productoActual = productos.find(p => p.id === id);
  if (!productoActual) return;

  imagenActualIndex = 0;
  talleSeleccionado = null;
  colorSeleccionado = null;
  cantidadSeleccionada = 1;

  document.getElementById('detalle-nombre').textContent = productoActual.nombre;
  document.getElementById('detalle-precio').textContent = productoActual.precio.toLocaleString('es-AR');
  document.getElementById('detalle-descripcion').textContent = productoActual.descripcion;

  actualizarGaleria();

  const contTalles = document.getElementById('opciones-talles');
  contTalles.innerHTML = productoActual.talles.map(t => `
    <button class="opcion-talle" onclick="seleccionarTalle('${t}', this)">${t}</button>
  `).join('');

  const contColores = document.getElementById('opciones-colores');
  contColores.innerHTML = productoActual.colores.map(c => `
    <button class="opcion-color" onclick="seleccionarColor('${c.nombre}', '${c.hex}', this)" title="${c.nombre}">
      <span class="muestra-color" style="background:${c.hex}; ${c.hex === '#FFFFFF' ? 'border: 1px solid #ddd;' : ''}"></span>
      <span class="nombre-color">${c.nombre}</span>
    </button>
  `).join('');

  document.getElementById('input-cantidad').value = 1;

  document.getElementById('modal-producto').classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// ==================== GALERÍA ====================
function actualizarGaleria() {
  if (!productoActual) return;

  document.getElementById('galeria-imagen').src = productoActual.imagenes[imagenActualIndex];

  const contMini = document.getElementById('galeria-miniaturas');
  contMini.innerHTML = productoActual.imagenes.map((img, i) => `
    <img src="${img}" class="${i === imagenActualIndex ? 'activa' : ''}"
         onclick="cambiarImagen(${i})" alt="Foto ${i + 1}">
  `).join('');
}

function cambiarImagen(index) {
  imagenActualIndex = index;
  actualizarGaleria();
}

document.getElementById('galeria-prev').addEventListener('click', () => {
  if (!productoActual) return;
  imagenActualIndex = (imagenActualIndex - 1 + productoActual.imagenes.length) % productoActual.imagenes.length;
  actualizarGaleria();
});

document.getElementById('galeria-next').addEventListener('click', () => {
  if (!productoActual) return;
  imagenActualIndex = (imagenActualIndex + 1) % productoActual.imagenes.length;
  actualizarGaleria();
});

// ==================== SELECCIONES ====================
function seleccionarTalle(talle, btn) {
  talleSeleccionado = talle;
  document.querySelectorAll('.opcion-talle').forEach(b => b.classList.remove('seleccionado'));
  btn.classList.add('seleccionado');
}

function seleccionarColor(nombre, hex, btn) {
  colorSeleccionado = { nombre, hex };
  document.querySelectorAll('.opcion-color').forEach(b => b.classList.remove('seleccionado'));
  btn.classList.add('seleccionado');
}

document.getElementById('btn-sumar').addEventListener('click', () => {
  cantidadSeleccionada++;
  document.getElementById('input-cantidad').value = cantidadSeleccionada;
});

document.getElementById('btn-restar').addEventListener('click', () => {
  if (cantidadSeleccionada > 1) {
    cantidadSeleccionada--;
    document.getElementById('input-cantidad').value = cantidadSeleccionada;
  }
});

// ==================== AGREGAR DESDE DETALLE ====================
document.getElementById('btn-agregar-detalle').addEventListener('click', () => {
  if (!talleSeleccionado) {
    alert('Por favor, elegí un talle antes de continuar.');
    return;
  }
  if (!colorSeleccionado) {
    alert('Por favor, elegí un color antes de continuar.');
    return;
  }

  agregarAlCarritoConVariantes(
    productoActual,
    talleSeleccionado,
    colorSeleccionado.nombre,
    cantidadSeleccionada
  );

  cerrarModalProducto();
});

// ==================== CARRITO ====================
function agregarAlCarritoConVariantes(producto, talle, color, cantidad) {
  const idUnico = `${producto.id}-${talle}-${color}`;
  const existente = carrito.find(item => item.idUnico === idUnico);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      idUnico,
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes[0],
      talle,
      color,
      cantidad
    });
  }

  guardarCarrito();
  actualizarCarrito();

  const btn = document.getElementById('btn-carrito');
  btn.style.transform = 'scale(1.1)';
  setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
}

function guardarCarrito() {
  localStorage.setItem('zapata-carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
  const contador = document.getElementById('contador');
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contador.textContent = totalItems;

  if (carrito.length === 0) {
    lista.innerHTML = '<li style="justify-content:center;color:#999;padding:2rem 0;">El carrito está vacío</li>';
  } else {
    lista.innerHTML = carrito.map(item => `
      <li>
        <div class="item-info">
          <span class="item-nombre">${item.nombre}</span>
          <span class="item-detalle">Talle ${item.talle} · ${item.color}</span>
          <strong>x${item.cantidad}</strong>
        </div>
        <span class="item-precio">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
      </li>
    `).join('');
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalSpan.textContent = total.toLocaleString('es-AR');
}

// ==================== MODALES ====================
function cerrarModalProducto() {
  document.getElementById('modal-producto').classList.remove('activo');
  document.body.style.overflow = '';
}

document.getElementById('btn-cerrar-producto').addEventListener('click', cerrarModalProducto);

document.getElementById('modal-producto').addEventListener('click', (e) => {
  if (e.target.id === 'modal-producto') cerrarModalProducto();
});

document.getElementById('btn-guia-talles').addEventListener('click', () => {
  document.getElementById('modal-talles').classList.add('activo');
});

document.getElementById('btn-cerrar-talles').addEventListener('click', () => {
  document.getElementById('modal-talles').classList.remove('activo');
});

document.getElementById('modal-talles').addEventListener('click', (e) => {
  if (e.target.id === 'modal-talles') e.target.classList.remove('activo');
});

document.getElementById('btn-carrito').addEventListener('click', () => {
  document.getElementById('modal-carrito').classList.add('activo');
});

document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-carrito').classList.remove('activo');
});

document.getElementById('modal-carrito').addEventListener('click', (e) => {
  if (e.target.id === 'modal-carrito') e.target.classList.remove('activo');
});

document.getElementById('btn-vaciar').addEventListener('click', () => {
  if (confirm('¿Vaciar el carrito?')) {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalProducto();
    document.getElementById('modal-carrito').classList.remove('activo');
    document.getElementById('modal-talles').classList.remove('activo');
  }
});

// ==================== PAGAR ====================
document.getElementById('btn-pagar').addEventListener('click', async () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agregá productos antes de pagar.');
    return;
  }

  const btn = document.getElementById('btn-pagar');
  btn.disabled = true;
  btn.textContent = 'Redirigiendo...';

  try {
    const response = await fetch(`${BACKEND_URL}/api/crear-preferencia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: carrito.map(item => ({
          nombre: `${item.nombre} (Talle ${item.talle}, ${item.color})`,
          precio: item.precio,
          cantidad: item.cantidad
        }))
      })
    });

    const data = await response.json();

    if (data.id) {
      const mp = new MercadoPago('TU_PUBLIC_KEY_AQUI', { locale: 'es-AR' });
      mp.checkout({
        preference: { id: data.id },
        autoOpen: true
      });
    } else {
      throw new Error('No se pudo crear la preferencia');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema. Te redirigimos a WhatsApp para completar tu pedido.');
    const mensaje = carrito.map(i => `• ${i.nombre} (Talle ${i.talle}, ${i.color}) x${i.cantidad}`).join('%0A');
    window.open(`https://wa.me/5491128619100?text=Hola!%20Quiero%20hacer%20un%20pedido:%0A${mensaje}`, '_blank');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Pagar con MercadoPago';
  }
});

// ==================== INIT ====================
renderizarProductos();
actualizarCarrito();