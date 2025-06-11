document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        productList: document.getElementById('product-list'),
        addProductBtn: document.getElementById('add-product'),
        productModal: document.getElementById('product-modal'),
        cancelModalBtn: document.getElementById('cancel-modal'),
        productForm: document.getElementById('product-form'),
        modalTitle: document.getElementById('modal-title'),
        searchInput: document.getElementById('search-product'),
        filterDanhMuc: document.getElementById('filter-danhmuc'),
        filterThuongHieu: document.getElementById('filter-thuonghieu'),
        deleteModal: document.getElementById('delete-modal'),
        cancelDeleteBtn: document.getElementById('cancel-delete'),
        confirmDeleteBtn: document.getElementById('confirm-delete'),
        addMauBtn: document.getElementById('add-mau'),
        chitietContainer: document.getElementById('chitietsanpham')
    };

    const sizeMap = {
        'SIZE001': 36, 'SIZE002': 37, 'SIZE003': 38, 'SIZE004': 39, 'SIZE005': 40,
        'SIZE006': 41, 'SIZE007': 42, 'SIZE008': 43, 'SIZE009': 44, 'SIZE010': 45,
        'SIZE011': 46, 'SIZE012': 47
    };

    let products = [
        {
            MaSP: 'SP001', Ten: 'Nike KD18 EIBL EP', MaDM: 'DM001', MaTH: 'TH001', MoTa: 'Giày bóng rổ Kevin Durant, đế EIBL tối ưu cho cầu thủ chuyên nghiệp.',
            AnhSanPham: ['img/kd18_1.jpg', 'img/kd18_2.jpg', 'img/kd18_3.jpg'],
            ChiTiet: [
                { MaMau: 'MAU001', MaSize: 'SIZE007', Gia: 4000000, SoLuong: 25 },
                { MaMau: 'MAU002', MaSize: 'SIZE008', Gia: 4000000, SoLuong: 20 },
                { MaMau: 'MAU003', MaSize: 'SIZE009', Gia: 4100000, SoLuong: 15 }
            ]
        },
        {
            MaSP: 'SP002', Ten: 'Adidas Ultraboost', MaDM: 'DM002', MaTH: 'TH002', MoTa: 'Giày thể thao chạy bộ với đế Boost êm ái.',
            AnhSanPham: ['img/ultraboost_1.jpg', 'img/ultraboost_2.jpg'],
            ChiTiet: [
                { MaMau: 'MAU003', MaSize: 'SIZE006', Gia: 3000000, SoLuong: 15 }
            ]
        }
    ];

    let productToDelete = null;

    function getSizeRange(kichThuoc) {
        if (!kichThuoc.length) return 'Không có';
        const sizes = kichThuoc.map(size => sizeMap[size]).sort((a, b) => a - b);
        return sizes.length === 1 ? sizes[0] : `${sizes[0]} - ${sizes[sizes.length - 1]}`;
    }

    function renderProducts(filteredProducts) {
        elements.productList.innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            const uniqueSizes = [...new Set(product.ChiTiet.map(ct => ct.MaSize))];
            row.innerHTML = `
                <td class="p-3">${index + 1}</td>
                <td class="p-3">${product.MaSP}</td>
                <td class="p-3">${product.Ten}</td>
                <td class="p-3">${product.MaDM}</td>
                <td class="p-3">${product.MaTH}</td>
                <td class="p-3">${new Set(product.ChiTiet.map(ct => ct.MaMau)).size}</td>
                <td class="p-3">${getSizeRange(uniqueSizes)}</td>
                <td class="p-3">
                    <button class="action-button edit" data-masp="${product.MaSP}">Sửa</button>
                    <button class="action-button delete" data-masp="${product.MaSP}">Xóa</button>
                </td>
            `;
            elements.productList.appendChild(row);
        });
    }

    function filterProducts() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const danhMuc = elements.filterDanhMuc.value;
        const thuongHieu = elements.filterThuongHieu.value;
        let filteredProducts = products;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.MaSP.toLowerCase().includes(searchTerm) ||
                product.Ten.toLowerCase().includes(searchTerm)
            );
        }
        if (danhMuc) {
            filteredProducts = filteredProducts.filter(product => product.MaDM === danhMuc);
        }
        if (thuongHieu) {
            filteredProducts = filteredProducts.filter(product => product.MaTH === thuongHieu);
        }

        renderProducts(filteredProducts);
    }

    function openProductModal(mode, product = null) {
        elements.modalTitle.textContent = mode === 'add' ? 'Thêm sản phẩm' : 'Sửa sản phẩm';
        elements.chitietContainer.innerHTML = `
            <div class="mau-item mb-4">
                <select class="mamau w-full border rounded px-2 py-1 text-sm mb-2" required>
                    <option value="MAU001">Đen</option>
                    <option value="MAU002">Trắng</option>
                    <option value="MAU003">Xanh</option>
                    <option value="MAU004">Đỏ</option>
                </select>
                <div class="size-chitiet-container mb-2">
                    <div class="size-chitiet mb-2">
                        <select class="masize w-full border rounded px-2 py-1 text-sm mb-1" required>
                            <option value="SIZE001">36</option>
                            <option value="SIZE002">37</option>
                            <option value="SIZE003">38</option>
                            <option value="SIZE004">39</option>
                            <option value="SIZE005">40</option>
                            <option value="SIZE006">41</option>
                            <option value="SIZE007">42</option>
                            <option value="SIZE008">43</option>
                            <option value="SIZE009">44</option>
                            <option value="SIZE010">45</option>
                            <option value="SIZE011">46</option>
                            <option value="SIZE012">47</option>
                        </select>
                        <input type="number" class="gia w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Giá" min="0" required>
                        <input type="number" class="soluong w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Số lượng" min="0" required>
                        <button type="button" class="remove-size bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa kích thước</button>
                    </div>
                </div>
                <button type="button" class="add-size bg-blue-600 text-white rounded px-2 py-1 text-sm">Thêm kích thước</button>
                <button type="button" class="remove-mau bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa màu</button>
            </div>
            <button type="button" id="add-mau" class="bg-blue-600 text-white rounded px-4 py-1 text-sm mt-2">Thêm màu</button>
        `;
        if (mode === 'edit' && product) {
            document.getElementById('masp').value = product.MaSP;
            document.getElementById('masp').disabled = true;
            document.getElementById('tensp').value = product.Ten;
            document.getElementById('madm').value = product.MaDM;
            document.getElementById('math').value = product.MaTH;
            document.getElementById('mota').value = product.MoTa;
            document.getElementById('anhsanpham').value = product.AnhSanPham.join(',');
            elements.chitietContainer.innerHTML = '';
            const mauMap = {};
            product.ChiTiet.forEach(ct => {
                if (!mauMap[ct.MaMau]) mauMap[ct.MaMau] = [];
                mauMap[ct.MaMau].push(ct);
            });
            for (const [maMau, chiTietList] of Object.entries(mauMap)) {
                const mauDiv = document.createElement('div');
                mauDiv.classList.add('mau-item', 'mb-4');
                mauDiv.innerHTML = `
                    <select class="mamau w-full border rounded px-2 py-1 text-sm mb-2" required>
                        <option value="MAU001" ${maMau === 'MAU001' ? 'selected' : ''}>Đen</option>
                        <option value="MAU002" ${maMau === 'MAU002' ? 'selected' : ''}>Trắng</option>
                        <option value="MAU003" ${maMau === 'MAU003' ? 'selected' : ''}>Xanh</option>
                        <option value="MAU004" ${maMau === 'MAU004' ? 'selected' : ''}>Đỏ</option>
                    </select>
                    <div class="size-chitiet-container mb-2">
                        <div class="size-chitiet mb-2">
                            <select class="masize w-full border rounded px-2 py-1 text-sm mb-1" required>
                                <option value="SIZE001">36</option>
                                <option value="SIZE002">37</option>
                                <option value="SIZE003">38</option>
                                <option value="SIZE004">39</option>
                                <option value="SIZE005">40</option>
                                <option value="SIZE006">41</option>
                                <option value="SIZE007">42</option>
                                <option value="SIZE008">43</option>
                                <option value="SIZE009">44</option>
                                <option value="SIZE010">45</option>
                                <option value="SIZE011">46</option>
                                <option value="SIZE012">47</option>
                            </select>
                            <input type="number" class="gia w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Giá" min="0" required>
                            <input type="number" class="soluong w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Số lượng" min="0" required>
                            <button type="button" class="remove-size bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa kích thước</button>
                        </div>
                    </div>
                    <button type="button" class="add-size bg-blue-600 text-white rounded px-2 py-1 text-sm">Thêm kích thước</button>
                    <button type="button" class="remove-mau bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa màu</button>
                `;
                chiTietList.forEach(ct => {
                    const sizeChitiet = mauDiv.querySelector('.size-chitiet');
                    if (sizeChitiet) {
                        sizeChitiet.querySelector('.masize').value = ct.MaSize;
                        sizeChitiet.querySelector('.gia').value = ct.Gia;
                        sizeChitiet.querySelector('.soluong').value = ct.SoLuong;
                    }
                    if (chiTietList.length > 1) {
                        const newSizeChitiet = sizeChitiet.cloneNode(true);
                        newSizeChitiet.querySelector('.masize').value = ct.MaSize;
                        newSizeChitiet.querySelector('.gia').value = ct.Gia;
                        newSizeChitiet.querySelector('.soluong').value = ct.SoLuong;
                        mauDiv.querySelector('.size-chitiet-container').appendChild(newSizeChitiet);
                    }
                });
                elements.chitietContainer.appendChild(mauDiv);
            }
        } else {
            elements.productForm.reset();
            document.getElementById('masp').disabled = false;
        }
        bindEventListeners();
        elements.productModal.classList.remove('hidden');
    }

    function bindEventListeners() {
        bindRemoveMauButtons();
        bindAddSizeButtons();
        bindRemoveSizeButtons();
    }

    function bindRemoveMauButtons() {
        document.querySelectorAll('.remove-mau').forEach(btn => {
            btn.removeEventListener('click', handleRemoveMau);
            btn.addEventListener('click', handleRemoveMau);
        });
    }

    function handleRemoveMau() {
        if (document.querySelectorAll('.mau-item').length > 1) {
            this.parentElement.remove();
        }
    }

    function bindAddSizeButtons() {
        document.querySelectorAll('.add-size').forEach(btn => {
            btn.removeEventListener('click', handleAddSize);
            btn.addEventListener('click', handleAddSize);
        });
    }

    function handleAddSize() {
        const mau = this.parentElement;
        const sizeChitietContainer = mau.querySelector('.size-chitiet-container');
        const newSizeChitiet = document.createElement('div');
        newSizeChitiet.classList.add('size-chitiet', 'mb-2');
        newSizeChitiet.innerHTML = `
            <select class="masize w-full border rounded px-2 py-1 text-sm mb-1" required>
                <option value="SIZE001">36</option>
                <option value="SIZE002">37</option>
                <option value="SIZE003">38</option>
                <option value="SIZE004">39</option>
                <option value="SIZE005">40</option>
                <option value="SIZE006">41</option>
                <option value="SIZE007">42</option>
                <option value="SIZE008">43</option>
                <option value="SIZE009">44</option>
                <option value="SIZE010">45</option>
                <option value="SIZE011">46</option>
                <option value="SIZE012">47</option>
            </select>
            <input type="number" class="gia w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Giá" min="0" required>
            <input type="number" class="soluong w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Số lượng" min="0" required>
            <button type="button" class="remove-size bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa kích thước</button>
        `;
        sizeChitietContainer.appendChild(newSizeChitiet);
        bindRemoveSizeButtons();
    }

    function bindRemoveSizeButtons() {
        document.querySelectorAll('.remove-size').forEach(btn => {
            btn.removeEventListener('click', handleRemoveSize);
            btn.addEventListener('click', handleRemoveSize);
        });
    }

    function handleRemoveSize() {
        if (this.parentElement.parentElement.children.length > 1) {
            this.parentElement.remove();
        }
    }

    function openDeleteModal(masp) {
        productToDelete = masp;
        elements.deleteModal.classList.remove('hidden');
    }

    elements.addProductBtn.addEventListener('click', () => openProductModal('add'));

    elements.cancelModalBtn.addEventListener('click', () => {
        elements.productModal.classList.add('hidden');
    });

    elements.cancelDeleteBtn.addEventListener('click', () => {
        elements.deleteModal.classList.add('hidden');
        productToDelete = null;
    });

    elements.confirmDeleteBtn.addEventListener('click', () => {
        if (productToDelete) {
            products = products.filter(product => product.MaSP !== productToDelete);
            filterProducts();
            elements.deleteModal.classList.add('hidden');
            productToDelete = null;
        }
    });

    elements.addMauBtn.addEventListener('click', () => {
        const mauDiv = document.createElement('div');
        mauDiv.classList.add('mau-item', 'mb-4');
        mauDiv.innerHTML = `
            <select class="mamau w-full border rounded px-2 py-1 text-sm mb-2" required>
                <option value="MAU001">Đen</option>
                <option value="MAU002">Trắng</option>
                <option value="MAU003">Xanh</option>
                <option value="MAU004">Đỏ</option>
            </select>
            <div class="size-chitiet-container mb-2">
                <div class="size-chitiet mb-2">
                    <select class="masize w-full border rounded px-2 py-1 text-sm mb-1" required>
                        <option value="SIZE001">36</option>
                        <option value="SIZE002">37</option>
                        <option value="SIZE003">38</option>
                        <option value="SIZE004">39</option>
                        <option value="SIZE005">40</option>
                        <option value="SIZE006">41</option>
                        <option value="SIZE007">42</option>
                        <option value="SIZE008">43</option>
                        <option value="SIZE009">44</option>
                        <option value="SIZE010">45</option>
                        <option value="SIZE011">46</option>
                        <option value="SIZE012">47</option>
                    </select>
                    <input type="number" class="gia w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Giá" min="0" required>
                    <input type="number" class="soluong w-full border rounded px-2 py-1 text-sm mb-1" placeholder="Số lượng" min="0" required>
                    <button type="button" class="remove-size bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa kích thước</button>
                </div>
            </div>
            <button type="button" class="add-size bg-blue-600 text-white rounded px-2 py-1 text-sm">Thêm kích thước</button>
            <button type="button" class="remove-mau bg-red-600 text-white rounded px-2 py-1 text-sm">Xóa màu</button>
        `;
        elements.chitietContainer.insertBefore(mauDiv, elements.addMauBtn);
        bindEventListeners();
    });

    elements.productList.addEventListener('click', (e) => {
        const masp = e.target.getAttribute('data-masp');
        if (e.target.classList.contains('edit')) {
            const product = products.find(prod => prod.MaSP === masp);
            if (product) openProductModal('edit', product);
        } else if (e.target.classList.contains('delete')) {
            openDeleteModal(masp);
        }
    });

    elements.productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const chiTiet = [];
        document.querySelectorAll('.mau-item').forEach(mau => {
            const mamau = mau.querySelector('.mamau').value;
            mau.querySelectorAll('.size-chitiet').forEach(chitiet => {
                const masize = chitiet.querySelector('.masize').value;
                const gia = parseInt(chitiet.querySelector('.gia').value);
                const soluong = parseInt(chitiet.querySelector('.soluong').value);
                if (masize && !isNaN(gia) && !isNaN(soluong)) {
                    chiTiet.push({ MaMau: mamau, MaSize: masize, Gia: gia, SoLuong: soluong });
                }
            });
        });

        if (chiTiet.length === 0) {
            alert('Vui lòng thêm ít nhất một biến thể (màu + kích thước)!');
            return;
        }

        const product = {
            MaSP: document.getElementById('masp').value,
            Ten: document.getElementById('tensp').value,
            MaDM: document.getElementById('madm').value,
            MaTH: document.getElementById('math').value,
            MoTa: document.getElementById('mota').value,
            AnhSanPham: document.getElementById('anhsanpham').value.split(',').map(url => url.trim()).filter(url => url),
            ChiTiet: chiTiet
        };

        const existingIndex = products.findIndex(prod => prod.MaSP === product.MaSP);
        if (existingIndex >= 0) {
            products[existingIndex] = product;
        } else {
            products.push(product);
        }

        filterProducts();
        elements.productModal.classList.add('hidden');
    });

    elements.searchInput.addEventListener('input', filterProducts);
    elements.filterDanhMuc.addEventListener('change', filterProducts);
    elements.filterThuongHieu.addEventListener('change', filterProducts);

    renderProducts(products);
});