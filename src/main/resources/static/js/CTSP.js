// CTSP.js - Đã bổ sung hiệu ứng slider 5 ảnh và tự động chuyển sau 5 giây
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý chọn kích cỡ
    const sizeButtons = document.querySelectorAll('.size-button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Xử lý thay đổi hình ảnh chính khi nhấp vào hình ảnh phụ
    const thumbnails = document.querySelectorAll('.thumbnail-scroll img');
    const mainImage = document.querySelector('.main-image');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });

    // Xử lý toggle dropdown đánh giá
    const reviewsToggle = document.querySelector('#reviews-toggle');
    const reviewsContent = document.querySelector('#reviews-content');
    reviewsToggle.addEventListener('click', function() {
        reviewsContent.classList.toggle('open');
        const isOpen = reviewsContent.classList.contains('open');
        reviewsToggle.querySelector('svg').style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    // Xử lý chuyển hình bằng nút Next/Previous cho hình ảnh chính
    const prevButton = document.querySelector('#prev-image');
    const nextButton = document.querySelector('#next-image');
    let currentImageIndex = 0;

    const imageUrls = Array.from(thumbnails).map(thumb => thumb.src);

    prevButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
        mainImage.src = imageUrls[currentImageIndex];
    });

    nextButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        mainImage.src = imageUrls[currentImageIndex];
    });

    // Phần "Bạn có thể quan tâm" - slider 5 ảnh
    const relatedSlides = document.querySelectorAll(".related-item");
    const relatedButtons = document.querySelectorAll(".related-buttons .related-button");

    let relatedCurrent = 0;

    relatedButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            i === 0 ? gotoRelatedPrev() : gotoRelatedNext();
        });
    });

    function gotoRelatedPrev() {
        relatedCurrent = (relatedCurrent - 1 + relatedSlides.length) % relatedSlides.length;
        gotoRelatedNum(relatedCurrent);
    }

    function gotoRelatedNext() {
        relatedCurrent = (relatedCurrent + 1) % relatedSlides.length;
        gotoRelatedNum(relatedCurrent);
    }

    function gotoRelatedNum(number) {
        relatedCurrent = number;
        const relatedPrev = (relatedCurrent - 1 + relatedSlides.length) % relatedSlides.length;
        const relatedNext = (relatedCurrent + 1) % relatedSlides.length;
        const prev2 = (relatedCurrent - 2 + relatedSlides.length) % relatedSlides.length;
        const next2 = (relatedCurrent + 2) % relatedSlides.length;

        relatedSlides.forEach(slide => {
            slide.classList.remove("active", "prev", "next", "prev2", "next2");
        });

        relatedSlides[relatedCurrent].classList.add("active");
        relatedSlides[relatedPrev].classList.add("prev");
        relatedSlides[relatedNext].classList.add("next");
        relatedSlides[prev2].classList.add("prev2");
        relatedSlides[next2].classList.add("next2");
    }

    // Khởi tạo slider ban đầu
    gotoRelatedNum(relatedCurrent);

    // Tự động chuyển slider mỗi 5 giây
    setInterval(() => {
        gotoRelatedNext();
    }, 5000);
});

function scrollLikeSlider(direction) {
    const container = document.getElementById("like-slider");
    const scrollAmount = 300; // chỉnh khoảng lướt
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}


