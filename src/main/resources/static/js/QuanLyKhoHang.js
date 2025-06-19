document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('add-product');
    const productModal = document.getElementById('product-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const filterDanhMuc = document.getElementById('filter-danhmuc');
    const filterTrangThai = document.getElementById('filter-trangthai');
    const searchProduct = document.getElementById('search-product');

    // Kiểm tra các phần tử cần thiết
    if (!productList) console.error('Không tìm thấy phần tử với id="product-list"');
    if (!addProductBtn) console.error('Không tìm thấy phần tử với id="add-product"');
    if (!productModal) console.error('Không tìm thấy phần tử với id="product-modal"');
    if (!cancelModal) console.error('Không tìm thấy phần tử với id="cancel-modal"');
    if (!productForm) console.error('Không tìm thấy phần tử với id="product-form"');
    if (!modalTitle) console.error('Không tìm thấy phần tử với id="modal-title"');
    if (!filterDanhMuc) console.error('Không tìm thấy phần tử với id="filter-danhmuc"');
    if (!filterTrangThai) console.error('Không tìm thấy phần tử với id="filter-trangthai"');
    if (!searchProduct) console.error('Không tìm thấy phần tử với id="search-product"');

    let products = [
        {
            MaSP: 'SP001',
            TenSP: 'KD18 EIBL EP',
            DanhMuc: 'Giày thể thao',
            SoLuong: 50
        },
        {
            MaSP: 'SP002',
            TenSP: 'Giày da nam',
            DanhMuc: 'Giày da',
            SoLuong: 8
        },
        {
            MaSP: 'SP003',
            TenSP: 'Dây giày phản quang',
            DanhMuc: 'Phụ kiện',
            SoLuong: 0
        }
    ];

    function renderProducts(filteredProducts) {
        if (!productList) return;
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${product.MaSP}</td>
                <td class="p-3">${product.TenSP}</td>
                <td class="p-3">${product.DanhMuc}</td>
                <td class="p-3">${product.SoLuong}</td>
                <td class="p-3">
                    <button class="action-button edit" data-masp="${product.MaSP}">Chỉnh sửa</button>
                    <button class="action-button delete" data-masp="${product.MaSP}">Xóa</button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    function filterProducts() {
        const danhMuc = filterDanhMuc?.value;
        const trangThai = filterTrangThai?.value;
        const searchTerm = searchProduct?.value.toLowerCase();
        let filteredProducts = products;

        if (danhMuc) {
            filteredProducts = filteredProducts.filter(prod => prod.DanhMuc === danhMuc);
        }
        if (trangThai) {
            filteredProducts = filteredProducts.filter(prod => {
                if (trangThai === 'Sắp hết') return prod.SoLuong > 0 && prod.SoLuong < 10;
                if (trangThai === 'Còn hàng') return prod.SoLuong >= 10;
                if (trangThai === 'Hết hàng') return prod.SoLuong === 0;
                return true;
            });
        }
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(prod => 
                prod.MaSP.toLowerCase().includes(searchTerm) || 
                prod.TenSP.toLowerCase().includes(searchTerm)
            );
        }

        renderProducts(filteredProducts);
    }

    function openModal(mode, product = null) {
        if (!modalTitle || !productForm || !productModal) return;
        modalTitle.textContent = mode === 'add' ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm';
        if (mode === 'edit' && product) {
            document.getElementById('masp').value = product.MaSP;
            document.getElementById('masp').disabled = true;
            document.getElementById('tensp').value = product.TenSP;
            document.getElementById('danhmuc').value = product.DanhMuc;
            document.getElementById('soluong').value = product.SoLuong;
        } else {
            productForm.reset();
            document.getElementById('masp').disabled = false;
        }
        productModal.classList.remove('hidden');
    }

    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openModal('add'));
    }

    if (cancelModal) {
        cancelModal.addEventListener('click', () => {
            if (productModal) productModal.classList.add('hidden');
        });
    }

    if (productList) {
        productList.addEventListener('click', function (e) {
            const masp = e.target.getAttribute('data-masp');
            if (e.target.classList.contains('edit')) {
                const product = products.find(prod => prod.MaSP === masp);
                if (product) openModal('edit', product);
            } else if (e.target.classList.contains('delete')) {
                products = products.filter(prod => prod.MaSP !== masp);
                filterProducts();
            }
        });
    }

    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const product = {
                MaSP: document.getElementById('masp').value,
                TenSP: document.getElementById('tensp').value,
                DanhMuc: document.getElementById('danhmuc').value,
                SoLuong: parseInt(document.getElementById('soluong').value)
            };

            const existingIndex = products.findIndex(prod => prod.MaSP === product.MaSP);
            if (existingIndex >= 0) {
                products[existingIndex] = product;
            } else {
                products.push(product);
            }

            filterProducts();
            if (productModal) productModal.classList.add('hidden');
        });
    }

    if (filterDanhMuc) filterDanhMuc.addEventListener('change', filterProducts);
    if (filterTrangThai) filterTrangThai.addEventListener('change', filterProducts);
    if (searchProduct) searchProduct.addEventListener('input', filterProducts);

    // Khởi tạo
    renderProducts(products);
});