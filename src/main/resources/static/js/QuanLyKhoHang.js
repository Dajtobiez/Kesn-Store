document.addEventListener("DOMContentLoaded", () => {
    const API_SANPHAM = "http://localhost:8080/api/sanpham";
    const API_DANHMUC = "http://localhost:8080/api/danhmuc";

    const productList = document.getElementById("product-list");
    const totalProducts = document.getElementById("total-products");
    const lowStockCount = document.getElementById("low-stock-count");
    const categoryCount = document.getElementById("category-count");
    const danhMucSelect = document.getElementById("danhmuc");
    const modal = document.getElementById("product-modal");
    const cancelModalBtn = document.getElementById("cancel-modal");
    const form = document.getElementById("product-form");

    // ===== Mở modal và gọi mã mới =====
    document.getElementById("add-product").addEventListener("click", async () => {
        modal.classList.remove("hidden");
        form.reset();
        try {
            const res = await fetch(`${API_SANPHAM}/generate-code`);
            const maMoi = await res.text();
            document.getElementById("masp").value = maMoi;
            await loadDanhMuc();
        } catch (err) {
            console.error("Lỗi lấy mã sản phẩm hoặc danh mục:", err);
        }
    });

    cancelModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dto = {
            maSP: document.getElementById("masp").value,
            ten: document.getElementById("tensp").value,
            danhMuc: {
                tenDanhMuc: document.getElementById("danhmuc").value
            },
            chiTiet: [] // Không nhập màu-size ở modal này
        };

        try {
            const res = await fetch(API_SANPHAM, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });
            if (res.ok) {
                alert("✔️ Thêm sản phẩm thành công!");
                modal.classList.add("hidden");
                await loadSanPham();
            } else {
                alert("❌ Thêm sản phẩm thất bại!");
            }
        } catch (err) {
            console.error("Lỗi gửi sản phẩm:", err);
        }
    });

    async function loadDanhMuc() {
        try {
            const res = await fetch(API_DANHMUC);
            const data = await res.json();
            danhMucSelect.innerHTML = data.map(dm =>
                `<option value="${dm.tenDanhMuc}">${dm.tenDanhMuc}</option>`
            ).join("");
            categoryCount.innerText = data.length;
        } catch (err) {
            console.error("Lỗi load danh mục:", err);
        }
    }

    async function loadSanPham() {
        try {
            const res = await fetch(API_SANPHAM);
            const data = await res.json();

            productList.innerHTML = "";
            let total = 0, lowStock = 0;
            const danhMucSet = new Set();

            data.forEach(sp => {
                const sl = sp.chiTiet?.reduce((sum, mau) =>
                    sum + (mau.sizes?.reduce((s, sz) => s + sz.soLuong, 0) || 0), 0) || 0;

                total++;
                if (sl < 10) lowStock++;
                if (sp.danhMuc?.tenDanhMuc) danhMucSet.add(sp.danhMuc.tenDanhMuc);

                const row = document.createElement("tr");
                row.classList.add("border-b");
                row.innerHTML = `
                    <td class="p-2 border">${sp.maSP}</td>
                    <td class="p-2 border">${sp.ten}</td>
                    <td class="p-2 border">${sp.danhMuc?.tenDanhMuc || "—"}</td>
                    <td class="p-2 border">${sl}</td>
                    <td class="p-2 border">
                        <button class="text-red-600 hover:underline" onclick="deleteProduct('${sp.maSP}')">Xoá</button>
                    </td>
                `;
                productList.appendChild(row);
            });

            totalProducts.innerText = total;
            lowStockCount.innerText = lowStock;
            categoryCount.innerText = danhMucSet.size;
            document.getElementById("last-update").innerText = new Date().toLocaleDateString('vi-VN');
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        }
    }

    // Hàm xoá sản phẩm
    window.deleteProduct = async (maSP) => {
        if (!confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) return;
        try {
            const res = await fetch(`${API_SANPHAM}/${maSP}`, { method: "DELETE" });
            if (res.ok) {
                alert("✔️ Đã xoá sản phẩm");
                await loadSanPham();
            } else {
                alert("❌ Xoá thất bại");
            }
        } catch (err) {
            console.error("Lỗi xoá:", err);
        }
    };

    // 🚀 Gọi hàm khởi động
    loadSanPham();
    loadDanhMuc();
});
