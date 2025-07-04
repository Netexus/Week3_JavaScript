export function renderProducts(products) {
  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
      <button data-id="\${product.id}" class="delete-btn">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
