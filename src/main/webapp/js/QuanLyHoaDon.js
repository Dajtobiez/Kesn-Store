document.addEventListener('DOMContentLoaded', function () {
    const invoiceList = document.getElementById('invoice-list');
    const addInvoiceBtn = document.getElementById('add-invoice');
    const invoiceModal = document.getElementById('invoice-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const invoiceForm = document.getElementById('invoice-form');
    const modalTitle = document.getElementById('modal-title');
    const filterTrangThaiThanhToan = document.getElementById('filter-trangthai-thanhtoan');
    const filterTrangThaiVanChuyen = document.getElementById('filter-trangthai-vanchuyen');
    const searchInvoice = document.getElementById('search-invoice');

    let invoices = [
        {
            MaHD: 'HD001',
            MaKH: 'KH001',
            TrangThaiThanhToan: 'Đã thanh toán',
            PhuongThucThanhToan: 'Chuyển khoản',
            TrangThaiVanChuyen: 'Đang giao',
            PhuongThucVanChuyen: 'Giao hàng nhanh',
            NgayGiaoDuKien: '2025-06-15'
        },
        {
            MaHD: 'HD002',
            MaKH: 'KH002',
            TrangThaiThanhToan: 'Chưa thanh toán',
            PhuongThucThanhToan: 'Tiền mặt',
            TrangThaiVanChuyen: 'Chờ xử lý',
            PhuongThucVanChuyen: 'Giao hàng tiết kiệm',
            NgayGiaoDuKien: '2025-06-20'
        }
    ];

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

    function filterInvoices() {
        const trangThaiThanhToan = filterTrangThaiThanhToan.value;
        const trangThaiVanChuyen = filterTrangThaiVanChuyen.value;
        const searchTerm = searchInvoice.value.toLowerCase();
        let filteredInvoices = invoices;

        if (trangThaiThanhToan) {
            filteredInvoices = filteredInvoices.filter(inv => inv.TrangThaiThanhToan === trangThaiThanhToan);
        }
        if (trangThaiVanChuyen) {
            filteredInvoices = filteredInvoices.filter(inv => inv.TrangThaiVanChuyen === trangThaiVanChuyen);
        }
        if (searchTerm) {
            filteredInvoices = filteredInvoices.filter(inv => 
                inv.MaHD.toLowerCase().includes(searchTerm) || 
                inv.MaKH.toLowerCase().includes(searchTerm)
            );
        }

        renderInvoices(filteredInvoices);
    }

    function openModal(mode, invoice = null) {
        modalTitle.textContent = mode === 'add' ? 'Thêm Hóa đơn' : 'Chỉnh sửa Hóa đơn';
        if (mode === 'edit' && invoice) {
            document.getElementById('mahd').value = invoice.MaHD;
            document.getElementById('mahd').disabled = true;
            document.getElementById('makh').value = invoice.MaKH;
            document.getElementById('trangthai-thanhtoan').value = invoice.TrangThaiThanhToan;
            document.getElementById('phuongthuc-thanhtoan').value = invoice.PhuongThucThanhToan;
            document.getElementById('trangthai-vanchuyen').value = invoice.TrangThaiVanChuyen;
            document.getElementById('phuongthuc-vanchuyen').value = invoice.PhuongThucVanChuyen;
            document.getElementById('ngaygiaodukien').value = invoice.NgayGiaoDuKien;
        } else {
            invoiceForm.reset();
            document.getElementById('mahd').disabled = false;
        }
        invoiceModal.classList.remove('hidden');
    }

    addInvoiceBtn.addEventListener('click', () => openModal('add'));

    cancelModal.addEventListener('click', () => {
        invoiceModal.classList.add('hidden');
    });

    invoiceList.addEventListener('click', function (e) {
        const mahd = e.target.getAttribute('data-mahd');
        if (e.target.classList.contains('edit')) {
            const invoice = invoices.find(inv => inv.MaHD === mahd);
            if (invoice) openModal('edit', invoice);
        } else if (e.target.classList.contains('delete')) {
            invoices = invoices.filter(inv => inv.MaHD !== mahd);
            filterInvoices();
        }
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
            NgayGiaoDuKien: document.getElementById('ngaygiaodukien').value
        };

        const existingIndex = invoices.findIndex(inv => inv.MaHD === invoice.MaHD);
        if (existingIndex >= 0) {
            invoices[existingIndex] = invoice;
        } else {
            invoices.push(invoice);
        }

        filterInvoices();
        invoiceModal.classList.add('hidden');
    });

    filterTrangThaiThanhToan.addEventListener('change', filterInvoices);
    filterTrangThaiVanChuyen.addEventListener('change', filterInvoices);
    searchInvoice.addEventListener('input', filterInvoices);

    // Khởi tạo
    renderInvoices(invoices);
});