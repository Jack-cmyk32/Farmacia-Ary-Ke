window.onload = function() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const resumenDiv = document.getElementById("resumen-compra");
    const totalDiv = document.getElementById("total-compra");
    let total = 0;
  
    cart.forEach((producto, index) => {
      const prodDiv = document.createElement("div");
      prodDiv.classList.add("producto-resumen");
      prodDiv.innerHTML = `<p>${index + 1}. ${producto.nombre} - €${producto.precio}</p>`;
      resumenDiv.appendChild(prodDiv);
      total += producto.precio;
    });
    totalDiv.innerHTML = `Total: €${total.toFixed(2)}`;
  
  
    document.getElementById("form-pago").addEventListener("submit", function(e) {
      e.preventDefault(); 
  
     
      let nombreTarjeta = document.getElementById("nombre-tarjeta").value;
      let numeroTarjeta = document.getElementById("numero-tarjeta").value;
      let expiracionTarjeta = document.getElementById("expiracion-tarjeta").value;
      let cvvTarjeta = document.getElementById("cvv-tarjeta").value;
  
      // Validar que se hayan llenado todos los campos (aunque sea de fachada)
      if (!nombreTarjeta || !numeroTarjeta || !expiracionTarjeta || !cvvTarjeta) {
        alert("Por favor, complete todos los campos.");
        return;
      }
  
     
      setTimeout(() => {
        alert("Pago realizado correctamente");
      
        document.getElementById("form-pago").style.display = "none";
        document.getElementById("mensaje-exito").style.display = "block";
        document.getElementById("descargar-factura-btn").style.display = "block";
        
        localStorage.removeItem("cart");
      }, 1000);
    });
  
    document.getElementById("descargar-factura-btn").addEventListener("click", function() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Factura de Compra", 20, 20);
      doc.setFontSize(12);
      let y = 30;
      cart.forEach((producto, index) => {
        doc.text(`${index + 1}. ${producto.nombre} - €${producto.precio}`, 20, y);
        y += 10;
      });
      doc.text(`Total: €${total.toFixed(2)}`, 20, y + 10);
      doc.save("factura.pdf");
    });
  };
  