// ==================== CONFIGURACIÓN ====================
const BACKEND_URL = 'https://zapata-tienda.vercel.app';
const mp = new MercadoPago('APP_USR-6fde5b3f-15bd-4519-8c3e-6106bd294e28', { locale: 'es-AR' });

// ==================== PRODUCTOS ====================
const productos = [
  {
    id: 1,
    nombre: 'Top Morley',
    precio: 18900,
    badge: 'NUEVO',
    imagenes: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'],
    descripcion: 'Top de morley ajustado, tela elastizada. Ideal para looks casuales.',
    talles: ['S', 'M', 'L'],
    colores: [{ nombre: 'Negro', hex: '#000000' }]
  },
  {
    id: 2,
    nombre: 'Pantalón Cargo',
    precio: 32900,
    badge: null,
    imagenes: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'],
    descripcion: 'Pantalón cargo tiro alto, pierna ancha. Súper cómodo.',
    talles: ['S', 'M', 'L'],
    colores: [{ nombre: 'Negro', hex: '#000000' }]
  },
  {
    id: 3,
    nombre: 'Buzo Crop',
    precio: 28900,
    badge: 'NUEVO',
    imagenes: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
    descripcion: 'Buzo crop oversize, frisa de algodón.',
    talles: ['S', 'M', 'L'],
    colores: [{ nombre: 'Blanco', hex: '#FFFFFF' }]
  },
  {
    id: 4,
    nombre: 'Zapatillas Urbanas',
    precio: 45900,
    badge: null,
    imagenes: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'],
    descripcion: 'Zapatillas urbanas blancas, suela gruesa.',
    talles: ['36', '37', '38', '39', '40'],
    colores: [{ nombre: 'Blanco', hex: '#FFFFFF' }]
  },
  {
    id: 5,
    nombre: 'Cartera Negra',
    precio: 24900,
    badge: null,
    imagenes: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800'],
    descripcion: 'Cartera de cuero sintético, con manija y correa.',
    talles: ['Único'],
    colores: [{ nombre: 'Negro', hex: '#000000' }]
  },
  {
    id: 6,
    nombre: 'Lentes de Sol',
    precio: 16900,
    badge: null,
    imagenes: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'],
    descripcion: 'Lentes de sol con protección UV400, marco negro.',
    talles: ['Único'],
    colores: [{ nombre: 'Negro', hex: '#000000' }]
  },
  {
    id: 7,
    nombre: 'Musculosa Rib',
    precio: 15900,
    precioViejo: 19900,
    badge: '-20%',
    imagenes: ['https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800'],
    descripcion: 'Musculosa de rib, tela suave y fresca.',
    talles: ['S', 'M', 'L'],
    colores: [{ nombre: 'Rosa', hex: '#FFB6C1' }]
  },
  {
    id: 8,
    nombre: 'Blazer Oversize',
    precio: 49900,
    badge: null,
    imagenes: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
    descripcion: 'Blazer oversize, caída perfecta. Forrado.',
    talles: ['S', 'M', 'L'],
    colores: [{ nombre: 'Negro', hex: '#000000' }]
  }
];

// ==================== ESTADO ====================
let carrito = JSON.parse(localStorage.getItem('zapata-carrito')) || [];
let productoActual = null;
let imagenActualIndex = 0;
let talleSeleccionado = null;
let colorSeleccionado = null;
let cantidadSeleccionada = 1;
let tallesCardSeleccionados = {}; // Guarda los talles elegidos en la tarjeta

// ==================== RENDER PRODUCTOS ====================
function renderizarProductos() {
  const grid = document.getElementById('grid-productos');
  grid.innerHTML = productos.map(p => `
    <div class="card-producto">
      ${p.badge ? `<span class="card-badge ${p.badge === '-20%' ? 'badge-sale' : ''}">${p.badge}</span>` : ''}
      <button class="btn-fav"><i class="fa-regular fa-heart"></i></button>
      
      <div class="card-img-wrap" onclick="abrirDetalle(${p.id})">
        <img src="${p.imagenes[0]}" alt="${p.nombre}" loading="lazy">
      </div>
      
      <div class="info-producto">
        <h3 onclick="abrirDetalle(${p.id})">${p.nombre}</h3>
        <p class="precio">
          $${p.precio.toLocaleString('es-AR')} 
          ${p.precioViejo ? `<span class="precio-viejo">$${p.precioViejo.toLocaleString('es-AR')}</span>` : ''}
        </p>
        
        <div class="card-talles">
          ${p.talles.map(t => `
            <button class="talle-btn" onclick="seleccionarTalleCard(${p.id}, '${t}', this)">${t}</button>
          `).join('')}
        </div>
        
        <button class="btn-agregar-card" onclick="agregarDesdeCard(${p.id})">
          <i class="fa-solid fa-cart-shopping"></i> Agregar al carrito
        </button>
      </div>
    </div>
  `).join('');
}

// ==================== SELECCIÓN DESDE LA TARJETA ====================
function seleccionarTalleCard(idProducto, talle, btn) {
  tallesCardSeleccionados[idProducto] = talle;
  // Quitar la clase 'activo' de los otros botones de ESTA tarjeta
  const card = btn.closest('.card-producto');
  card.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('activo'));
  // Poner 'activo' en el botón clickeado
  btn.classList.add('activo');
}

function agregarDesdeCard(idProducto) {
  const talle = tallesCardSeleccionados[idProducto];
  if (!talle) {
    alert('Por favor, seleccioná un talle primero.');
    return;
  }
  const producto = productos.find(p => p.id === idProducto);
  // Como no hay selector de color en la tarjeta, usamos el primero por defecto
  const colorDefecto = producto.colores[0].nombre;
  agregarAlCarritoConVariantes(producto, talle, colorDefecto, 1);
}

// ==================== ABRIR DETALLE (MODAL) ====================
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
    <img src="${img}" class="${i === imagenActualIndex ? 'activa' : ''}" onclick="cambiarImagen(${i})" alt="Foto ${i + 1}">
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

// ==================== SELECCIONES MODAL ====================
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

// ==================== AGREGAR DESDE MODAL ====================
document.getElementById('btn-agregar-detalle').addEventListener('click', () => {
  if (!talleSeleccionado) { alert('Por favor, elegí un talle antes de continuar.'); return; }
  if (!colorSeleccionado) { alert('Por favor, elegí un color antes de continuar.'); return; }

  agregarAlCarritoConVariantes(productoActual, talleSeleccionado, colorSeleccionado.nombre, cantidadSeleccionada);
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
      idUnico, id: producto.id, nombre: producto.nombre, precio: producto.precio,
      imagen: producto.imagenes[0], talle, color, cantidad
    });
  }

  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('zapata-carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
  const contador = document.getElementById('contador');
  const stickyCount = document.getElementById('sticky-count');
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  const stickyTotal = document.getElementById('sticky-total');
  const stickyCartBar = document.getElementById('sticky-cart');

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contador.textContent = totalItems;
  stickyCount.textContent = totalItems;

  if (carrito.length === 0) {
    lista.innerHTML = '<li style="justify-content:center;color:#999;padding:2rem 0;">El carrito está vacío</li>';
    stickyCartBar.classList.remove('visible');
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
    stickyCartBar.classList.add('visible');
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalSpan.textContent = total.toLocaleString('es-AR');
  stickyTotal.textContent = total.toLocaleString('es-AR');
}

// ==================== MODALES ====================
function cerrarModalProducto() {
  document.getElementById('modal-producto').classList.remove('activo');
  document.body.style.overflow = '';
}

document.getElementById('btn-cerrar-producto').addEventListener('click', cerrarModalProducto);
document.getElementById('modal-producto').addEventListener('click', (e) => { if (e.target.id === 'modal-producto') cerrarModalProducto(); });

document.getElementById('btn-guia-talles').addEventListener('click', () => document.getElementById('modal-talles').classList.add('activo'));
document.getElementById('btn-cerrar-talles').addEventListener('click', () => document.getElementById('modal-talles').classList.remove('activo'));
document.getElementById('modal-talles').addEventListener('click', (e) => { if (e.target.id === 'modal-talles') e.target.classList.remove('activo'); });

document.getElementById('btn-carrito').addEventListener('click', () => document.getElementById('modal-carrito').classList.add('activo'));
document.getElementById('btn-abrir-carrito-desde-barra').addEventListener('click', () => document.getElementById('modal-carrito').classList.add('activo'));
document.getElementById('btn-cerrar-modal').addEventListener('click', () => document.getElementById('modal-carrito').classList.remove('activo'));
document.getElementById('modal-carrito').addEventListener('click', (e) => { if (e.target.id === 'modal-carrito') e.target.classList.remove('activo'); });

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
  if (carrito.length === 0) { alert('Tu carrito está vacío. Agregá productos antes de pagar.'); return; }

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
      mp.checkout({ preference: { id: data.id }, autoOpen: true });
    } else {
      throw new Error('No se pudo crear la preferencia');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema. Te redirigimos a WhatsApp para completar tu pedido.');
    const mensaje = carrito.map(i => `• ${i.nombre} (Talle ${i.talle}) x${i.cantidad}`).join('%0A');
    window.open(`https://wa.me/5491128619100?text=Hola!%20Quiero%20hacer%20un%20pedido:%0A${mensaje}`, '_blank');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Pagar con MercadoPago';
  }
});

// ==================== INIT ====================
renderizarProductos();
actualizarCarrito();
