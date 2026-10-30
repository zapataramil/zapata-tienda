// ==================== CONFIGURACIÓN ====================
const BACKEND_URL = 'https://zapata-tienda.vercel.app';
const mp = new MercadoPago('APP_USR-6fde5b3f-15bd-4519-8c3e-6106bd294e28', { locale: 'es-AR' });

// ==================== PRODUCTOS ====================
const productos = [
  {
    id: 1,
    nombre: 'Campera Engomada',
    precio: 30000,
    badge: 'NUEVO',
    categoria: 'ropa',
    imagenes: ['img/productos/campera-engomada-1.jpeg',
      'img/productos/campera-engomada-2.jpeg',
      'img/productos/campera-engomada-3.jpeg'],
    descripcion: 'Campera engomada de excelente calidad. Ideal para días de lluvia o looks urbanos.',
    talles: ['2', '3', '4'],
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Visón', hex: '#8B7355' },
      { nombre: 'Crema', hex: '#F5F5DC' }
    ]
  },
  {
    id: 2,
    nombre: 'Campera Top Engomada',
    precio: 22000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['img/productos/campera-top-engomada-1.jpeg',
      'img/productos/campera-top-engomada-2.jpeg',
      'img/productos/campera-top-engomada-3.jpeg'],
    descripcion: 'Campera top engomada, tiro corto. Súper versátil.',
    talles: ['2', '4'],
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Visón', hex: '#8B7355' },
      { nombre: 'Crema', hex: '#F5F5DC' }
    ]
  },
  {
    id: 3,
    nombre: 'Remera Microtull con Encaje',
    precio: 10000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800'],
    descripcion: 'Remera de microtull con detalles de encaje. Muy delicada y femenina.',
    talles: ['S-M'], // Talle único que cubre S y M
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Blanco', hex: '#FFFFFF' }
    ]
  },
  {
    id: 4,
    nombre: 'Remera Boxy Fit',
    precio: 11000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['img/productos/remera-boxy-fit-1.jpeg',
      'img/productos/remera-boxy-fit-2.jpeg',
      'img/productos/remera-boxy-fit-3.jpeg',
              'img/productos/remera-boxy-fit-4.jpeg',
      'img/productos/remera-boxy-fit-5.jpeg',
      'img/productos/remera-boxy-fit-6.jpeg',
              'img/productos/remera-boxy-fit-7.jpeg',
      'img/productos/remera-boxy-fit-8.jpeg',
      'img/productos/remera-boxy-fit-9.jpeg',
              'img/productos/remera-boxy-fit-10.jpeg'],
    descripcion: 'Remera de corte holgado (boxy fit). Súper cómoda para el día a día.',
    talles: ['M-XL'], // Talle único que cubre M a XL
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Celeste', hex: '#87CEEB' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Beige', hex: '#F5F5DC' },
      { nombre: 'Durazno', hex: '#FFDAB9' }
    ]
  },
  {
    id: 5,
    nombre: 'Remera Oversize',
    precio: 13000,
    badge: null,
    categoria: 'ropa',
    imagenes:  ['img/productos/remera-oversize-1.jpeg',
      'img/productos/remera-oversize-2.jpeg'],
    descripcion: 'Remera oversize, caída perfecta. Un básico que no puede faltar.',
    talles: ['M-XL'], 
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Beige', hex: '#F5F5DC' }
    ]
  },
  {
    id: 6,
    nombre: 'Remera Básica',
    precio: 11000,
    badge: null,
    categoria: 'ropa',
    imagenes:  ['img/productos/remera-basica-1.jpeg',
      'img/productos/remera-basica-2.jpeg',
               'img/productos/remera-basica-3.jpeg',
      'img/productos/remera-basica-4.jpeg'],
    descripcion: 'Remera básica de algodón. Calidad premium.',
    talles: ['S-L'], 
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Blanco', hex: '#FFFFFF' }
    ]
  },
  {
    id: 7,
    nombre: 'Vestido Aura',
    precio: 24000,
    badge: 'NUEVO',
    categoria: 'ropa',
    imagenes: ['img/productos/vestido-aura-1.jpeg',
      'img/productos/vestido-aura-2.jpeg',
      'img/productos/vestido-aura-3.jpeg',
      'img/productos/vestido-aura-4.jpeg'],
               
    descripcion: 'Vestido Aura, diseño exclusivo de ZAPATA. Elegante y con una caída increíble.',
    talles: ['S-M'], 
    colores: [
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Bordo', hex: '#800000' },
      { nombre: 'Chocolate', hex: '#7B3F00' },
      { nombre: 'Blanco', hex: '#FFFFFF' }
    ]
  },
  {
    id: 8,
    nombre: 'Body Microtull con Encaje',
    precio: 13000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['https://images.unsplash.com/photo-1564257577352-c2e2c4c1e7d0?w=800'],
    descripcion: 'Body de microtull con encaje. Ideal para looks nocturnos.',
    talles: ['S-M'],
    colores: [
      { nombre: 'Negro', hex: '#000000' }
    ]
  },
  {
    id: 9,
    nombre: 'Body Luna',
    precio: 13000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['https://images.unsplash.com/photo-1515347619152-6467b52c4849?w=800'],
    descripcion: 'Body Luna, tela elastizada que se adapta perfecto al cuerpo.',
    talles: ['S-M'],
    colores: [
      { nombre: 'Negro', hex: '#000000' }
    ]
  },
  {
    id: 10,
    nombre: 'Body Cierre',
    precio: 13000,
    badge: null,
    categoria: 'ropa',
    imagenes: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'],
    descripcion: 'Body con cierre delantero. Detalle súper moderno.',
    talles: ['S-M'],
    colores: [
      { nombre: 'Negro', hex: '#000000' }
    ]
  }
];

// ==================== ESTADO ====================
let carrito = JSON.parse(localStorage.getItem('zapata-carrito')) || [];
let productoActual = null;
let imagenActualIndex = 0;
let talleSeleccionado = null;
let colorSeleccionado = null;
let cantidadSeleccionada = 1;
let tallesCardSeleccionados = {}; 
let coloresCardSeleccionados = {};

// ==================== FUNCIÓN DE FLORES ====================
function lanzarFlores(e) {
  if (e.stopPropagation) e.stopPropagation();
  const elemento = e.currentTarget;
  elemento.style.transform = 'scale(1.5)';
  setTimeout(() => { elemento.style.transform = 'scale(1)'; }, 200);
  const emojis = ['🌸', '🌺', '🌷', '🌹', '💐', '✨'];
  const rect = elemento.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const flor = document.createElement('div');
      flor.className = 'flor-animada';
      flor.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const offsetX = (Math.random() - 0.5) * 150; 
      flor.style.left = `${startX + offsetX}px`;
      flor.style.top = `${startY}px`;
      document.body.appendChild(flor);
      setTimeout(() => flor.remove(), 2000);
    }, i * 100);
  }
}

// ==================== LÓGICA DE ENTREGA Y VALIDACIÓN ====================
function cambiarMetodoEntrega() {
  const metodo = document.querySelector('input[name="metodo-entrega"]:checked').value;
  
  document.getElementById('form-domicilio').style.display = metodo === 'domicilio' ? 'block' : 'none';
  document.getElementById('form-retiro').style.display = metodo === 'retiro' ? 'block' : 'none';
  document.getElementById('form-encuentro').style.display = metodo === 'encuentro' ? 'block' : 'none';
  
  actualizarCarrito(); 
}

function validarFormulario() {
  const metodo = document.querySelector('input[name="metodo-entrega"]:checked').value;
  const nombre = document.getElementById('nombre-comprador').value.trim();
  const telefono = document.getElementById('telefono-comprador').value.trim();
  
  let valido = (nombre !== '' && telefono !== '');

  if (metodo === 'domicilio') {
    const dir = document.getElementById('dir-calle').value.trim();
    const entre = document.getElementById('dir-entre-calles').value.trim();
    const prov = document.getElementById('dir-provincia').value;
    const loc = document.getElementById('dir-localidad').value.trim();
    const cp = document.getElementById('dir-cp').value.trim();
    
    if (!dir || !entre || !prov || !loc || !cp) {
      valido = false;
    }
  }

  const btnPagar = document.getElementById('btn-pagar');
  if (valido && carrito.length > 0) {
    btnPagar.disabled = false;
  } else {
    btnPagar.disabled = true;
  }
}

// ==================== FILTRO CATEGORÍAS ====================
function filtrarCategoria(cat) {
  let filtrados = cat === 'todos' ? productos : productos.filter(p => p.categoria === cat);
  renderizarProductos(filtrados);
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// ==================== RENDER PRODUCTOS ====================
function renderizarProductos(lista = productos) {
  const grid = document.getElementById('grid-productos');
  grid.innerHTML = lista.map(p => {
    // Si solo hay un talle (como "S-M"), lo seleccionamos automáticamente
    if (p.talles.length === 1) tallesCardSeleccionados[p.id] = p.talles[0];
    if (p.colores.length === 1) coloresCardSeleccionados[p.id] = p.colores[0].nombre;

    return `
    <div class="card-producto">
      ${p.badge ? `<span class="card-badge ${p.badge === '-20%' ? 'badge-sale' : ''}">${p.badge}</span>` : ''}
      <button class="btn-fav" onclick="lanzarFlores(event)"><i class="fa-regular fa-heart"></i></button>
      
      <div class="card-img-wrap" onclick="abrirDetalle(${p.id})">
        <img src="${p.imagenes[0]}" alt="${p.nombre}" loading="lazy">
      </div>
      
      <div class="info-producto">
        <h3 onclick="abrirDetalle(${p.id})">${p.nombre}</h3>
        <p class="precio">
          $${p.precio.toLocaleString('es-AR')} 
          ${p.precioViejo ? `<span class="precio-viejo">$${p.precioViejo.toLocaleString('es-AR')}</span>` : ''}
        </p>
        
        <div class="card-variaciones">
          <div class="card-colores">
            ${p.colores.map((c, index) => `
              <button class="color-btn ${p.colores.length === 1 && index === 0 ? 'activo' : ''}" 
                      style="background:${c.hex}; ${c.hex === '#FFFFFF' ? 'border: 1px solid #ccc;' : ''}" 
                      onclick="seleccionarColorCard(${p.id}, '${c.nombre}', this)" title="${c.nombre}"></button>
            `).join('')}
          </div>
          <div class="card-talles">
            ${p.talles.map((t, index) => `
              <button class="talle-btn ${p.talles.length === 1 && index === 0 ? 'activo' : ''}" 
                      onclick="seleccionarTalleCard(${p.id}, '${t}', this)">${t}</button>
            `).join('')}
          </div>
        </div>
        
        <button class="btn-agregar-card" onclick="agregarDesdeCard(${p.id})">
          <i class="fa-solid fa-cart-shopping"></i> Agregar
        </button>
      </div>
    </div>
  `}).join('');
}

// ==================== SELECCIÓN DESDE LA TARJETA ====================
function seleccionarTalleCard(idProducto, talle, btn) {
  tallesCardSeleccionados[idProducto] = talle;
  const card = btn.closest('.card-producto');
  card.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

function seleccionarColorCard(idProducto, color, btn) {
  coloresCardSeleccionados[idProducto] = color;
  const card = btn.closest('.card-producto');
  card.querySelectorAll('.color-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

function agregarDesdeCard(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  const talle = tallesCardSeleccionados[idProducto];
  const color = coloresCardSeleccionados[idProducto];
  
  if (!talle) { alert('Por favor, seleccioná un talle antes de agregar al carrito.'); return; }
  if (!color) { alert('Por favor, seleccioná un color antes de agregar al carrito.'); return; }
  
  agregarAlCarritoConVariantes(producto, talle, color, 1);
}

// ==================== MODAL DETALLE ====================
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

function actualizarGaleria() {
  if (!productoActual) return;
  document.getElementById('galeria-imagen').src = productoActual.imagenes[imagenActualIndex];
  const contMini = document.getElementById('galeria-miniaturas');
  contMini.innerHTML = productoActual.imagenes.map((img, i) => `
    <img src="${img}" class="${i === imagenActualIndex ? 'activa' : ''}" onclick="cambiarImagen(${i})" alt="Foto ${i + 1}">
  `).join('');
}

function cambiarImagen(index) { imagenActualIndex = index; actualizarGaleria(); }
document.getElementById('galeria-prev').addEventListener('click', () => { if (productoActual) { imagenActualIndex = (imagenActualIndex - 1 + productoActual.imagenes.length) % productoActual.imagenes.length; actualizarGaleria(); } });
document.getElementById('galeria-next').addEventListener('click', () => { if (productoActual) { imagenActualIndex = (imagenActualIndex + 1) % productoActual.imagenes.length; actualizarGaleria(); } });

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

document.getElementById('btn-sumar').addEventListener('click', () => { cantidadSeleccionada++; document.getElementById('input-cantidad').value = cantidadSeleccionada; });
document.getElementById('btn-restar').addEventListener('click', () => { if (cantidadSeleccionada > 1) { cantidadSeleccionada--; document.getElementById('input-cantidad').value = cantidadSeleccionada; } });

document.getElementById('btn-agregar-detalle').addEventListener('click', () => {
  if (!talleSeleccionado) { alert('Por favor, elegí un talle antes de continuar.'); return; }
  if (!colorSeleccionado) { alert('Por favor, elegí un color antes de continuar.'); return; }
  agregarAlCarritoConVariantes(productoActual, talleSeleccionado, colorSeleccionado.nombre, cantidadSeleccionada);
  cerrarModalProducto();
});

// ==================== CARRITO Y TOTALES ====================
function agregarAlCarritoConVariantes(producto, talle, color, cantidad) {
  const idUnico = `${producto.id}-${talle}-${color}`;
  const existente = carrito.find(item => item.idUnico === idUnico);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ idUnico, id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagenes[0], talle, color, cantidad });
  }

  guardarCarrito();
  actualizarCarrito();
  document.getElementById('modal-carrito').classList.add('activo');
}

function guardarCarrito() { localStorage.setItem('zapata-carrito', JSON.stringify(carrito)); }

function actualizarCarrito() {
  const contador = document.getElementById('contador');
  const stickyCount = document.getElementById('sticky-count');
  const lista = document.getElementById('lista-carrito');
  const subtotalSpan = document.getElementById('subtotal-carrito');
  const envioSpan = document.getElementById('costo-envio');
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

  // CÁLCULO DE ENVÍO DINÁMICO Y CARTELES DE TIEMPO
  const metodo = document.querySelector('input[name="metodo-entrega"]:checked').value;
  let costoEnvio = 0;
  const mensajeRapido = document.getElementById('mensaje-envio-rapido');
  const mensajeNormal = document.getElementById('mensaje-envio-normal');
  
  if (metodo === 'domicilio') {
    const provinciaSeleccionada = document.getElementById('dir-provincia').value;
    
    if (provinciaSeleccionada === 'CABA' || provinciaSeleccionada === 'Buenos Aires Conurbano Zona Sur') {
      costoEnvio = provinciaSeleccionada === 'CABA' ? 9000 : 8000;
      mensajeRapido.style.display = 'block';
      mensajeNormal.style.display = 'none';
    } else if (provinciaSeleccionada === 'Buenos Aires') {
      costoEnvio = 19900;
      mensajeRapido.style.display = 'none';
      mensajeNormal.style.display = 'block';
    } else if (provinciaSeleccionada !== '') {
      costoEnvio = 26900;
      mensajeRapido.style.display = 'none';
      mensajeNormal.style.display = 'block';
    } else {
      costoEnvio = 0;
      mensajeRapido.style.display = 'none';
      mensajeNormal.style.display = 'none';
    }

  } else if (metodo === 'encuentro') {
    costoEnvio = 3000;
    mensajeRapido.style.display = 'none';
    mensajeNormal.style.display = 'none';
  } else {
    costoEnvio = 0;
    mensajeRapido.style.display = 'none';
    mensajeNormal.style.display = 'none';
  }

  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const total = subtotal + costoEnvio;

  subtotalSpan.textContent = subtotal.toLocaleString('es-AR');
  envioSpan.textContent = costoEnvio.toLocaleString('es-AR');
  totalSpan.textContent = total.toLocaleString('es-AR');
  stickyTotal.textContent = subtotal.toLocaleString('es-AR');
  
  validarFormulario();
}

// ==================== LÓGICA DE SCROLL ====================
let lastScrollTop = 0;
const stickyCartBar = document.getElementById('sticky-cart');
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 50) { mainHeader.classList.add('scrolled'); } else { mainHeader.classList.remove('scrolled'); }
  if (carrito.length === 0) return;
  if (scrollTop > lastScrollTop && scrollTop > 100) { stickyCartBar.classList.remove('visible'); } else { stickyCartBar.classList.add('visible'); }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

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

// ==================== CORAZÓN DEL FOOTER ====================
const btnCorazonFooter = document.getElementById('btn-footer-heart');
if (btnCorazonFooter) { btnCorazonFooter.addEventListener('click', lanzarFlores); }

// ==================== PAGAR ====================
document.getElementById('btn-pagar').addEventListener('click', async () => {
  if (carrito.length === 0) { alert('Tu carrito está vacío.'); return; }
  
  const metodo = document.querySelector('input[name="metodo-entrega"]:checked').value;
  const nombre = document.getElementById('nombre-comprador').value.trim();
  const telefono = document.getElementById('telefono-comprador').value.trim();
  
  if (!nombre || !telefono) { alert('Por favor, completá tus datos de contacto.'); return; }
  
  let orderData = {
    metodoEnvio: metodo === 'domicilio' ? 'Envío a Domicilio' : (metodo === 'retiro' ? 'Retiro en Tienda' : 'Punto de Encuentro'),
    nombre: nombre,
    telefono: telefono,
    productos: carrito.map(i => `${i.nombre} (Talle ${i.talle}, ${i.color}) x${i.cantidad}`),
  };

  if (metodo === 'domicilio') {
    const dir = document.getElementById('dir-calle').value.trim();
    const entre = document.getElementById('dir-entre-calles').value.trim();
    const prov = document.getElementById('dir-provincia').value;
    const loc = document.getElementById('dir-localidad').value.trim();
    const cp = document.getElementById('dir-cp').value.trim();
    const depto = document.getElementById('dir-depto').value.trim();
    
    if (!dir || !entre || !prov || !loc || !cp) { alert('Por favor, completá tu dirección, localidad y provincia.'); return; }
    
    orderData.direccion = `${dir} (entre ${entre})`;
    orderData.localidad = loc;
    orderData.provincia = prov;
    orderData.codigoPostal = cp;
    orderData.departamento = depto || 'No especificado';
  } else if (metodo === 'encuentro') {
    orderData.direccion = 'Punto de Encuentro (Zona Sur)';
    orderData.localidad = 'A coordinar';
    orderData.provincia = 'Buenos Aires';
  } else {
    orderData.direccion = 'Retiro en Tienda (Wilde)';
    orderData.localidad = 'Wilde';
    orderData.provincia = 'Buenos Aires';
  }

  const btn = document.getElementById('btn-pagar');
  btn.disabled = true;
  btn.textContent = 'Redirigiendo...';

  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const costoEnvio = parseInt(document.getElementById('costo-envio').textContent.replace(/\./g, '')) || 0;
  
  let itemsParaMP = carrito.map(item => ({
    nombre: `${item.nombre} (Talle ${item.talle}, ${item.color})`,
    precio: item.precio,
    cantidad: item.cantidad
  }));

  if (costoEnvio > 0) {
    itemsParaMP.push({
      nombre: `Costo de Envío - ${orderData.metodoEnvio}`,
      precio: costoEnvio,
      cantidad: 1
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/crear-preferencia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        items: itemsParaMP,
        orderData: orderData
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
    const mensaje = carrito.map(i => `• ${i.nombre} (Talle ${i.talle}) x${i.cantidad}`).join('%0A') 
      + `%0A%0A*Datos de Entrega:*%0AMétodo: ${orderData.metodoEnvio}%0ANombre: ${nombre}%0ATeléfono: ${telefono}`;
    window.open(`https://wa.me/5491128619100?text=Hola!%20Quiero%20hacer%20un%20pedido:%0A${mensaje}`, '_blank');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Pagar con MercadoPago';
  }
});

// ==================== INIT ====================
renderizarProductos();
actualizarCarrito();
cambiarMetodoEntrega();
