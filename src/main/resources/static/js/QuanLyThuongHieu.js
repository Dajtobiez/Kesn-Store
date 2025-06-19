document.addEventListener('DOMContentLoaded', function () {
    const brandList = document.getElementById('brand-list');
    const brandModal = document.getElementById('brand-modal');
    const addBrand = document.getElementById('add-brand');
    const cancelModal = document.getElementById('cancel-modal');
    const brandForm = document.getElementById('brand-form');
    const modalTitle = document.getElementById('modal-title');
    const searchBrand = document.getElementById('search-brand');

    let brands = [
        { MaTH: 'TH001', TenThuongHieu: 'Nike', MoTa: 'Thương hiệu giày thể thao hàng đầu thế giới.' },
        { MaTH: 'TH002', TenThuongHieu: 'Adidas', MoTa: 'Thương hiệu giày và thời trang thể thao nổi tiếng.' },
        { MaTH: 'TH003', TenThuongHieu: 'Converse', MoTa: 'Thương hiệu giày casual phong cách.' }
    ];

    function renderBrands(filteredBrands) {
        brandList.innerHTML = '';
        filteredBrands.forEach(brand => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${brand.MaTH}</td>
                <td class="p-3">${brand.TenThuongHieu}</td>
                <td class="p-3">${brand.MoTa}</td>
                <td class="p-3">
                    <button class="action-button edit" data-math="${brand.MaTH}">Sửa</button>
                    <button class="action-button delete" data-math="${brand.MaTH}">Xóa</button>
                </td>
            `;
            brandList.appendChild(row);
        });
    }

    function openBrandModal(brand = null) {
        if (brand) {
            modalTitle.textContent = `Sửa Thương hiệu ${brand.MaTH}`;
            document.getElementById('math').value = brand.MaTH;
            document.getElementById('math').disabled = true;
            document.getElementById('tenthuonghieu').value = brand.TenThuongHieu;
            document.getElementById('mota').value = brand.MoTa;
        } else {
            modalTitle.textContent = 'Thêm Thương hiệu';
            document.getElementById('math').value = '';
            document.getElementById('math').disabled = false;
            document.getElementById('tenthuonghieu').value = '';
            document.getElementById('mota').value = '';
        }
        brandModal.classList.remove('hidden');
    }

    function filterBrands() {
        const searchTerm = searchBrand.value.toLowerCase();
        let filteredBrands = brands;

        if (searchTerm) {
            filteredBrands = filteredBrands.filter(brand => 
                brand.MaTH.toLowerCase().includes(searchTerm) || 
                brand.TenThuongHieu.toLowerCase().includes(searchTerm)
            );
        }

        renderBrands(filteredBrands);
    }

    addBrand.addEventListener('click', () => openBrandModal());

    brandList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit')) {
            const math = e.target.getAttribute('data-math');
            const brand = brands.find(b => b.MaTH === math);
            if (brand) openBrandModal(brand);
        } else if (e.target.classList.contains('delete')) {
            const math = e.target.getAttribute('data-math');
            brands = brands.filter(b => b.MaTH !== math);
            filterBrands();
        }
    });

    cancelModal.addEventListener('click', () => {
        brandModal.classList.add('hidden');
    });

    brandForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const brand = {
            MaTH: document.getElementById('math').value,
            TenThuongHieu: document.getElementById('tenthuonghieu').value,
            MoTa: document.getElementById('mota').value
        };

        const existingBrand = brands.find(b => b.MaTH === brand.MaTH);
        if (existingBrand) {
            Object.assign(existingBrand, brand);
        } else {
            brands.push(brand);
        }

        filterBrands();
        brandModal.classList.add('hidden');
    });

    searchBrand.addEventListener('input', filterBrands);

    renderBrands(brands);
});