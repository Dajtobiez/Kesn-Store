document.addEventListener('DOMContentLoaded', function () {
    const reviewList = document.getElementById('review-list');
    const reviewModal = document.getElementById('review-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const reviewForm = document.getElementById('review-form');
    const modalTitle = document.getElementById('modal-title');
    const searchReview = document.getElementById('search-review');

    // Giả lập người dùng (admin hoặc khách hàng)
    const currentUser = { role: 'admin', MaKH: 'KH001' }; // Thay đổi role và MaKH để test

    let reviews = [
        {
            MaDG: 'DG001',
            MaKH: 'KH001',
            MaSP: 'SP001',
            TenSP: 'Giày Sneaker Nike',
            NhanXet: 'Chất lượng tốt, thoải mái khi mang.',
            Diem: 5,
            NgayDanhGia: '2025-06-01'
        },
        {
            MaDG: 'DG002',
            MaKH: 'KH002',
            MaSP: 'SP002',
            TenSP: 'Giày Adidas Running',
            NhanXet: 'Giá hơi cao nhưng đáng tiền.',
            Diem: 4,
            NgayDanhGia: '2025-06-02'
        }
    ];

    function renderReviews(filteredReviews) {
        reviewList.innerHTML = '';
        filteredReviews.forEach(review => {
            const row = document.createElement('tr');
            const isOwnReview = currentUser.role !== 'admin' && review.MaKH === currentUser.MaKH;
            const actionButtons = currentUser.role === 'admin' ? `
                <button class="action-button delete" data-madg="${review.MaDG}">Xóa</button>
            ` : (isOwnReview ? `
                <button class="action-button edit" data-madg="${review.MaDG}">Sửa</button>
                <button class="action-button delete" data-madg="${review.MaDG}">Xóa</button>
            ` : '');
            row.innerHTML = `
                <td class="p-3">${review.MaDG}</td>
                <td class="p-3">${review.MaKH}</td>
                <td class="p-3">${review.TenSP}</td>
                <td class="p-3">${review.Diem}</td>
                <td class="p-3">${review.NhanXet}</td>
                <td class="p-3">${review.NgayDanhGia}</td>
                <td class="p-3">${actionButtons}</td>
            `;
            reviewList.appendChild(row);
        });
    }

    function openReviewModal(review) {
        modalTitle.textContent = `Sửa Đánh giá ${review.MaDG}`;
        document.getElementById('madg').value = review.MaDG;
        document.getElementById('makh').value = review.MaKH;
        document.getElementById('masp').value = review.MaSP;
        document.getElementById('tensp').value = review.TenSP;
        document.getElementById('diem').value = review.Diem;
        document.getElementById('nhanxet').value = review.NhanXet;
        reviewModal.classList.remove('hidden');
    }

    function filterReviews() {
        const searchTerm = searchReview.value.toLowerCase();
        let filteredReviews = currentUser.role === 'admin' ? reviews : reviews.filter(r => r.MaKH === currentUser.MaKH);

        if (searchTerm) {
            filteredReviews = filteredReviews.filter(r => 
                r.MaDG.toLowerCase().includes(searchTerm) || 
                r.MaKH.toLowerCase().includes(searchTerm) || 
                r.TenSP.toLowerCase().includes(searchTerm)
            );
        }

        renderReviews(filteredReviews);
    }

    reviewList.addEventListener('click', function (e) {
        const madg = e.target.getAttribute('data-madg');
        const review = reviews.find(r => r.MaDG === madg);
        if (!review) return;

        if (e.target.classList.contains('edit') && review.MaKH === currentUser.MaKH) {
            openReviewModal(review);
        } else if (e.target.classList.contains('delete') && 
                   (currentUser.role === 'admin' || review.MaKH === currentUser.MaKH)) {
            reviews = reviews.filter(r => r.MaDG !== madg);
            filterReviews();
        }
    });

    cancelModal.addEventListener('click', () => {
        reviewModal.classList.add('hidden');
    });

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const madg = document.getElementById('madg').value;
        const review = reviews.find(r => r.MaDG === madg);
        if (review) {
            review.Diem = parseInt(document.getElementById('diem').value);
            review.NhanXet = document.getElementById('nhanxet').value;
            filterReviews();
            reviewModal.classList.add('hidden');
        }
    });

    searchReview.addEventListener('input', filterReviews);

    renderReviews(currentUser.role === 'admin' ? reviews : reviews.filter(r => r.MaKH === currentUser.MaKH));
});