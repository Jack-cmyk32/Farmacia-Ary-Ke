function updateCartCount() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('cart-count').textContent = totalCount;
}
updateCartCount();

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('click', function() {
  
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseFloat(card.getAttribute('data-price'));
    const image = card.getAttribute('data-image');
    const description = card.getAttribute('data-description');


    document.getElementById('modal-product-image').src = image;
    document.getElementById('modal-product-name').textContent = name;
    document.getElementById('modal-product-description').textContent = description;
    document.getElementById('modal-product-price').textContent = price.toFixed(2);
    document.getElementById('modal-product-quantity').value = 1;

    const addButton = document.getElementById('modal-add-to-cart');
    addButton.setAttribute('data-id', id);
    addButton.setAttribute('data-name', name);
    addButton.setAttribute('data-price', price);
    addButton.setAttribute('data-image', image);

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
  });
});


document.getElementById('modal-add-to-cart').addEventListener('click', function() {
  const id = this.getAttribute('data-id');
  const name = this.getAttribute('data-name');
  const price = parseFloat(this.getAttribute('data-price'));
  const image = this.getAttribute('data-image');
  const quantity = parseInt(document.getElementById('modal-product-quantity').value) || 1;

  
  const producto = {
    id: id,
    nombre: name,
    precio: price,
    cantidad: quantity,
    imagen: image
  };


  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
 
  const indexExistente = carrito.findIndex(item => item.id === id);
  if(indexExistente >= 0) {
    carrito[indexExistente].cantidad += quantity;
  } else {
    carrito.push(producto);
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  updateCartCount();
  alert('Producto agregado al carrito');

 
  const productModalEl = document.getElementById('productModal');
  const productModalInstance = bootstrap.Modal.getInstance(productModalEl);
  productModalInstance.hide();
});