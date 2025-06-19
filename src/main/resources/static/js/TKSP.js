
        function updateSearchBanner() {
            const searchQuery = "basketball"; // Giả lập từ khóa tìm kiếm, thay bằng input thực tế nếu cần
            const titleElement = document.querySelector('aside h2 span');
            const bannerElement = document.querySelector('.carousel');

            if (searchQuery.toLowerCase() === "basketball") {
                titleElement.textContent = "Tìm kiếm của bạn: basketball (64)";
                bannerElement.innerHTML = '<div class="carousel-slide"><img src="images/bannertest1.png" alt="Basketball"><img src="images/bannertest1.png" alt="Basketball 2"><img src="images/bannertest1.png" alt="Basketball 3"></div>';
            } else if (searchQuery.toLowerCase() === "volleyball") {
                titleElement.textContent = "Tìm kiếm của bạn: volleyball (45)";
                bannerElement.innerHTML = '<div class="carousel-slide"><img src="https://via.placeholder.com/400x300?text=Volleyball" alt="Volleyball"><img src="https://via.placeholder.com/400x300?text=Volleyball+2" alt="Volleyball 2"><img src="https://via.placeholder.com/400x300?text=Volleyball+3" alt="Volleyball 3"></div>';
            } else {
                titleElement.textContent = "Tìm kiếm của bạn: không xác định";
                bannerElement.innerHTML = '<div class="carousel-slide"><img src="https://via.placeholder.com/400x300?text=Default" alt="Default"></div>';
            }
        }
        window.onload = updateSearchBanner;

        // Thêm JavaScript để xử lý các dropdown
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownToggles = document.querySelectorAll('[id^="dropdown-toggle-"]');
            dropdownToggles.forEach(toggle => {
                const dropdownMenu = document.querySelector(`#${toggle.id}-menu`);
                toggle.addEventListener('click', function() {
                    dropdownMenu.classList.toggle('hidden');
                });
            });
        });
