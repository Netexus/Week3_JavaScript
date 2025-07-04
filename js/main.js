import { renderProducts } from './productUI.js';

const API_URL = 'http://localhost:3000/products';

// Cargar productos
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  renderProducts(products);
  bindDeleteButtons();
}

// Añadir producto
document.getElementById('productForm').addEventListener('submit', async e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);

  if (!name || isNaN(price)) {
    alert("Please enter valid data.");
    return;
  }

  const newProduct = { name, price };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });

  if (res.ok) {
    loadProducts();
    e.target.reset();
  } else {
    alert("Error adding product.");
  }
});

// Eliminar producto
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadProducts();
}

// Asignar eventos a botones de eliminar
function bindDeleteButtons() {
  setTimeout(() => {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        deleteProduct(id);
      });
    });
  }, 100);
}

loadProducts();
