<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Đánh Giá Sau Khi Mua Hàng</title>
  
  <!-- Tailwind & Font Awesome -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

  <style>
    .star-rating span {
      font-size: 1.5rem;
      cursor: pointer;
      color: #d1d5db; /* Tailwind gray-300 */
    }
    .star-rating .selected,
    .star-rating .hovered {
      color: #facc15; /* Tailwind yellow-400 */
    }
    .card-title {
      transition: all 0.3s ease;
    }
    .card-title:hover {
      color: #2563eb; /* Tailwind blue-600 */
      transform: scale(1.05);
    }
    /* Hiệu ứng cho form */
    #reviewForm input,
    #reviewForm textarea {
      transition: all 0.3s ease;
    }
    #reviewForm input:focus,
    #reviewForm textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  </style>
</head>
<body class="bg-white font-sans">

  <!-- Navbar (kept from original review page) -->
  <header class="bg-white shadow p-4 flex justify-between items-center flex-col md:flex-row">
    <a href="/" class="mb-2 md:mb-0">
      <img src="images/logo.png" alt="Logo ShoeShop" class="h-10 md:h-12 cursor-pointer" />
    </a>
    <nav class="flex items-center space-x-4 flex-col md:flex-row w-full md:w-auto">
      <div class="flex space-x-4 mb-2 md:mb-0 w-full md:w-auto">
        <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Sản phẩm</a>
        <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Giới thiệu</a>
        <a href="#" class="text-gray-600 hover:text-black w-full md:w-auto text-center">Liên hệ</a>
      </div>
      <div class="flex items-center space-x-2 w-full md:w-auto">
        <input type="text" placeholder="Tìm kiếm..." class="border rounded px-2 py-1 w-full md:w-auto hover:border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <div class="flex space-x-2">
          <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
      </div>
    </nav>
  </header>

  <!-- Nội dung đánh giá -->
  <div class="container mx-auto p-6 md:p-8">
    <div class="bg-white p-6 shadow rounded-lg">
      <h3 class="text-2xl font-bold mb-4">Đánh giá từ khách hàng đã mua</h3>
      <p class="text-gray-600 text-sm mb-6">Chỉ khách hàng đã mua sản phẩm mới có thể gửi đánh giá.</p>
      
      <!-- Tổng quan đánh giá -->
      <div class="flex items-center mb-6">
        <h1 class="text-4xl font-bold mr-4">4.5</h1>
        <div>
          <div class="flex star-rating">
            <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
          <span class="ml-2 text-sm text-gray-600">124 đánh giá</span>
        </div>
      </div>

      <!-- Biểu đồ đánh giá -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-3">Phân tích đánh giá</h4>
        <div class="space-y-2">
          <div class="flex items-center">
            <span class="w-16 text-sm">5 sao</span>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-yellow-400 rounded" style="width: 60%;"></div>
            </div>
            <span class="ml-2 text-sm">60%</span>
          </div>
          <div class="flex items-center">
            <span class="w-16 text-sm">4 sao</span>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-yellow-400 rounded" style="width: 25%;"></div>
            </div>
            <span class="ml-2 text-sm">25%</span>
          </div>
          <div class="flex items-center">
            <span class="w-16 text-sm">3 sao</span>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-yellow-400 rounded" style="width: 10%;"></div>
            </div>
            <span class="ml-2 text-sm">10%</span>
          </div>
          <div class="flex items-center">
            <span class="w-16 text-sm">2 sao</span>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-yellow-400 rounded" style="width: 3%;"></div>
            </div>
            <span class="ml-2 text-sm">3%</span>
          </div>
          <div class="flex items-center">
            <span class="w-16 text-sm">1 sao</span>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-yellow-400 rounded" style="width: 2%;"></div>
            </div>
            <span class="ml-2 text-sm">2%</span>
          </div>
        </div>
      </div>

      <!-- Danh sách đánh giá -->
      <h4 class="text-lg font-semibold mb-3">Nhận xét từ khách hàng đã mua</h4>
      <div class="space-y-4">
        <div class="bg-white p-4 shadow-md rounded">
          <div class="flex items-center mb-2">
            <h6 class="card-title font-semibold text-sm">Nguyễn Văn A <span class="text-gray-500 text-xs ml-2">· 2 ngày trước</span></h6>
            <div class="ml-2 flex">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
          </div>
          <p class="text-gray-600 text-sm">Sản phẩm chất lượng, thoải mái, đóng gói cẩn thận.</p>
          <img src="https://via.placeholder.com/200" class="w-32 h-32 object-cover mt-2 rounded border" alt="Ảnh sản phẩm">
          <div class="mt-2 flex space-x-2">
            <button class="text-sm text-blue-600 hover:bg-blue-100 px-3 py-1 rounded">👍 Thích</button>
            <button class="text-sm text-red-600 hover:bg-red-100 px-3 py-1 rounded">⚠️ Báo vi phạm</button>
          </div>
        </div>
      </div>

      <!-- Form đánh giá (thiết kế mới) -->
      <h4 class="text-lg font-semibold mt-6 mb-3">Chia sẻ đánh giá của bạn</h4>
<form id="reviewForm" class="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
  <p class="text-sm text-gray-600 mb-5">Hãy chia sẻ trải nghiệm của bạn với sản phẩm này để giúp những khách hàng khác!</p>

  <!-- Star rating -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">Đánh giá sao</label>
    <div class="star-rating flex space-x-2 text-2xl text-gray-300 cursor-pointer" id="starRating">
      <span data-value="1" class="transition duration-200">★</span>
      <span data-value="2" class="transition duration-200">★</span>
      <span data-value="3" class="transition duration-200">★</span>
      <span data-value="4" class="transition duration-200">★</span>
      <span data-value="5" class="transition duration-200">★</span>
    </div>
    <input type="hidden" id="selectedRating" name="rating" value="0">
  </div>

  <!-- Comment -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">Bình luận</label>
    <textarea
      class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-400 transition"
      name="comment" rows="5" placeholder="Viết cảm nhận của bạn về sản phẩm..." required></textarea>
  </div>

  <!-- Upload -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">Tải ảnh sản phẩm (tùy chọn)</label>
    <label class="flex items-center gap-3 border border-dashed border-gray-300 px-4 py-3 rounded-lg cursor-pointer hover:border-blue-500 transition">
      <i class="bi bi-upload text-blue-600 text-xl"></i>
      <span class="text-sm text-gray-600">Chọn ảnh từ thiết bị</span>
      <input type="file" class="hidden" name="images" multiple>
    </label>
  </div>

  <!-- Submit -->
  <div class="flex justify-end">
    <button type="submit"
      class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
      Gửi đánh giá
    </button>
  </div>
</form>

    </div>
  </div>

  <!-- Footer (from product detail page) -->
  <footer class="bg-gray-100 text-gray-700 mt-16">
    <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">GIÚP ĐỠ</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-black">Tình trạng đơn hàng</a></li>
          <li><a href="#" class="hover:text-black">Vận chuyển & giao hàng</a></li>
          <li><a href="#" class="hover:text-black">Trả hàng</a></li>
          <li><a href="#" class="hover:text-black">Chính sách bảo hành</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">VỀ CHÚNG TÔI</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-black">Tin tức</a></li>
          <li><a href="#" class="hover:text-black">Tuyển dụng</a></li>
          <li><a href="#" class="hover:text-black">Hợp tác</a></li>
          <li><a href="#" class="hover:text-black">Cửa hàng</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">TÀI KHOẢN</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-black">Đăng nhập</a></li>
          <li><a href="#" class="hover:text-black">Đăng ký</a></li>
          <li><a href="#" class="hover:text-black">Danh sách yêu thích</a></li>
          <li><a href="#" class="hover:text-black">Theo dõi đơn hàng</a></li>
        </ul>
      </div>
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
      © 2025 KesnStore. Design by Dajtobiez.
    </div>
  </footer>

  <!-- Script xử lý -->
  <script></script>
</body>
</html>