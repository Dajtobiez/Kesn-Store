document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');
    const orderModal = document.getElementById('order-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const orderForm = document.getElementById('order-form');
    const modalTitle = document.getElementById('modal-title');
    const filterTrangThai = document.getElementById('filter-trangthai');
    const searchOrder = document.getElementById('search-order');

    let orders = [
        {
            MaDH: 'DH001',
            MaKH: 'KH001',
            TenKH: 'Nguyễn Văn A',
            NgayDatHang: '2025-06-01',
            TongTien: 500000,
            TrangThai: 'Đang xử lý',
            ChiTietSanPham: [
                { MaSP: 'SP001', TenSP: 'Giày Sneaker Nike', MaMau: 'M001', TenMau: 'Đen', MaSize: 'S001', SoSize: '39', SoLuong: 2, Gia: 150000 },
                { MaSP: 'SP002', TenSP: 'Giày Adidas Running', MaMau: 'M002', TenMau: 'Xanh', MaSize: 'S002', SoSize: '40', SoLuong: 1, Gia: 200000 }
            ]
        },
        {
            MaDH: 'DH002',
            MaKH: 'KH002',
            TenKH: 'Trần Thị B',
            NgayDatHang: '2025-06-02',
            TongTien: 1200000,
            TrangThai: 'Chờ xác nhận',
            ChiTietSanPham: [
                { MaSP: 'SP003', TenSP: 'Giày Converse Classic', MaMau: 'M003', TenMau: 'Trắng', MaSize: 'S003', SoSize: '38', SoLuong: 1, Gia: 1200000 }
            ]
        }
    ];

    function renderOrders(filteredOrders) {
        orderList.innerHTML = '';
        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${order.MaDH}</td>
                <td class="p-3">${order.MaKH}</td>
                <td class="p-3">${order.TenKH}</td>
                <td class="p-3">${order.NgayDatHang}</td>
                <td class="p-3">${order.TongTien.toLocaleString('vi-VN')} VNĐ</td>
                <td class="p-3">${order.TrangThai}</td>
                <td class="p-3">
                    <button class="action-button edit" data-madh="${order.MaDH}">Chi tiết</button>
                </td>
            `;
            orderList.appendChild(row);
        });
    }

    function renderProductDetails(products) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2 text-sm">${product.TenSP}</td>
                <td class="p-2 text-sm">${product.TenMau}</td>
                <td class="p-2 text-sm">${product.SoSize}</td>
                <td class="p-2 text-sm">${product.SoLuong}</td>
                <td class="p-2 text-sm text-right">${product.Gia.toLocaleString('vi-VN')} VNĐ</td>
            `;
            productDetails.appendChild(row);
        });
    }

    function openModal(order) {
        modalTitle.textContent = `Chi tiết Đơn hàng ${order.MaDH}`;
        document.getElementById('madh').value = order.MaDH;
        document.getElementById('makh').value = order.MaKH;
        document.getElementById('tenkh').value = order.TenKH;
        document.getElementById('ngaydatthang').value = order.NgayDatHang;
        document.getElementById('tongtien').value = order.TongTien.toLocaleString('vi-VN') + ' VNĐ';
        document.getElementById('trangthai').value = order.TrangThai;
        renderProductDetails(order.ChiTietSanPham);
        orderModal.classList.remove('hidden');
    }

    function filterOrders() {
        const trangThai = filterTrangThai.value;
        const searchTerm = searchOrder.value.toLowerCase();
        let filteredOrders = orders;

        if (trangThai) {
            filteredOrders = filteredOrders.filter(order => order.TrangThai === trangThai);
        }
        if (searchTerm) {
            filteredOrders = filteredOrders.filter(order => 
                order.MaDH.toLowerCase().includes(searchTerm) || 
                order.MaKH.toLowerCase().includes(searchTerm) || 
                order.TenKH.toLowerCase().includes(searchTerm)
            );
        }

        renderOrders(filteredOrders);
    }

    orderList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit')) {
            const madh = e.target.getAttribute('data-madh');
            const order = orders.find(o => o.MaDH === madh);
            if (order) openModal(order);
        }
    });

    cancelModal.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const madh = document.getElementById('madh').value;
        const order = orders.find(o => o.MaDH === madh);
        if (order) {
            order.TrangThai = document.getElementById('trangthai').value;
            filterOrders();
            orderModal.classList.add('hidden');
        }
    });

    filterTrangThai.addEventListener('change', filterOrders);
    searchOrder.addEventListener('input', filterOrders);

    // Khởi tạo
    renderOrders(orders);
});