<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giỏ Hàng</title>
    <link rel="stylesheet" href="css/GioHang.css">
    <!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>
    <script defer src="js/GioHang.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-white font-sans">
    <!-- Phần đầu trang -->
    <header class="bg-white shadow p-4 flex justify-between items-center flex-col md:flex-row">
        <a href="/" class="mb-2 md:mb-0">
            <img src="images/logo.png" alt="Logo ShoeShop" class="h-10 md:h-12 cursor-pointer">
        </a>
        <nav class="flex items-center space-x-4 flex-col md:flex-row w-full md:w-auto">
            <div class="flex space-x-4 mb-2 md:mb-0 w-full md:w-auto">
                <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Sản phẩm</a>
                <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Giới thiệu</a>
                <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Liên hệ</a>
            </div>
            <div class="flex items-center space-x-2 w-full md:w-auto">
                <input type="text" placeholder="Tìm kiếm..." class="border rounded px-2 py-1 w-full md:w-auto hover:border-black focus:outline-none focus:ring-2 focus:ring-black">
                <div class="flex space-x-2">
                    <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </div>
            </div>
        </nav>
    </header>

    <!-- Nội dung chính -->
    <main class="container">
        <h1>Giỏ Hàng</h1>
        <div class="cart-content">
            <!-- Danh sách sản phẩm -->
            <div class="cart-items">
                <!-- Sản phẩm 1 -->
                <div class="cart-item">
                    <div class="image-quantity">
                        <img src="images/sanpham1.png" alt="JA 2 EP" class="cart-item-image">
                        <div class="quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity-value">2</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-details">
                        <div class="price">8,218,000đ</div>
                        <h3>JA 2 EP</h3>
                        <p>Giày Bóng Rổ</p>
                        <p>Trắng/Game Royal/Đỏ University/Xanh University</p>
                        <p>Kích cỡ: 44.5</p>
                        <div class="favourite">
                            <svg class="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <p class="stock-warning">⏰ Còn ít hàng. Đặt ngay.</p>
                        </div>
                    </div>
                </div>
                <!-- Sản phẩm 2 -->
                <div class="cart-item">
                    <div class="image-quantity">
                        <img src="images/sanpham1.png" alt="JA 2 EP" class="cart-item-image">
                        <div class="quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity-value">2</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-details">
                        <div class="price">8,218,000đ</div>
                        <h3>JA 2 EP</h3>
                        <p>Giày Bóng Rổ</p>
                        <p>Trắng/Game Royal/Đỏ University/Xanh University</p>
                        <p>Kích cỡ: 44.5</p>
                        <div class="favourite">
                            <svg class="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <p class="stock-warning">⏰ Còn ít hàng. Đặt ngay.</p>
                        </div>
                    </div>
                </div>
                <!-- Sản phẩm 3 -->
                <div class="cart-item">
                    <div class="image-quantity">
                        <img src="images/sanpham1.png" alt="JA 2 EP" class="cart-item-image">
                        <div class="quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity-value">2</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-details">
                        <div class="price">8,218,000đ</div>
                        <h3>JA 2 EP</h3>
                        <p>Giày Bóng Rổ</p>
                        <p>Trắng/Game Royal/Đỏ University/Xanh University</p>
                        <p>Kích cỡ: 44.5</p>
                        <div class="favourite">
                            <svg class="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <p class="stock-warning">⏰ Còn ít hàng. Đặt ngay.</p>
                        </div>
                    </div>
                </div>
                <!-- Sản phẩm 4 -->
                <div class="cart-item">
                    <div class="image-quantity">
                        <img src="images/sanpham1.png" alt="JA 2 EP" class="cart-item-image">
                        <div class="quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity-value">2</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-details">
                        <div class="price">8,218,000đ</div>
                        <h3>JA 2 EP</h3>
                        <p>Giày Bóng Rổ</p>
                        <p>Trắng/Game Royal/Đỏ University/Xanh University</p>
                        <p>Kích cỡ: 44.5</p>
                        <div class="favourite">
                            <svg class="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <p class="stock-warning">⏰ Còn ít hàng. Đặt ngay.</p>
                        </div>
                    </div>
                </div>
                <div class="cart-item">
                    <div class="image-quantity">
                        <img src="images/sanpham1.png" alt="JA 2 EP" class="cart-item-image">
                        <div class="quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity-value">2</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-details">
                        <div class="price">8,218,000đ</div>
                        <h3>JA 2 EP</h3>
                        <p>Giày Bóng Rổ</p>
                        <p>Trắng/Game Royal/Đỏ University/Xanh University</p>
                        <p>Kích cỡ: 44.5</p>
                        <div class="favourite">
                            <svg class="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <p class="stock-warning">⏰ Còn ít hàng. Đặt ngay.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tóm tắt đơn hàng -->
            <div class="cart-summary">
                <h1>Tóm Tắt</h1>
                <p><span>Tổng tạm tính:</span> <span>8,218,000đ</span></p>
                <p><span>Ước tính giao hàng & xử lý:</span> <span>Miễn phí</span></p>
                <p><span>Tổng cộng:</span> <span>8,218,000đ</span></p>
                <button class="action-button checkout">Thanh Toán</button>
            </div>
        </div>

       <!-- Phần Bạn cũng có thể thích -->
<div id="like-slider-wrapper" class="mt-8 min-h-[320px] relative">
  <h2 class="text-lg font-bold mb-4">Bạn cũng có thể thích</h2>
  <div class="relative">
    <button onclick="scrollLikeSlider(-1)" class="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200">
      &#8592;
    </button>

    <div id="like-slider" class="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-10 py-4">
      <!-- Các sản phẩm -->
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <div class="min-w-[300px] flex-shrink-0 snap-start bg-white p-4 shadow-md rounded hover:scale-105 transition">
        <img src="images/KD18EP.png" class="w-full h-64 object-cover mb-2" alt="">
        <h3 class="font-semibold">Giày thể thao</h3>
        <p>3 màu</p>
        <p class="text-lg font-bold">400,000VND</p>
      </div>
      <!-- ... -->
    </div>

    <button onclick="scrollLikeSlider(1)" class="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200">
      &#8594;
    </button>
  </div>
</div>

        
    </main>

    <!-- Phần chân trang -->
    <footer class="bg-gray-100 text-gray-700 mt-16">
  <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
    <!-- Cột 1 -->
    <div>
      <h3 class="font-semibold text-gray-900 mb-3">GIÚP ĐỠ</h3>
      <ul class="space-y-2">
        <li><a href="#" class="hover:text-black">Tình trạng đơn hàng</a></li>
        <li><a href="#" class="hover:text-black">Vận chuyển & giao hàng</a></li>
        <li><a href="#" class="hover:text-black">Trả hàng</a></li>
        <li><a href="#" class="hover:text-black">Chính sách bảo hành</a></li>
      </ul>
    </div>
    <!-- Cột 2 -->
    <div>
      <h3 class="font-semibold text-gray-900 mb-3">VỀ CHÚNG TÔI</h3>
      <ul class="space-y-2">
        <li><a href="#" class="hover:text-black">Tin tức</a></li>
        <li><a href="#" class="hover:text-black">Tuyển dụng</a></li>
        <li><a href="#" class="hover:text-black">Hợp tác</a></li>
        <li><a href="#" class="hover:text-black">Cửa hàng</a></li>
      </ul>
    </div>
    <!-- Cột 3 -->
    <div>
      <h3 class="font-semibold text-gray-900 mb-3">TÀI KHOẢN</h3>
      <ul class="space-y-2">
        <li><a href="#" class="hover:text-black">Đăng nhập</a></li>
        <li><a href="#" class="hover:text-black">Đăng ký</a></li>
        <li><a href="#" class="hover:text-black">Danh sách yêu thích</a></li>
        <li><a href="#" class="hover:text-black">Theo dõi đơn hàng</a></li>
      </ul>
    </div>
    <!-- Cột 4 -->
    <div>
      <h3 class="font-semibold text-gray-900 mb-3">KẾT NỐI</h3>
      <div class="flex space-x-4 text-xl">
        <a href="#" class="text-gray-500 hover:text-black"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="text-gray-500 hover:text-black"><i class="fab fa-instagram"></i></a>
        <a href="#" class="text-gray-500 hover:text-black"><i class="fab fa-twitter"></i></a>
        <a href="#" class="text-gray-500 hover:text-black"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="border-t border-gray-300 text-center py-4 text-xs text-gray-500">
    &copy; 2025 KesnStore. Design by Dajtobiez.
  </div>
</footer>
</body>
</html>