document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('add-product');
    const productModal = document.getElementById('product-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const filterDanhMuc = document.getElementById('filter-danhmuc');
    const filterThuongHieu = document.getElementById('filter-thuonghieu');
    const searchProduct = document.getElementById('search-product');
    const deleteModal = document.getElementById('delete-modal');
    const cancelDelete = document.getElementById('cancel-delete');
    const confirmDelete = document.getElementById('confirm-delete');
    const chitietContainer = document.getElementById('chitiet-container');
    const addMauBtn = document.getElementById('add-mau');

    // Dữ liệu mẫu
    let products = [
        {
            MaSP: 'SP001',
            TenSP: 'KD18 EIBL EP',
            DanhMuc: 'Giày bóng rổ',
            ThuongHieu: 'Nike',
            MoTa: 'Giày bóng rổ hiệu suất cao với công nghệ đệm Zoom Air.',
            Anh: ['https://example.com/kd18-black.jpg', 'https://example.com/kd18-white.jpg'],
            ChiTiet: [
                {
                    Mau: 'Đen',
                    Sizes: [
                        { Size: '42', SoLuong: 10, Gia: 4000000 },
                        { Size: '43', SoLuong: 5, Gia: 4000000 }
                    ]
                },
                {
                    Mau: 'Trắng',
                    Sizes: [
                        { Size: '41', SoLuong: 8, Gia: 4100000 }
                    ]
                }
            ]
        },
        {
            MaSP: 'SP002',
            TenSP: 'Ultraboost 22',
            DanhMuc: 'Giày thể thao',
            ThuongHieu: 'Adidas',
            MoTa: 'Giày chạy bộ với đế Boost êm ái, phù hợp mọi địa hình.',
            Anh: ['https://example.com/ultraboost.jpg'],
            ChiTiet: [
                {
                    Mau: 'Xanh',
                    Sizes: [
                        { Size: '40', SoLuong: 15, Gia: 3500000 },
                        { Size: '41', SoLuong: 12, Gia: 3500000 }
                    ]
                }
            ]
        },
        {
            MaSP: 'SP003',
            TenSP: 'Dây giày phản quang',
            DanhMuc: 'Phụ kiện',
            ThuongHieu: 'Converse',
            MoTa: 'Dây giày phát sáng trong bóng tối, bền bỉ.',
            Anh: ['https://example.com/laces.jpg'],
            ChiTiet: [
                {
                    Mau: 'Đỏ',
                    Sizes: [
                        { Size: 'N/A', SoLuong: 50, Gia: 100000 }
                    ]
                }
            ]
        }
    ];

    let deleteMaSP = null;

    // Kiểm tra phần tử
    if (!productList) console.error('Không tìm thấy product-list');
    if (!addProductBtn) console.error('Không tìm thấy add-product');
    if (!productModal) console.error('Không tìm thấy product-modal');
    if (!cancelModal) console.error('Không tìm thấy cancel-modal');
    if (!productForm) console.error('Không tìm thấy product-form');
    if (!modalTitle) console.error('Không tìm thấy modal-title');
    if (!filterDanhMuc) console.error('Không tìm thấy filter-danhmuc');
    if (!filterThuongHieu) console.error('Không tìm thấy filter-thuonghieu');
    if (!searchProduct) console.error('Không tìm thấy search-product');
    if (!deleteModal) console.error('Không tìm thấy delete-modal');
    if (!cancelDelete) console.error('Không tìm thấy cancel-delete');
    if (!confirmDelete) console.error('Không tìm thấy confirm-delete');
    if (!chitietContainer) console.error('Không tìm thấy chitiet-container');
    if (!addMauBtn) console.error('Không tìm thấy add-mau');

    function renderProducts(filteredProducts) {
        if (!productList) return;
        productList.innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${index + 1}</td>
                <td class="p-3">${product.MaSP}</td>
                <td class="p-3">${product.TenSP}</td>
                <td class="p-3">${product.DanhMuc}</td>
                <td class="p-3">${product.ThuongHieu}</td>
                <td class="p-3">${product.ChiTiet.reduce((acc, mau) => acc + mau.Sizes.length, 0)}</td>
                <td class="p-3">${product.ChiTiet.map(mau => mau.Sizes.map(s => s.Size).join(', ')).join('; ')}</td>
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
        const thuongHieu = filterThuongHieu?.value;
        const searchTerm = searchProduct?.value.toLowerCase();
        let filteredProducts = products;

        if (danhMuc) filteredProducts = filteredProducts.filter(p => p.DanhMuc === danhMuc);
        if (thuongHieu) filteredProducts = filteredProducts.filter(p => p.ThuongHieu === thuongHieu);
        if (searchTerm) filteredProducts = filteredProducts.filter(p => 
            p.MaSP.toLowerCase().includes(searchTerm) || 
            p.TenSP.toLowerCase().includes(searchTerm)
        );

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
            document.getElementById('thuonghieu').value = product.ThuongHieu;
            document.getElementById('mota').value = product.MoTa;
            document.getElementById('anh').value = product.Anh.join(', ');
            chitietContainer.innerHTML = '';
            product.ChiTiet.forEach(mau => addMau(mau.Mau, mau.Sizes));
        } else {
            productForm.reset();
            document.getElementById('masp').disabled = false;
            chitietContainer.innerHTML = '';
            addMau();
        }
        productModal.classList.remove('hidden');
    }

    function addMau(mauValue = 'Đen', sizes = [{ Size: '36', SoLuong: 0, Gia: 0 }]) {
        const mauItem = document.createElement('div');
        mauItem.className = 'mau-item';
        mauItem.innerHTML = `
            <select class="mau" required>
                <option value="Đen" ${mauValue === 'Đen' ? 'selected' : ''}>Đen</option>
                <option value="Trắng" ${mauValue === 'Trắng' ? 'selected' : ''}>Trắng</option>
                <option value="Xanh" ${mauValue === 'Xanh' ? 'selected' : ''}>Xanh</option>
                <option value="Đỏ" ${mauValue === 'Đỏ' ? 'selected' : ''}>Đỏ</option>
            </select>
            <div class="size-details"></div>
            <button type="button" class="add-size bg-blue-600 text-white px-2 py-1 rounded">Thêm kích thước</button>
            <button type="button" class="delete-mau bg-red-600 text-white px-2 py-1 rounded">Xóa màu</button>
        `;
        chitietContainer.appendChild(mauItem);
        const sizeDetails = mauItem.querySelector('.size-details');
        sizes.forEach(size => addSize(sizeDetails, size));
        bindMauEvents(mauItem);
    }

    function addSize(sizeDetails, size = { Size: '36', SoLuong: 0, Gia: 0 }) {
        const sizeContainer = document.createElement('div');
        sizeContainer.className = 'size-chitiet-container';
        const sizeChiTiet = document.createElement('div');
        sizeChiTiet.className = 'size-chitiet';
        sizeChiTiet.innerHTML = `
            <select class="size">
                ${[36,37,38,39,40,41,42,43,44,45,46,47].map(s => `<option value="${s}" ${size.Size === s.toString() ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
            <input type="number" class="soluong" placeholder="Số lượng" value="${size.SoLuong}" required>
            <input type="number" class="gia" placeholder="Giá" value="${size.Gia}" required>
            <button type="button" class="delete-size bg-red-600 text-white px-2 py-1 rounded">Xóa kích thước</button>
        `;
        sizeContainer.appendChild(sizeChiTiet);
        sizeDetails.appendChild(sizeContainer);
        bindSizeEvents(sizeChiTiet);
    }

    function bindMauEvents(mauItem) {
        mauItem.querySelector('.add-size').addEventListener('click', () => addSize(mauItem.querySelector('.size-details')));
        mauItem.querySelector('.delete-mau').addEventListener('click', () => mauItem.remove());
    }

    function bindSizeEvents(sizeChiTiet) {
        sizeChiTiet.querySelector('.delete-size').addEventListener('click', () => sizeChiTiet.parentElement.remove());
    }

    if (addProductBtn) addProductBtn.addEventListener('click', () => openModal('add'));
    if (cancelModal) cancelModal.addEventListener('click', () => productModal?.classList.add('hidden'));
    if (addMauBtn) addMauBtn.addEventListener('click', () => addMau());

    if (productList) {
        productList.addEventListener('click', function (e) {
            const masp = e.target.getAttribute('data-masp');
            if (e.target.classList.contains('edit')) {
                const product = products.find(p => p.MaSP === masp);
                if (product) openModal('edit', product);
            } else if (e.target.classList.contains('delete')) {
                deleteMaSP = masp;
                deleteModal?.classList.remove('hidden');
            }
        });
    }

    if (cancelDelete) cancelDelete.addEventListener('click', () => deleteModal?.classList.add('hidden'));
    if (confirmDelete) confirmDelete.addEventListener('click', () => {
        if (deleteMaSP) {
            products = products.filter(p => p.MaSP !== deleteMaSP);
            filterProducts();
            deleteModal?.classList.add('hidden');
            deleteMaSP = null;
        }
    });

    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const chiTiet = [];
            chitietContainer.querySelectorAll('.mau-item').forEach(mauItem => {
                const mau = mauItem.querySelector('.mau').value;
                const sizes = [];
                mauItem.querySelectorAll('.size-chitiet').forEach(size => {
                    sizes.push({
                        Size: size.querySelector('.size').value,
                        SoLuong: parseInt(size.querySelector('.soluong').value),
                        Gia: parseInt(size.querySelector('.gia').value)
                    });
                });
                chiTiet.push({ Mau: mau, Sizes: sizes });
            });

            const product = {
                MaSP: document.getElementById('masp').value,
                TenSP: document.getElementById('tensp').value,
                DanhMuc: document.getElementById('danhmuc').value,
                ThuongHieu: document.getElementById('thuonghieu').value,
                MoTa: document.getElementById('mota').value,
                Anh: document.getElementById('anh').value.split(',').map(url => url.trim()),
                ChiTiet: chiTiet
            };

            const existingIndex = products.findIndex(p => p.MaSP === product.MaSP);
            if (existingIndex >= 0) {
                products[existingIndex] = product;
            } else {
                products.push(product);
            }

            filterProducts();
            productModal?.classList.add('hidden');
        });
    }

    if (filterDanhMuc) filterDanhMuc.addEventListener('change', filterProducts);
    if (filterThuongHieu) filterThuongHieu.addEventListener('change', filterProducts);
    if (searchProduct) searchProduct.addEventListener('input', filterProducts);

    // Render dữ liệu mẫu
    renderProducts(products);
});