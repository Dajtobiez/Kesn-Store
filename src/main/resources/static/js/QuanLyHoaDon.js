
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
    const btnPrev = document.getElementById('prev-page');
    const btnNext = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');

	// File: QuanLyHoaDon.js

	let invoices = [];
	let currentPage = 1;
	let pageSize = 10;
	let editingInvoiceId = null;
	let currentProducts = [];

	// Gọi API load toàn bộ danh sách hóa đơn
	async function fetchInvoices() {
	  try {
	    const response = await fetch("/api/hoadon");
	    if (!response.ok) throw new Error("Không thể lấy dữ liệu hóa đơn");
	    invoices = await response.json();
	    filterInvoices();
	    updateStatistics();
	  } catch (error) {
	    console.error("Lỗi khi tải hóa đơn:", error);
	  }
	}

	// Cập nhật thống kê
	function updateStatistics() {
	  document.getElementById("total-invoices").textContent = invoices.length;
	  document.getElementById("unpaid-invoices").textContent = invoices.filter(i => i.trangThaiThanhToan === "Chưa thanh toán").length;
	  document.getElementById("shipping-invoices").textContent = invoices.filter(i => i.trangThaiGiaoHang === "Đang giao").length;
	  const today = new Date().toISOString().split("T")[0];
	  document.getElementById("update-date").textContent = today;
	}

	// Hiển thị danh sách hóa đơn phân trang
	function displayInvoices(data) {
	  const start = (currentPage - 1) * pageSize;
	  const paginatedData = data.slice(start, start + pageSize);
	  const tbody = document.getElementById("invoice-list");
	  tbody.innerHTML = "";
	  for (const hd of paginatedData) {
	    const row = document.createElement("tr");
	    row.innerHTML = `
	      <td>${hd.maHD}</td>
	      <td>${hd.maKH}</td>
	      <td>${hd.trangThaiThanhToan}</td>
	      <td>${hd.phuongThucThanhToan}</td>
	      <td>${hd.trangThaiGiaoHang}</td>
	      <td>${hd.ngayGiaoDuKien}</td>
	      <td>
	        <button class="text-blue-500" onclick="openInvoiceModal('${hd.maHD}')">Sửa</button>
	        <button class="text-red-500 ml-2" onclick="deleteInvoice('${hd.maHD}')">Xóa</button>
	      </td>
	    `;
	    tbody.appendChild(row);
	  }
	  document.getElementById("current-page").textContent = `Trang: ${currentPage} / ${Math.ceil(data.length / pageSize)}`;
	}

	// Lọc hóa đơn theo trạng thái
	function filterInvoices() {
	  const keyword = document.getElementById("search-invoice").value.toLowerCase();
	  const statusThanhToan = document.getElementById("filter-trangthai-thanhtoan").value;
	  const statusVanChuyen = document.getElementById("filter-trangthai-vanchuyen").value;

	  const filtered = invoices.filter(hd => {
	    return (
	      (hd.maHD.toLowerCase().includes(keyword) || hd.maKH.toLowerCase().includes(keyword)) &&
	      (statusThanhToan === "" || hd.trangThaiThanhToan === statusThanhToan) &&
	      (statusVanChuyen === "" || hd.trangThaiGiaoHang === statusVanChuyen)
	    );
	  });

	  displayInvoices(filtered);
	}

	// Modal thêm/sửa hóa đơn
	function openInvoiceModal(maHD) {
	  document.getElementById("invoice-modal").classList.remove("hidden");
	  document.getElementById("modal-title").textContent = maHD ? "Sửa Hóa đơn" : "Thêm Hóa đơn";

	  const hd = invoices.find(i => i.maHD === maHD);
	  if (hd) {
	    document.getElementById("mahd").value = hd.maHD;
	    document.getElementById("makh").value = hd.maKH;
	    document.getElementById("trangthai-thanhtoan").value = hd.trangThaiThanhToan;
	    document.getElementById("phuongthuc-thanhtoan").value = hd.phuongThucThanhToan;
	    document.getElementById("trangthai-vanchuyen").value = hd.trangThaiGiaoHang;
	    document.getElementById("phuongthuc-vanchuyen").value = hd.phuongThucGiaoHang;
	    document.getElementById("ngaygiaodukien").value = hd.ngayGiaoDuKien;
	    editingInvoiceId = maHD;
	  } else {
	    document.getElementById("invoice-form").reset();
	    editingInvoiceId = null;
	  }
	  currentProducts = [];
	  renderProductDetails();
	}

	function closeInvoiceModal() {
	  document.getElementById("invoice-modal").classList.add("hidden");
	}

	function renderProductDetails() {
	  const tbody = document.getElementById("product-details");
	  tbody.innerHTML = "";
	  for (let i = 0; i < currentProducts.length; i++) {
	    const p = currentProducts[i];
	    const row = document.createElement("tr");
	    row.innerHTML = `
	      <td class="p-2 text-sm">${p.tenSP}</td>
	      <td class="p-2 text-sm">${p.tenMau}</td>
	      <td class="p-2 text-sm">${p.soSize}</td>
	      <td class="p-2 text-sm">${p.soLuong}</td>
	      <td class="p-2 text-sm">${p.gia}</td>
	      <td class="p-2 text-sm"><button onclick="removeProduct(${i})" class="text-red-500">Xóa</button></td>
	    `;
	    tbody.appendChild(row);
	  }
	}

	function removeProduct(index) {
	  currentProducts.splice(index, 1);
	  renderProductDetails();
	}

	// Thêm sản phẩm vào danh sách chi tiết hóa đơn
	function openProductModal() {
	  document.getElementById("product-modal").classList.remove("hidden");
	  document.getElementById("product-form").reset();
	}

	function closeProductModal() {
	  document.getElementById("product-modal").classList.add("hidden");
	}

	document.getElementById("product-form").addEventListener("submit", function (e) {
	  e.preventDefault();
	  const product = {
	    maSP: document.getElementById("product-masp").value,
	    tenSP: document.getElementById("product-tensp").value,
	    maMau: document.getElementById("product-mamau").value,
	    tenMau: document.getElementById("product-tenmau").value,
	    maSize: document.getElementById("product-masize").value,
	    soSize: document.getElementById("product-sosize").value,
	    soLuong: +document.getElementById("product-soluong").value,
	    gia: +document.getElementById("product-gia").value,
	  };
	  currentProducts.push(product);
	  renderProductDetails();
	  closeProductModal();
	});

	document.getElementById("cancel-modal").addEventListener("click", closeInvoiceModal);
	document.getElementById("cancel-product").addEventListener("click", closeProductModal);
	document.getElementById("add-invoice").addEventListener("click", () => openInvoiceModal(null));
	document.getElementById("add-product").addEventListener("click", openProductModal);
	document.getElementById("search-invoice").addEventListener("input", filterInvoices);
	document.getElementById("filter-trangthai-thanhtoan").addEventListener("change", filterInvoices);
	document.getElementById("filter-trangthai-vanchuyen").addEventListener("change", filterInvoices);

	document.getElementById("prev-page").addEventListener("click", () => {
	  if (currentPage > 1) {
	    currentPage--;
	    filterInvoices();
	  }
	});

	document.getElementById("next-page").addEventListener("click", () => {
	  const maxPage = Math.ceil(invoices.length / pageSize);
	  if (currentPage < maxPage) {
	    currentPage++;
	    filterInvoices();
	  }
	});

	fetchInvoices();
});
