document.addEventListener('DOMContentLoaded', function () {
    const invoiceList = document.getElementById('invoice-list');
    const invoiceModal = document.getElementById('invoice-modal');
    const addInvoice = document.getElementById('add-invoice');
    const cancelModal = document.getElementById('cancel-modal');
    const invoiceForm = document.getElementById('invoice-form');
    const modalTitle = document.getElementById('modal-title');
    const filterTrangThaiThanhToan = document.getElementById('filter-trangthai-thanhtoan');
    const filterTrangThaiVanChuyen = document.getElementById('filter-trangthai-vanchuyen');
    const searchInvoice = document.getElementById('search-invoice');
    const exportExcel = document.getElementById('export-excel');
    const addProduct = document.getElementById('add-product');
    const productModal = document.getElementById('product-modal');
    const productForm = document.getElementById('product-form');
    const cancelProduct = document.getElementById('cancel-product');

    let invoices = [
        {
            MaHD: 'HD001',
            MaKH: 'KH001',
            TrangThaiThanhToan: 'Đã thanh toán',
            PhuongThucThanhToan: 'Chuyển khoản',
            TrangThaiVanChuyen: 'Đã giao',
            PhuongThucVanChuyen: 'Giao hàng nhanh',
            NgayGiaoDuKien: '2025-06-05',
            ChiTietSanPham: [
                { MaSP: 'SP001', TenSP: 'Giày Sneaker Nike', MaMau: 'M001', TenMau: 'Đen', MaSize: 'S001', SoSize: '39', SoLuong: 2, Gia: 150000 },
                { MaSP: 'SP002', TenSP: 'Giày Adidas Running', MaMau: 'M002', TenMau: 'Xanh', MaSize: 'S002', SoSize: '40', SoLuong: 1, Gia: 200000 }
            ]
        },
        {
            MaHD: 'HD002',
            MaKH: 'KH002',
            TrangThaiThanhToan: 'Chưa thanh toán',
            PhuongThucThanhToan: 'Tiền mặt',
            TrangThaiVanChuyen: 'Đang giao',
            PhuongThucVanChuyen: 'Giao hàng tiết kiệm',
            NgayGiaoDuKien: '2025-06-06',
            ChiTietSanPham: [
                { MaSP: 'SP003', TenSP: 'Giày Converse Classic', MaMau: 'M003', TenMau: 'Trắng', MaSize: 'S003', SoSize: '38', SoLuong: 1, Gia: 1200000 }
            ]
        }
    ];

    let tempProducts = [];

    function renderInvoices(filteredInvoices) {
        invoiceList.innerHTML = '';
        filteredInvoices.forEach(invoice => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${invoice.MaHD}</td>
                <td class="p-3">${invoice.MaKH}</td>
                <td class="p-3">${invoice.TrangThaiThanhToan}</td>
                <td class="p-3">${invoice.PhuongThucThanhToan}</td>
                <td class="p-3">${invoice.TrangThaiVanChuyen}</td>
                <td class="p-3">${invoice.NgayGiaoDuKien}</td>
                <td class="p-3">
                    <button class="action-button edit" data-mahd="${invoice.MaHD}">Chỉnh sửa</button>
                    <button class="action-button delete" data-mahd="${invoice.MaHD}">Xóa</button>
                </td>
            `;
            invoiceList.appendChild(row);
        });
    }

    function renderProductDetails(products) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2">${product.TenSP}</td>
                <td class="p-2">${product.TenMau}</td>
                <td class="p-2">${product.SoSize}</td>
                <td class="p-2">${product.SoLuong}</td>
                <td class="p-2">${product.Gia.toLocaleString('vi-VN')} VNĐ</td>
                <td class="p-2">
                    <button class="action-button delete-product" data-index="${index}">Xóa</button>
                </td>
            `;
            productDetails.appendChild(row);
        });
    }

    function openInvoiceModal(invoice = null) {
        tempProducts = invoice ? [...invoice.ChiTietSanPham] : [];
        if (invoice) {
            modalTitle.textContent = `Chỉnh sửa Hóa đơn ${invoice.MaHD}`;
            document.getElementById('mahd').value = invoice.MaHD;
            document.getElementById('mahd').disabled = true;
            document.getElementById('makh').value = invoice.MaKH;
            document.getElementById('trangthai-thanhtoan').value = invoice.TrangThaiThanhToan;
            document.getElementById('phuongthuc-thanhtoan').value = invoice.PhuongThucThanhToan;
            document.getElementById('trangthai-vanchuyen').value = invoice.TrangThaiVanChuyen;
            document.getElementById('phuongthuc-vanchuyen').value = invoice.PhuongThucVanChuyen;
            document.getElementById('ngaygiaodukien').value = invoice.NgayGiaoDuKien;
        } else {
            modalTitle.textContent = 'Thêm Hóa đơn';
            document.getElementById('mahd').value = '';
            document.getElementById('mahd').disabled = false;
            document.getElementById('makh').value = '';
            document.getElementById('trangthai-thanhtoan').value = 'Chưa thanh toán';
            document.getElementById('phuongthuc-thanhtoan').value = 'Tiền mặt';
            document.getElementById('trangthai-vanchuyen').value = 'Chờ xử lý';
            document.getElementById('phuongthuc-vanchuyen').value = 'Giao hàng tiêu chuẩn';
            document.getElementById('ngaygiaodukien').value = '';
        }
        renderProductDetails(tempProducts);
        invoiceModal.classList.remove('hidden');
    }

    function filterInvoices() {
        const trangThaiThanhToan = filterTrangThaiThanhToan.value;
        const trangThaiVanChuyen = filterTrangThaiVanChuyen.value;
        const searchTerm = searchInvoice.value.toLowerCase();
        let filteredInvoices = invoices;

        if (trangThaiThanhToan) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.TrangThaiThanhToan === trangThaiThanhToan);
        }
        if (trangThaiVanChuyen) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.TrangThaiVanChuyen === trangThaiVanChuyen);
        }
        if (searchTerm) {
            filteredInvoices = filteredInvoices.filter(invoice => 
                invoice.MaHD.toLowerCase().includes(searchTerm) || 
                invoice.MaKH.toLowerCase().includes(searchTerm)
            );
        }

        renderInvoices(filteredInvoices);
    }

    addInvoice.addEventListener('click', () => openInvoiceModal());

    invoiceList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit')) {
            const mahd = e.target.getAttribute('data-mahd');
            const invoice = invoices.find(inv => inv.MaHD === mahd);
            if (invoice) openInvoiceModal(invoice);
        } else if (e.target.classList.contains('delete')) {
            const mahd = e.target.getAttribute('data-mahd');
            invoices = invoices.filter(inv => inv.MaHD !== mahd);
            filterInvoices();
        }
    });

    cancelModal.addEventListener('click', () => {
        invoiceModal.classList.add('hidden');
    });

    invoiceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const invoice = {
            MaHD: document.getElementById('mahd').value,
            MaKH: document.getElementById('makh').value,
            TrangThaiThanhToan: document.getElementById('trangthai-thanhtoan').value,
            PhuongThucThanhToan: document.getElementById('phuongthuc-thanhtoan').value,
            TrangThaiVanChuyen: document.getElementById('trangthai-vanchuyen').value,
            PhuongThucVanChuyen: document.getElementById('phuongthuc-vanchuyen').value,
            NgayGiaoDuKien: document.getElementById('ngaygiaodukien').value,
            ChiTietSanPham: [...tempProducts]
        };

        const existingInvoice = invoices.find(inv => inv.MaHD === invoice.MaHD);
        if (existingInvoice) {
            Object.assign(existingInvoice, invoice);
        } else {
            invoices.push(invoice);
        }

        filterInvoices();
        invoiceModal.classList.add('hidden');
    });

    addProduct.addEventListener('click', () => {
        productModal.classList.remove('hidden');
    });

    cancelProduct.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const product = {
            MaSP: document.getElementById('product-masp').value,
            TenSP: document.getElementById('product-tensp').value,
            MaMau: document.getElementById('product-mamau').value,
            TenMau: document.getElementById('product-tenmau').value,
            MaSize: document.getElementById('product-masize').value,
            SoSize: document.getElementById('product-sosize').value,
            SoLuong: parseInt(document.getElementById('product-soluong').value),
            Gia: parseInt(document.getElementById('product-gia').value)
        };
        tempProducts.push(product);
        renderProductDetails(tempProducts);
        productModal.classList.add('hidden');
        productForm.reset();
    });

    document.getElementById('product-details').addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-product')) {
            const index = e.target.getAttribute('data-index');
            tempProducts.splice(index, 1);
            renderProductDetails(tempProducts);
        }
    });

    exportExcel.addEventListener('click', () => {
        let csv = 'Mã Hóa đơn,Mã Khách hàng,Trạng thái Thanh toán,Phương thức Thanh toán,Trạng thái Vận chuyển,Phương thức Vận chuyển,Ngày giao dự kiến\n';
        invoices.forEach(inv => {
            csv += `${inv.MaHD},${inv.MaKH},${inv.TrangThaiThanhToan},${inv.PhuongThucThanhToan},${inv.TrangThaiVanChuyen},${inv.PhuongThucVanChuyen},${inv.NgayGiaoDuKien}\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoices.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    });

    filterTrangThaiThanhToan.addEventListener('change', filterInvoices);
    filterTrangThaiVanChuyen.addEventListener('change', filterInvoices);
    searchInvoice.addEventListener('input', filterInvoices);

    renderInvoices(invoices);
});