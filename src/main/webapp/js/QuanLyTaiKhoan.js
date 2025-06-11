document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        accountList: document.getElementById('account-list'),
        addAccountBtn: document.getElementById('add-account'),
        accountModal: document.getElementById('account-modal'),
        cancelModalBtn: document.getElementById('cancel-modal'),
        accountForm: document.getElementById('account-form'),
        modalTitle: document.getElementById('modal-title'),
        passwordField: document.getElementById('password-field'),
        searchInput: document.getElementById('search-account'),
        filterVaiTro: document.getElementById('filter-vai-tro'),
        deleteModal: document.getElementById('delete-modal'),
        cancelDeleteBtn: document.getElementById('cancel-delete'),
        confirmDeleteBtn: document.getElementById('confirm-delete')
    };

    let accounts = [
        { MaTK: 'TK001', TenDangNhap: 'admin1', MatKhau: 'pass123', VaiTro: 'Quản trị viên', HoTen: 'Nguyễn Văn A', Email: 'admin1@example.com', SoDienThoai: '0901234567' },
        { MaTK: 'TK002', TenDangNhap: 'nhanvien1', MatKhau: 'pass456', VaiTro: 'Nhân viên', HoTen: 'Trần Thị B', Email: 'nhanvien1@example.com', SoDienThoai: '0907654321' },
        { MaTK: 'TK003', TenDangNhap: 'khach1', MatKhau: 'pass789', VaiTro: 'Khách hàng', HoTen: 'Lê Văn C', Email: 'khach1@example.com', SoDienThoai: '0912345678' },
        { MaTK: 'TK004', TenDangNhap: 'nhanvien2', MatKhau: 'pass101', VaiTro: 'Nhân viên', HoTen: 'Phạm Thị D', Email: 'nhanvien2@example.com', SoDienThoai: '0923456789' },
        { MaTK: 'TK005', TenDangNhap: 'khach2', MatKhau: 'pass202', VaiTro: 'Khách hàng', HoTen: 'Hoàng Văn E', Email: 'khach2@example.com', SoDienThoai: '0934567890' },
        { MaTK: 'TK006', TenDangNhap: 'admin2', MatKhau: 'pass303', VaiTro: 'Quản trị viên', HoTen: 'Trần Văn F', Email: 'admin2@example.com', SoDienThoai: '0945678901' },
        { MaTK: 'TK007', TenDangNhap: 'khach3', MatKhau: 'pass404', VaiTro: 'Khách hàng', HoTen: 'Nguyễn Thị G', Email: 'khach3@example.com', SoDienThoai: '0956789012' },
        { MaTK: 'TK008', TenDangNhap: 'nhanvien3', MatKhau: 'pass505', VaiTro: 'Nhân viên', HoTen: 'Lê Thị H', Email: 'nhanvien3@example.com', SoDienThoai: '0967890123' },
        { MaTK: 'TK009', TenDangNhap: 'khach4', MatKhau: 'pass606', VaiTro: 'Khách hàng', HoTen: 'Phạm Văn I', Email: 'khach4@example.com', SoDienThoai: '0978901234' },
        { MaTK: 'TK010', TenDangNhap: 'admin3', MatKhau: 'pass707', VaiTro: 'Quản trị viên', HoTen: 'Hoàng Thị K', Email: 'admin3@example.com', SoDienThoai: '0989012345' }
    ];

    let accountToDelete = null;

    function renderAccounts(filteredAccounts) {
        elements.accountList.innerHTML = '';
        filteredAccounts.forEach((account, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${index + 1}</td>
                <td class="p-3">${account.MaTK}</td>
                <td class="p-3">${account.TenDangNhap}</td>
                <td class="p-3">${account.VaiTro}</td>
                <td class="p-3">
                    <button class="action-button edit" data-matk="${account.MaTK}">Sửa</button>
                    <button class="action-button delete" data-matk="${account.MaTK}">Xóa</button>
                </td>
            `;
            elements.accountList.appendChild(row);
        });
    }

    function filterAccounts() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const vaiTro = elements.filterVaiTro.value;
        let filteredAccounts = accounts;

        if (searchTerm) {
            filteredAccounts = filteredAccounts.filter(account =>
                account.TenDangNhap.toLowerCase().includes(searchTerm) ||
                account.MaTK.toLowerCase().includes(searchTerm)
            );
        }
        if (vaiTro) {
            filteredAccounts = filteredAccounts.filter(account => account.VaiTro === vaiTro);
        }

        renderAccounts(filteredAccounts);
    }

    function openAccountModal(mode, account = null) {
        elements.modalTitle.textContent = mode === 'add' ? 'Thêm tài khoản' : 'Sửa tài khoản';
        if (mode === 'edit' && account) {
            document.getElementById('matk').value = account.MaTK;
            document.getElementById('matk').disabled = true;
            document.getElementById('tendangnhap').value = account.TenDangNhap;
            document.getElementById('vaitro').value = account.VaiTro;
            document.getElementById('hoten').value = account.HoTen || '';
            document.getElementById('email').value = account.Email || '';
            document.getElementById('sodienthoai').value = account.SoDienThoai || '';
            elements.passwordField.classList.add('hidden');
            document.getElementById('matkhau').required = false;
        } else {
            elements.accountForm.reset();
            document.getElementById('matk').disabled = false;
            elements.passwordField.classList.remove('hidden');
            document.getElementById('matkhau').required = true;
        }
        elements.accountModal.classList.remove('hidden');
    }

    function openDeleteModal(matk) {
        accountToDelete = matk;
        elements.deleteModal.classList.remove('hidden');
    }

    elements.addAccountBtn.addEventListener('click', () => openAccountModal('add'));

    elements.cancelModalBtn.addEventListener('click', () => {
        elements.accountModal.classList.add('hidden');
    });

    elements.cancelDeleteBtn.addEventListener('click', () => {
        elements.deleteModal.classList.add('hidden');
        accountToDelete = null;
    });

    elements.confirmDeleteBtn.addEventListener('click', () => {
        if (accountToDelete) {
            accounts = accounts.filter(account => account.MaTK !== accountToDelete);
            filterAccounts();
            elements.deleteModal.classList.add('hidden');
            accountToDelete = null;
        }
    });

    elements.accountList.addEventListener('click', (e) => {
        const matk = e.target.getAttribute('data-matk');
        if (e.target.classList.contains('edit')) {
            const account = accounts.find(acc => acc.MaTK === matk);
            if (account) openAccountModal('edit', account);
        } else if (e.target.classList.contains('delete')) {
            openDeleteModal(matk);
        }
    });

    elements.accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const account = {
            MaTK: document.getElementById('matk').value,
            TenDangNhap: document.getElementById('tendangnhap').value,
            MatKhau: document.getElementById('matkhau').value || '',
            VaiTro: document.getElementById('vaitro').value,
            HoTen: document.getElementById('hoten').value,
            Email: document.getElementById('email').value,
            SoDienThoai: document.getElementById('sodienthoai').value
        };

        const existingIndex = accounts.findIndex(acc => acc.MaTK === account.MaTK);
        if (existingIndex >= 0) {
            accounts[existingIndex] = { ...accounts[existingIndex], ...account, MatKhau: accounts[existingIndex].MatKhau || account.MatKhau };
        } else {
            accounts.push(account);
        }

        filterAccounts();
        elements.accountModal.classList.add('hidden');
    });

    elements.searchInput.addEventListener('input', filterAccounts);
    elements.filterVaiTro.addEventListener('change', filterAccounts);

    renderAccounts(accounts);
});