document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');
    const orderModal = document.getElementById('order-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const orderForm = document.getElementById('order-form');

    const searchInput = document.getElementById('search-order');
    const filterStatus = document.getElementById('filter-trangthai');

    const madonInput = document.getElementById('madh');
    const makhInput = document.getElementById('makh');
    const tenkhInput = document.getElementById('tenkh');
    const ngaydatInput = document.getElementById('ngaydatthang');
    const tongtienInput = document.getElementById('tongtien');
    const trangthaiSelect = document.getElementById('trangthai');
    const modalTitle = document.getElementById('modal-title');
    const productDetails = document.getElementById('product-details');

    let orders = [];
    let selectedOrderId = null;

    function renderOrders(filtered) {
        orderList.innerHTML = '';
        filtered.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="p-3">${order.maDH}</td>
                <td class="p-3">${order.maKH}</td>
                <td class="p-3">${order.tenKH || ''}</td>
                <td class="p-3">${order.ngayDatHang}</td>
                <td class="p-3">${order.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td class="p-3">${order.trangThai || 'Chờ xác nhận'}</td>
                <td class="p-3">
                    <button class="edit-order bg-yellow-500 text-white px-2 py-1 rounded" data-id="${order.maDH}">Chi tiết</button>
                </td>`;
            orderList.appendChild(tr);
        });
    }

    function filterOrders() {
        const status = filterStatus.value;
        const keyword = searchInput.value.toLowerCase();

        const filtered = orders.filter(o => {
            const matchKeyword = o.maDH.toLowerCase().includes(keyword) ||
                o.maKH.toLowerCase().includes(keyword) ||
                (o.tenKH?.toLowerCase().includes(keyword));
            const matchStatus = !status || o.trangThai === status;
            return matchKeyword && matchStatus;
        });

        renderOrders(filtered);
    }

    function openModal(order) {
        modalTitle.textContent = 'Chi tiết Đơn hàng';
        madonInput.value = order.maDH;
        makhInput.value = order.maKH;
        tenkhInput.value = order.tenKH || '';
        ngaydatInput.value = order.ngayDatHang;
        tongtienInput.value = order.tongTien;
        trangthaiSelect.value = order.trangThai || 'Chờ xác nhận';

        productDetails.innerHTML = '';
        // TODO: nếu có dữ liệu chi tiết đơn hàng, render ở đây

        selectedOrderId = order.maDH;
        orderModal.classList.remove('hidden');
    }

    if (orderList) {
        orderList.addEventListener('click', function (e) {
            if (e.target.classList.contains('edit-order')) {
                const id = e.target.dataset.id;
                const order = orders.find(o => o.maDH === id);
                if (order) openModal(order);
            }
        });
    }

    if (cancelModal) {
        cancelModal.addEventListener('click', () => {
            orderModal.classList.add('hidden');
            selectedOrderId = null;
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const trangThai = trangthaiSelect.value;
            const updatedOrder = {
                trangThai: trangThai
            };

            try {
                const res = await fetch(`/api/donhang/${selectedOrderId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedOrder)
                });
                if (!res.ok) throw new Error('Lỗi khi cập nhật đơn hàng');

                await fetchOrders();
                orderModal.classList.add('hidden');
                selectedOrderId = null;
            } catch (err) {
                console.error(err);
                alert('Cập nhật đơn hàng thất bại');
            }
        });
    }

    async function fetchOrders() {
        try {
            const res = await fetch('/api/donhang');
            if (!res.ok) throw new Error('Không thể tải đơn hàng');
            orders = await res.json();
            filterOrders();
        } catch (err) {
            console.error(err);
        }
    }

    searchInput?.addEventListener('input', filterOrders);
    filterStatus?.addEventListener('change', filterOrders);

    fetchOrders();
});
