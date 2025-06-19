document.addEventListener('DOMContentLoaded', function () {
    const supportList = document.getElementById('support-list');
    const adminSupportModal = document.getElementById('admin-support-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const adminSupportForm = document.getElementById('admin-support-form');
    const searchSupport = document.getElementById('search-support');
    const filterStatus = document.getElementById('filter-status');

    // Dữ liệu mẫu (giả lập từ form khách hàng)
    let supports = [
        {
            MaHT: 'HT001',
            HoTen: 'Nguyen Van A',
            Email: 'nguyenvana@gmail.com',
            LoaiYeuCau: 'doi_tra',
            NoiDung: 'Muốn đổi sản phẩm SP001.',
            NgayGui: '2025-06-10',
            TrangThai: 'Chưa xử lý',
            PhanHoi: ''
        },
        {
            MaHT: 'HT002',
            HoTen: 'Tran Thi B',
            Email: 'tranthib@gmail.com',
            LoaiYeuCau: 'giao_hang',
            NoiDung: 'Giao hàng chậm.',
            NgayGui: '2025-06-11',
            TrangThai: 'Đang xử lý',
            PhanHoi: 'Đang kiểm tra, sẽ phản hồi sớm.'
        }
    ];

    // Render danh sách yêu cầu
    function renderSupports(filteredSupports = supports) {
        supportList.innerHTML = '';
        filteredSupports.forEach(support => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${support.MaHT}</td>
                <td class="p-3">${support.HoTen}</td>
                <td class="p-3">${support.Email}</td>
                <td class="p-3">${support.LoaiYeuCau === 'doi_tra' ? 'Đổi trả' : support.LoaiYeuCau === 'giao_hang' ? 'Giao hàng' : support.LoaiYeuCau === 'hoan_tien' ? 'Hoàn tiền' : 'Khác'}</td>
                <td class="p-3">${support.NoiDung}</td>
                <td class="p-3">${support.NgayGui}</td>
                <td class="p-3">${support.TrangThai}</td>
                <td class="p-3">
                    <button class="action-button reply" data-maht="${support.MaHT}">Trả lời</button>
                </td>
            `;
            supportList.appendChild(row);
        });
    }

    // Mở modal trả lời
    supportList.addEventListener('click', function (e) {
        if (e.target.classList.contains('reply')) {
            const maht = e.target.getAttribute('data-maht');
            const support = supports.find(s => s.MaHT === maht);
            if (support) {
                document.getElementById('admin-maht').value = support.MaHT;
                document.getElementById('admin-name').value = support.HoTen;
                document.getElementById('admin-email').value = support.Email;
                document.getElementById('admin-request-type').value = support.LoaiYeuCau === 'doi_tra' ? 'Đổi trả' : support.LoaiYeuCau === 'giao_hang' ? 'Giao hàng' : support.LoaiYeuCau === 'hoan_tien' ? 'Hoàn tiền' : 'Khác';
                document.getElementById('admin-content').value = support.NoiDung;
                document.getElementById('admin-response').value = support.PhanHoi || '';
                document.getElementById('admin-status').value = support.TrangThai;
                adminSupportModal.classList.remove('hidden');
            }
        }
    });

    // Đóng modal
    cancelModal.addEventListener('click', () => {
        adminSupportModal.classList.add('hidden');
    });

    // Lưu phản hồi
    adminSupportForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const maht = document.getElementById('admin-maht').value;
        const support = supports.find(s => s.MaHT === maht);
        if (support) {
            support.PhanHoi = document.getElementById('admin-response').value;
            support.TrangThai = document.getElementById('admin-status').value;
            renderSupports();
            adminSupportModal.classList.add('hidden');
        }
    });

    // Tìm kiếm và lọc
    searchSupport.addEventListener('input', function () {
        const searchTerm = searchSupport.value.toLowerCase();
        const statusFilter = filterStatus.value;
        let filteredSupports = supports;

        if (searchTerm) {
            filteredSupports = filteredSupports.filter(s => 
                s.MaHT.toLowerCase().includes(searchTerm) ||
                s.HoTen.toLowerCase().includes(searchTerm) ||
                s.Email.toLowerCase().includes(searchTerm)
            );
        }
        if (statusFilter) {
            filteredSupports = filteredSupports.filter(s => s.TrangThai === statusFilter);
        }

        renderSupports(filteredSupports);
    });

    filterStatus.addEventListener('change', function () {
        const searchTerm = searchSupport.value.toLowerCase();
        const statusFilter = filterStatus.value;
        let filteredSupports = supports;

        if (searchTerm) {
            filteredSupports = filteredSupports.filter(s => 
                s.MaHT.toLowerCase().includes(searchTerm) ||
                s.HoTen.toLowerCase().includes(searchTerm) ||
                s.Email.toLowerCase().includes(searchTerm)
            );
        }
        if (statusFilter) {
            filteredSupports = filteredSupports.filter(s => s.TrangThai === statusFilter);
        }

        renderSupports(filteredSupports);
    });

    // Render lần đầu
    renderSupports();
});