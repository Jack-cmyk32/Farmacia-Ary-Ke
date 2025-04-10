
let carrito = [];
const modalProducto = document.getElementById('modalProducto');
const modalCarrito = document.getElementById('modalCarrito');
let productoActual = {};
function abrirModalProducto(nombre, imagen, precio, descripcion) {
  productoActual = { nombre, imagen, precio, descripcion };
  document.getElementById('nombre-modal').innerText = nombre;
  document.getElementById('img-modal').src = imagen;
  document.getElementById('precio-modal').innerText = precio;
  document.getElementById('desc-modal').innerText = descripcion;
  modalProducto.style.display = 'block';
}
function cerrarModalProducto() {
  modalProducto.style.display = 'none';
}
function agregarAlCarrito() {
  carrito.push(productoActual);
  actualizarContadorCarrito();
  cerrarModalProducto();
  alert(`${productoActual.nombre} añadido al carrito`);
}
function actualizarContadorCarrito() {
  document.getElementById('contador-carrito').innerText = carrito.length;
}

function abrirCarrito() {
  const contenidoCarrito = document.getElementById('contenido-carrito');
  contenidoCarrito.innerHTML = ""; 
  
  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto-carrito');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="50" />
        <span>${producto.nombre}</span>
        <span>€${producto.precio}</span>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      contenidoCarrito.appendChild(productoDiv);
    });
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-carrito');
    totalDiv.innerHTML = `Total: €${total.toFixed(2)}`;
    contenidoCarrito.appendChild(totalDiv);
  }
  modalCarrito.style.display = 'block';
}
function cerrarCarrito() {
  modalCarrito.style.display = 'none';
}
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarContadorCarrito();
  abrirCarrito(); // Refresca la lista del carrito
}


function pagar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("Redirigiendo a la página de pago...");

}

window.onclick = function(event) {
  if (event.target === modalProducto) {
    cerrarModalProducto();
  } else if (event.target === modalCarrito) {
    cerrarCarrito();
  }
};function pagar() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    localStorage.setItem('cart', JSON.stringify(carrito));
    window.location.href = 'pago.html';
  }