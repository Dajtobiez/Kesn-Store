document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  const addProductBtn = document.getElementById('addProductBtn');
  const productModal = document.getElementById('productModal');
  const productForm = document.getElementById('productForm');
  const modalTitle = document.getElementById('modalTitle');
  const cancelBtn = document.getElementById('cancelBtn');

  // Sample product data
  let products = [
    { id: 'SP001', name: 'KD18 EIBL EP', category: 'giay-the-thao', stock: 50 },
    { id: 'SP002', name: 'Giày da nam', category: 'giay-da', stock: 8 },
    { id: 'SP003', name: 'Dây giày phản quang', category: 'phu-kien', stock: 0 }
  ];

  // Render product table
  function renderTable(data) {
    productTable.innerHTML = '';
    data.forEach(product => {
      const row = document.createElement('tr');
      row.className = 'border-b';
      row.innerHTML = `
        <td class="px-4 py-3 card-title">${product.id}</td>
        <td class="px-4 py-3">${product.name}</td>
        <td class="px-4 py-3">${product.category === 'giay-the-thao' ? 'Giày thể thao' : product.category === 'giay-da' ? 'Giày da' : 'Phụ kiện'}</td>
        <td class="px-4 py-3 ${product.stock <= 10 ? 'text-red-600' : product.stock === 0 ? 'text-gray-600' : 'text-green-600'}">${product.stock}</td>
        <td class="px-4 py-3">
          <button class="edit-btn text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>
          <button class="delete-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
        </td>
      `;
      productTable.appendChild(row);
    });

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => editProduct(btn.closest('tr')));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(btn.closest('tr')));
    });
  }

  // Filter and search products
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const stock = stockFilter.value;

    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (stock) {
      filtered = filtered.filter(product => {
        if (stock === 'low') return product.stock <= 10 && product.stock > 0;
        if (stock === 'in-stock') return product.stock > 10;
        if (stock === 'out-of-stock') return product.stock === 0;
      });
    }
    renderTable(filtered);
  }

  // Open modal for adding product
  addProductBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Thêm sản phẩm';
    productForm.reset();
    productModal.classList.remove('hidden');
  });

  // Open modal for editing product
  function editProduct(row) {
    const id = row.cells[0].textContent;
    const product = products.find(p => p.id === id);
    modalTitle.textContent = 'Sửa sản phẩm';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;
    productModal.classList.remove('hidden');
  }

  // Delete product
  function deleteProduct(row) {
    const id = row.cells[0].textContent;
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      products = products.filter(p => p.id !== id);
      filterProducts();
    }
  }

  // Handle form submission
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value);

    if (modalTitle.textContent === 'Thêm sản phẩm') {
      products.push({ id, name, category, stock });
    } else {
      const index = products.findIndex(p => p.id === id);
      products[index] = { id, name, category, stock };
    }

    productModal.classList.add('hidden');
    filterProducts();
  });

  // Close modal
  cancelBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
  });

  // Initialize table
  renderTable(products);

  // Event listeners for filters
  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  stockFilter.addEventListener('change', filterProducts);
});