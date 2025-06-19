// QuanLySanPham.js - Version đã tối ưu, loại bỏ trùng lặp, fix lỗi JSON, fetch và hiển thị đầy đủ sản phẩm

document.addEventListener('DOMContentLoaded', function () {
	function initInterceptor() {
	    const originalFetch = window.fetch;

	    window.fetch = async (...args) => {
	        try {
	            // ✅ Tùy chọn: ghi log request
	            console.log('📤 Request:', args[0], args[1]);

	            const response = await originalFetch(...args);

	            // ✅ Tùy chọn: ghi log response
	            console.log('📥 Response:', response);

	            // ✅ Nếu HTTP status là lỗi, thì throw để xử lý luôn
	            if (!response.ok) {
	                const errorText = await response.text();
	                throw new Error(`HTTP ${response.status} - ${errorText}`);
	            }

	            return response;
	        } catch (error) {
	            console.error('❌ Fetch Error:', error);
	            throw error; // cần throw lại để bên gọi biết có lỗi
	        }
	    };
	}
	
	initInterceptor();
	
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

    const totalProductsEl = document.getElementById('total-products');
    const lowStockProductsEl = document.getElementById('low-stock-products');
    const totalCategoriesEl = document.getElementById('total-categories');
    const statsDateEl = document.getElementById('stats-date');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const currentPageEl = document.getElementById('current-page');

    let products = [];
    let deleteMaSP = null;
    let currentPage = 1;
    const productsPerPage = 10;

    function updateStats(data) {
        totalProductsEl.textContent = data.length;
        lowStockProductsEl.textContent = data.filter(p =>
            p.chiTiet?.some(m => m.sizes?.some(s => s.soLuong < 10))
        ).length;
        totalCategoriesEl.textContent = new Set(data.map(p => p.danhMuc?.tenDanhMuc)).size;
        statsDateEl.textContent = new Date().toLocaleDateString('vi-VN');
    }

    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        filteredProducts.slice(start, end).forEach((product, index) => {
            const soMau = product.chiTiet?.length || 0;
            const kichThuocChiTiet = product.chiTiet?.map(mau => {
                const sizeList = mau.sizes.map(size => `Size ${size.soSize}`).join(', ');
                return `<strong>${mau.tenMau}</strong>: ${sizeList}`;
            }).join('<br>') || '';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${start + index + 1}</td>
                <td class="p-3">${product.maSP}</td>
                <td class="p-3">${product.ten}</td>
                <td class="p-3">${product.danhMuc?.tenDanhMuc || ''}</td>
                <td class="p-3">${product.thuongHieu?.tenThuongHieu || ''}</td>
                <td class="p-3">${soMau}</td>
                <td class="p-3">${kichThuocChiTiet}</td>
                <td class="p-3">
                    <button class="action-button edit bg-yellow-500 text-white px-2 py-1 rounded" data-masp="${product.maSP}">Chỉnh sửa</button>
                    <button class="action-button delete bg-red-600 text-white px-2 py-1 rounded" data-masp="${product.maSP}">Xóa</button>
                </td>`;
            productList.appendChild(row);
        });
        renderPagination(filteredProducts.length);
    }

    function renderPagination(total) {
        const totalPages = Math.ceil(total / productsPerPage);
        if (currentPageEl) currentPageEl.textContent = currentPage;
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    function filterProducts() {
        const danhMuc = filterDanhMuc?.value;
        const thuongHieu = filterThuongHieu?.value;
        const searchTerm = searchProduct?.value.toLowerCase();

        let filteredProducts = products;
        if (danhMuc) filteredProducts = filteredProducts.filter(p => p.danhMuc?.tenDanhMuc === danhMuc);
        if (thuongHieu) filteredProducts = filteredProducts.filter(p => p.thuongHieu?.tenThuongHieu === thuongHieu);
        if (searchTerm) filteredProducts = filteredProducts.filter(p =>
            p.maSP.toLowerCase().includes(searchTerm) ||
            p.ten.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu');
            products = await response.json();
            updateStats(products);
            filterProducts();
        } catch (err) {
            console.error(err);
        }
    }
	
    function openModal(mode, product = null) {
        modalTitle.textContent = mode === 'add' ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm';
        if (mode === 'edit' && product) {
            document.getElementById('masp').value = product.maSP;
            document.getElementById('masp').disabled = true;
            document.getElementById('tensp').value = product.ten;
            document.getElementById('danhmuc').value = product.danhMuc?.tenDanhMuc || '';
            document.getElementById('thuonghieu').value = product.thuongHieu?.tenThuongHieu || '';
            document.getElementById('mota').value = product.moTa || '';
            //document.getElementById('anh').value = product.anh?.join(', ') || '';
            chitietContainer.innerHTML = '';
            product.chiTiet?.forEach(mau => addMau(mau.tenMau, mau.sizes));
        } else {
            productForm.reset();
            document.getElementById('masp').disabled = false;
            chitietContainer.innerHTML = '';
            addMau();
        }
        productModal.classList.remove('hidden');
    }

    function addMau(mauValue = 'Đen', sizes = [{ soSize: '36', soLuong: 0, gia: 0 }]) {
        const mauItem = document.createElement('div');
        mauItem.className = 'mau-item';
        mauItem.innerHTML = `
            <select class="mau" required>
                ${['Đen', 'Trắng', 'Xanh dương', 'Đỏ'].map(color => `<option value="${color}" ${color === mauValue ? 'selected' : ''}>${color}</option>`).join('')}
            </select>
            <div class="size-details"></div>
            <button type="button" class="add-size bg-blue-600 text-white px-2 py-1 rounded">Thêm kích thước</button>
            <button type="button" class="delete-mau bg-red-600 text-white px-2 py-1 rounded">Xóa màu</button>`;
        chitietContainer.appendChild(mauItem);

        const sizeDetails = mauItem.querySelector('.size-details');
        sizes.forEach(size => addSize(sizeDetails, size));
        mauItem.querySelector('.add-size').addEventListener('click', () => addSize(sizeDetails));
        mauItem.querySelector('.delete-mau').addEventListener('click', () => mauItem.remove());
    }

    function addSize(container, size = { soSize: '36', soLuong: 0, gia: 0 }) {
        const sizeContainer = document.createElement('div');
        sizeContainer.className = 'size-chitiet-container';
        sizeContainer.innerHTML = `
            <select class="size">
                ${[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(s => `<option value="${s}" ${s.toString() === size.soSize ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
            <input type="number" class="soluong" placeholder="Số lượng" value="${size.soLuong}" required>
            <input type="number" class="gia" placeholder="Giá" value="${size.gia}" required>
            <button type="button" class="delete-size bg-red-600 text-white px-2 py-1 rounded">Xóa kích thước</button>`;
        container.appendChild(sizeContainer);
        sizeContainer.querySelector('.delete-size').addEventListener('click', () => sizeContainer.remove());
    }

    if (addProductBtn) addProductBtn.addEventListener('click', () => openModal('add'));
    if (cancelModal) cancelModal.addEventListener('click', () => productModal.classList.add('hidden'));
    if (addMauBtn) addMauBtn.addEventListener('click', () => addMau());

    if (productForm) {
		productForm.addEventListener('submit', async function (e) {
		    e.preventDefault();
		    const maSP = document.getElementById('masp').value.trim();
		    const ten = document.getElementById('tensp').value.trim();
		    const danhMuc = document.getElementById('danhmuc').value.trim();
		    const thuongHieu = document.getElementById('thuonghieu').value.trim();
		    const moTa = document.getElementById('mota')?.value.trim() || '';
		    //const anh = document.getElementById('anh')?.value.trim();

		    const chiTiet = [];
		    let valid = true;

		    document.querySelectorAll('.mau-item').forEach(mauItem => {
		        const tenMau = mauItem.querySelector('.mau').value;
		        const sizes = [];

		        mauItem.querySelectorAll('.size-chitiet-container').forEach(sizeItem => {
		            const soSize = sizeItem.querySelector('.size').value;
		            const soLuong = parseInt(sizeItem.querySelector('.soluong').value);
		            const gia = parseFloat(sizeItem.querySelector('.gia').value);

		            if (isNaN(soLuong) || isNaN(gia)) {
		                valid = false;
		            } else {
		                sizes.push({ soSize, soLuong, gia });
		            }
		        });

		        if (sizes.length > 0) {
		            chiTiet.push({ tenMau, sizes });
		        }
		    });

		    if (!valid || chiTiet.length === 0) {
		        alert('Vui lòng nhập đầy đủ thông tin số lượng và giá!');
		        return;
		    }

		    const productData = {
		        maSP,
		        ten,
		        danhMuc: { tenDanhMuc: danhMuc },
		        thuongHieu: { tenThuongHieu: thuongHieu },
		        moTa,
		        //anh,
		        chiTiet
		    };

		    try {
		        const isEdit = document.getElementById('masp').disabled;
		        const response = await fetch(`/api/products${isEdit ? '/' + maSP : ''}`, {
		            method: isEdit ? 'PUT' : 'POST',
		            headers: { 'Content-Type': 'application/json' },
		            body: JSON.stringify(productData)
		        });

		        if (!response.ok) throw new Error('Lỗi khi lưu sản phẩm');

		        productModal.classList.add('hidden');
		        await fetchProducts();
		    } catch (err) {
		        console.error(err);
		        alert('Lỗi khi lưu sản phẩm');
				    }
				});  // ✅ kết thúc addEventListener

		
    if (productList) {
        productList.addEventListener('click', function (e) {
            const masp = e.target.getAttribute('data-masp');
            if (e.target.classList.contains('edit')) {
                const product = products.find(p => p.maSP === masp);
                if (product) openModal('edit', product);
            } else if (e.target.classList.contains('delete')) {
                deleteMaSP = masp;
                deleteModal.classList.remove('hidden');
            }
        });
    }

    if (cancelDelete) cancelDelete.addEventListener('click', () => deleteModal.classList.add('hidden'));
	if (confirmDelete) {
	    confirmDelete.addEventListener('click', async () => {
	        if (deleteMaSP) {
	            try {
	                deleteModal.classList.add('hidden'); // Đóng modal trước
	                await fetch(`/api/products/${deleteMaSP}`, { method: 'DELETE' });
	                deleteMaSP = null;
	                currentPage = 1; // Reset về trang 1 sau khi xóa
	                await fetchProducts(); // Cập nhật thống kê + sản phẩm
	            } catch (err) {
	                console.error('Lỗi khi xóa sản phẩm:', err);
	                alert('Không thể xóa sản phẩm');
	            }
	        }
	    });
	}

    filterDanhMuc?.addEventListener('change', () => { currentPage = 1; filterProducts(); });
    filterThuongHieu?.addEventListener('change', () => { currentPage = 1; filterProducts(); });
    searchProduct?.addEventListener('input', () => { currentPage = 1; filterProducts(); });

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; filterProducts(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) { currentPage++; filterProducts(); }
    });
	
	document.getElementById("add-product").addEventListener("click", () => {
	    fetch("/api/products/generate-code")
	        .then(res => res.text())
	        .then(maSP => {
	            // Gán mã sản phẩm vào field
	            document.getElementById("masp").value = maSP;

	            // Reset form nếu có
	            document.getElementById("product-form").reset();

	            // Gán lại mã sản phẩm sau reset (vì reset sẽ xóa luôn input)
	            document.getElementById("masp").value = maSP;

	            // Hiện modal
	            document.getElementById("product-modal").classList.remove("hidden");

	            // Gán tiêu đề modal
	            document.getElementById("modal-title").textContent = "Thêm sản phẩm";
	        })
	        .catch(err => {
	            console.error("Lỗi khi lấy mã sản phẩm:", err);
	            alert("Không lấy được mã sản phẩm mới.");
	        });
	});



    fetchProducts();
}
});