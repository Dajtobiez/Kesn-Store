document.addEventListener('DOMContentLoaded', function () {
    const accountList = document.getElementById('account-list');
    const addAccountBtn = document.getElementById('add-account');
    const accountModal = document.getElementById('account-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const accountForm = document.getElementById('account-form');
    const modalTitle = document.getElementById('modal-title');
    const filterVaiTro = document.getElementById('filter-vaitro');
    const searchAccount = document.getElementById('search-account');
    const deleteModal = document.getElementById('delete-modal');
    const cancelDelete = document.getElementById('cancel-delete');
    const confirmDelete = document.getElementById('confirm-delete');

    // Dữ liệu mẫu
    let accounts = [
        {
            MaTK: 'TK001',
            TenDangNhap: 'admin1',
            MatKhau: '123456',
            VaiTro: 'Quản trị viên',
            HoTen: 'Nguyễn Văn A',
            Email: 'admin1@example.com',
            Sdt: '0901234567'
        },
        {
            MaTK: 'TK002',
            TenDangNhap: 'nhanvien1',
            MatKhau: '123456',
            VaiTro: 'Quản trị viên',
            HoTen: 'Trần Thị B',
            Email: 'admin2@example.com',
            Sdt: '0907654321'
        },
        {
            MaTK: 'TK003',
            TenDangNhap: 'khach1',
            MatKhau: '123456',
            VaiTro: 'Khách hàng',
            HoTen: 'Lê Văn C',
            Email: 'khach1@example.com',
            Sdt: '0912345678'
        }
    ];

    let deleteMaTK = null;

    // Kiểm tra phần tử
    if (!accountList) console.error('Không tìm thấy account-list');
    if (!addAccountBtn) console.error('Không tìm thấy add-account');
    if (!accountModal) console.error('Không tìm thấy account-modal');
    if (!cancelModal) console.error('Không tìm thấy cancel-modal');
    if (!accountForm) console.error('Không tìm thấy account-form');
    if (!modalTitle) console.error('Không tìm thấy modal-title');
    if (!filterVaiTro) console.error('Không tìm thấy filter-vaitro');
    if (!searchAccount) console.error('Không tìm thấy search-account');
    if (!deleteModal) console.error('Không tìm thấy delete-modal');
    if (!cancelDelete) console.error('Không tìm thấy cancel-delete');
    if (!confirmDelete) console.error('Không tìm thấy confirm-delete');

    function renderAccounts(filteredAccounts) {
        if (!accountList) return;
        accountList.innerHTML = '';
        filteredAccounts.forEach((account, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${index + 1}</td>
                <td class="p-3">${account.MaTK}</td>
                <td class="p-3">${account.TenDangNhap}</td>
                <td class="p-3">${account.VaiTro}</td>
                <td class="p-3">
                    <button class="action-button edit" data-matk="${account.MaTK}">Chỉnh sửa</button>
                    <button class="action-button delete" data-matk="${account.MaTK}">Xóa</button>
                </td>
            `;
            accountList.appendChild(row);
        });
    }

    function filterAccounts() {
        const vaiTro = filterVaiTro?.value;
        const searchTerm = searchAccount?.value.toLowerCase();
        let filteredAccounts = accounts;

        if (vaiTro) filteredAccounts = filteredAccounts.filter(a => a.VaiTro === vaiTro);
        if (searchTerm) {
            filteredAccounts = filteredAccounts.filter(a => 
                a.MaTK.toLowerCase().includes(searchTerm) || 
                a.TenDangNhap.toLowerCase().includes(searchTerm)
            );
        }

        renderAccounts(filteredAccounts);
    }

    function openModal(mode, account = null) {
        if (!modalTitle || !accountForm || !accountModal) return;
        modalTitle.textContent = mode === 'add' ? 'Thêm tài khoản' : 'Chỉnh sửa tài khoản';
        if (mode === 'edit' && account) {
            document.getElementById('maTK').value = account.MaTK;
            document.getElementById('maTK').disabled = true;
            document.getElementById('tenDangNhap').value = account.TenDangNhap;
            document.getElementById('matKhau').value = '';
            document.getElementById('vaiTro').value = account.VaiTro;
            document.getElementById('hoTen').value = account.HoTen;
            document.getElementById('email').value = account.Email;
            document.getElementById('sdt').value = account.Sdt;
        } else {
            accountForm.reset();
            document.getElementById('maTK').disabled = false;
        }
        accountModal.classList.remove('hidden');
    }

    if (addAccountBtn) addAccountBtn.addEventListener('click', () => openModal('add'));
    if (cancelModal) cancelModal.addEventListener('click', () => accountModal?.classList.add('hidden'));

    if (accountList) {
        accountList.addEventListener('click', function (e) {
            const matk = e.target.getAttribute('data-matk');
            if (e.target.classList.contains('edit')) {
                const account = accounts.find(a => a.MaTK === matk);
                if (account) openModal('edit', account);
            } else if (e.target.classList.contains('delete')) {
                deleteMaTK = matk;
                deleteModal?.classList.remove('hidden');
            }
        });
    }

    if (cancelDelete) cancelDelete.addEventListener('click', () => deleteModal?.classList.add('hidden'));
    if (confirmDelete) confirmDelete.addEventListener('click', () => {
        if (deleteMaTK) {
            accounts = accounts.filter(a => a.MaTK !== deleteMaTK);
            filterAccounts();
            deleteModal?.classList.add('hidden');
            deleteMaTK = null;
        }
    });

    if (accountForm) {
        accountForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const account = {
                MaTK: document.getElementById('maTK').value,
                TenDangNhap: document.getElementById('tenDangNhap').value,
                MatKhau: document.getElementById('matKhau').value || accounts.find(a => a.MaTK === document.getElementById('maTK').value)?.MatKhau,
                VaiTro: document.getElementById('vaiTro').value,
                HoTen: document.getElementById('hoTen').value,
                Email: document.getElementById('email').value,
                Sdt: document.getElementById('sdt').value
            };

            const existingIndex = accounts.findIndex(a => a.MaTK === account.MaTK);
            if (existingIndex >= 0) {
                accounts[existingIndex] = account;
            } else {
                accounts.push(account);
            }

            filterAccounts();
            accountModal?.classList.add('hidden');
        });
    }

    if (filterVaiTro) filterVaiTro.addEventListener('change', filterAccounts);
    if (searchAccount) searchAccount.addEventListener('input', filterAccounts);

    // Render dữ liệu mẫu
    renderAccounts(accounts);
});