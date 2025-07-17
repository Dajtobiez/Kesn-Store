document.addEventListener('DOMContentLoaded', function() {
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

	let allAccounts = [];
	let deleteMaTK = null;
	let currentPage = 1;
	const pageSize = 10;

	function generateMaTK() {
		const prefix = 'TK';
		let maxNumber = 0;
		allAccounts.forEach(acc => {
			const match = acc.maTK.match(/^TK(\d+)$/);
			if (match) {
				const number = parseInt(match[1], 10);
				if (number > maxNumber) maxNumber = number;
			}
		});
		return prefix + String(maxNumber + 1).padStart(3, '0');
	}

	function normalizeString(str) {
		return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "");
	}

	async function fetchAccounts() {
		try {
			const res = await fetch('/api/accounts');
			allAccounts = await res.json();
			filterAccounts();
			updateStatistics();
		} catch (error) {
			console.error('Lỗi khi lấy danh sách tài khoản:', error);
		}
	}

	const today = new Date();
	const formattedDate = today.toLocaleDateString('vi-VN');
	document.querySelectorAll('.update-date').forEach(el => {
		el.textContent = `Cập nhật: ${formattedDate}`;
	});

	function updateStatistics() {
		const total = allAccounts.length;
		const quanTriVien = allAccounts.filter(a => normalizeString(a.vaiTro) === 'quantrivien').length;
		const khachHang = allAccounts.filter(a => normalizeString(a.vaiTro) === 'khachhang').length;

		document.querySelectorAll('.main-container')[0].querySelector('p.text-2xl').textContent = total;
		document.querySelectorAll('.main-container')[1].querySelector('p.text-2xl').textContent = quanTriVien;
		document.querySelectorAll('.main-container')[2].querySelector('p.text-2xl').textContent = khachHang;
	}

	function renderAccounts(filteredAccounts) {
		if (!accountList) return;
		const start = (currentPage - 1) * pageSize;
		const end = start + pageSize;
		const paginatedAccounts = filteredAccounts.slice(start, end);
		accountList.innerHTML = '';
		paginatedAccounts.forEach((account, index) => {
			const row = document.createElement('tr');
			row.innerHTML = `
				<td class="p-3">${start + index + 1}</td>
				<td class="p-3">${account.maTK}</td>
				<td class="p-3">${account.tenDangNhap}</td>
				<td class="p-3">${account.vaiTro}</td>
				<td class="p-3">
					<button class="action-button edit" data-matk="${account.maTK}">Chỉnh sửa</button>
					<button class="action-button delete" data-matk="${account.maTK}">Xóa</button>
				</td>
			`;
			accountList.appendChild(row);
		});
		renderPagination(filteredAccounts.length);
	}

	function renderPagination(totalItems) {
		const totalPages = Math.ceil(totalItems / pageSize);
		const pagination = document.getElementById('pagination');
		const currentPageSpan = document.getElementById('current-page');
		const prevPageBtn = document.getElementById('prev-page');
		const nextPageBtn = document.getElementById('next-page');

		if (!pagination || !currentPageSpan || !prevPageBtn || !nextPageBtn) return;

		currentPageSpan.textContent = `Trang: ${currentPage} / ${totalPages}`;
		prevPageBtn.disabled = currentPage <= 1;
		nextPageBtn.disabled = currentPage >= totalPages;

		prevPageBtn.onclick = () => {
			if (currentPage > 1) {
				currentPage--;
				filterAccounts();
			}
		};

		nextPageBtn.onclick = () => {
			if (currentPage < totalPages) {
				currentPage++;
				filterAccounts();
			}
		};
	}

	function filterAccounts() {
		const vaiTro = normalizeString(filterVaiTro?.value || "");
		const searchTerm = normalizeString(searchAccount?.value || "");
		let filteredAccounts = [...allAccounts];
		if (vaiTro) {
			filteredAccounts = filteredAccounts.filter(a => normalizeString(a.vaiTro) === vaiTro);
		}
		if (searchTerm) {
			filteredAccounts = filteredAccounts.filter(a =>
				normalizeString(a.maTK).includes(searchTerm) ||
				normalizeString(a.tenDangNhap).includes(searchTerm)
			);
		}
		renderAccounts(filteredAccounts);
	}

	function toggleKhachHangFields() {
		const vaiTroValue = document.getElementById('vaiTro').value.toLowerCase();
		const khachHangFields = document.querySelectorAll('.khachhang-field');
		khachHangFields.forEach(field => {
			field.style.display = (vaiTroValue === 'khách hàng') ? 'block' : 'none';
		});
	}

	function openModal(mode, account = null) {
		modalTitle.textContent = mode === 'add' ? 'Thêm tài khoản' : 'Chỉnh sửa tài khoản';

		accountForm.reset();
		document.getElementById('maTK').disabled = true;

		if (mode === 'edit' && account) {
			document.getElementById('maTK').value = account.maTK;
			document.getElementById('tenDangNhap').value = account.tenDangNhap || '';
			document.getElementById('matKhau').value = account.matKhau || '';

			const vaiTroField = document.getElementById('vaiTro');
			const vaiTroNormalized = account.vaiTro?.toLowerCase().replace(/\s/g, '');

			if (vaiTroNormalized === 'kháchhàng' || vaiTroNormalized === 'khachhang') {
				vaiTroField.value = 'Khách hàng';

				document.getElementById('hoTen').value = account.hoTen || '';
				document.getElementById('email').value = account.email || '';
				document.getElementById('sdt').value = account.sdt || '';
				document.getElementById('diaChi').value = account.diaChi || '';
			} else {
				vaiTroField.value = 'Quản trị viên';

				document.getElementById('hoTen').value = '';
				document.getElementById('email').value = '';
				document.getElementById('sdt').value = '';
				document.getElementById('diaChi').value = '';
			}
		} else {
			document.getElementById('maTK').value = generateMaTK();
			document.getElementById('vaiTro').value = 'Khách hàng';
		}

		toggleKhachHangFields();

		const vaiTroSelect = document.getElementById('vaiTro');
		vaiTroSelect.removeEventListener('change', toggleKhachHangFields);
		vaiTroSelect.addEventListener('change', toggleKhachHangFields);

		accountModal.classList.remove('hidden');
	}


	addAccountBtn?.addEventListener('click', () => openModal('add'));
	cancelModal?.addEventListener('click', () => accountModal.classList.add('hidden'));

	accountList?.addEventListener('click', async function(e) {
		const matk = e.target.getAttribute('data-matk');
		if (e.target.classList.contains('edit')) {
			await fetchAccounts(); // Đảm bảo lấy bản mới nhất
			const account = allAccounts.find(a => a.maTK === matk);
			if (account) openModal('edit', account);
		} else if (e.target.classList.contains('delete')) {
			deleteMaTK = matk;
			deleteModal.classList.remove('hidden');
		}
	});

	cancelDelete?.addEventListener('click', () => deleteModal.classList.add('hidden'));

	confirmDelete?.addEventListener('click', async () => {
		try {
			await fetch(`/api/accounts/${deleteMaTK}`, { method: 'DELETE' });
			await fetchAccounts();
			deleteModal.classList.add('hidden');
			deleteMaTK = null;
		} catch (error) {
			console.error('Lỗi khi xóa tài khoản:', error);
		}
	});

	accountForm?.addEventListener('submit', async function(e) {
		e.preventDefault();

		const maTK = document.getElementById('maTK').value.trim();
		const tenDangNhap = document.getElementById('tenDangNhap').value.trim();
		const isEdit = !!allAccounts.find(a => a.maTK === maTK);

		// 🔍 Kiểm tra trùng tên đăng nhập
		try {
			const res = await fetch(`/api/accounts/check-username?username=${encodeURIComponent(tenDangNhap)}`);
			const exists = await res.json();

			if (!isEdit && exists) {
				alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
				return;
			}

			if (isEdit) {
				const currentAccount = allAccounts.find(a => a.maTK === maTK);
				if (exists && currentAccount?.tenDangNhap !== tenDangNhap) {
					alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
					return;
				}
			}
		} catch (error) {
			console.error('Lỗi kiểm tra tên đăng nhập:', error);
			alert('Không thể kiểm tra trùng tên đăng nhập.');
			return;
		}

		const account = {
			maTK,
			tenDangNhap,
			matKhau: document.getElementById('matKhau').value || (allAccounts.find(a => a.maTK === maTK)?.matKhau ?? ''),
			vaiTro: document.getElementById('vaiTro').value,
			hoTen: document.getElementById('hoTen').value,
			email: document.getElementById('email').value,
			sdt: document.getElementById('sdt').value,
			diaChi: document.getElementById('diaChi').value
		};

		try {
			await fetch(`/api/accounts${isEdit ? `/${maTK}` : ''}`, {
				method: isEdit ? 'PUT' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(account)
			});
			await fetchAccounts();
			accountModal.classList.add('hidden');
		} catch (error) {
			console.error('Lỗi khi lưu tài khoản:', error);
			alert('Không thể lưu tài khoản.');
		}
	});

	filterVaiTro?.addEventListener('change', filterAccounts);
	searchAccount?.addEventListener('input', filterAccounts);

	fetchAccounts();
});
