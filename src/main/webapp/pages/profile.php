<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hồ sơ khách hàng - Kesn Store</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
 <link rel="stylesheet" href="../css/profile.css">
</head>
<body>
  <div class="header">
    <div class="logo">
      <img src="https://via.placeholder.com/60x60?text=KESN" alt="Kesn Store Logo">
    </div>
    <div class="nav">
      <a href="trangchu.html">Trang chủ</a>
      <a>Sản phẩm mới</a>
      <a>Giảm giá</a>
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-bar" placeholder="Tìm kiếm sản phẩm">
      </div>
      <div class="icons">
        <i class="fas fa-heart"></i>
        <i class="fas fa-shopping-bag"></i>
        <i class="fas fa-user"></i>
      </div>
    </div>
  </div>

  <div class="profile-container">
    <div class="profile-content">
      <div class="profile-info">
        <div class="profile-avatar">
          <img src="https://via.placeholder.com/150x150?text=Avatar" alt="Ảnh đại diện" id="profileImage">
          <form>
            <input type="file" id="avatarUpload" accept="image/*" style="display: none;">
            <button type="button" class="edit-avatar-btn" onclick="document.getElementById('avatarUpload').click()">
              <i class="fas fa-camera"></i> Thay đổi ảnh
            </button>
          </form>
        </div>
        <div class="profile-details" id="profileDetails">
          <h2 id="profileName">Nguyễn Văn A</h2>
          <div class="detail-item">
            <i class="fas fa-birthday-cake"></i>
            <span id="profileDob">Ngày sinh: 01/01/1995</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-envelope"></i>
            <span id="profileEmail">Email: nguyen.van.a@kesnstore.com</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-heart"></i>
            <span id="profileHobbies">Sở thích: Giày thể thao, chạy bộ, bóng rổ</span>
          </div>
          <button class="edit-profile-btn" onclick="showEditForm()">Chỉnh sửa hồ sơ</button>
        </div>

        <!-- Form chỉnh sửa thông tin -->
        <form class="edit-form" id="editForm" onsubmit="saveProfile(event)">
          <h3>Chỉnh sửa thông tin</h3>
          <div class="form-group">
            <label for="editName">Họ và tên</label>
            <input type="text" id="editName" name="name" value="Nguyễn Văn A" required>
          </div>
          <div class="form-group">
            <label for="editDob">Ngày sinh</label>
            <input type="date" id="editDob" name="dob" value="1995-01-01" required>
          </div>
          <div class="form-group">
            <label for="editEmail">Email</label>
            <input type="email" id="editEmail" name="email" value="nguyen.van.a@kesnstore.com" required>
          </div>
          <div class="form-group">
            <label for="editHobbies">Sở thích</label>
            <input type="text" id="editHobbies" name="hobbies" value="Giày thể thao, chạy bộ, bóng rổ">
          </div>
          <div class="form-buttons">
            <button type="submit">Lưu</button>
            <button type="button" onclick="cancelEdit()">Hủy</button>
          </div>
        </form>
      </div>

      <div class="tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="vouchers">Voucher hiện có</button>
          <button class="tab-btn" data-tab="usedVouchers">Voucher đã dùng</button>
          <button class="tab-btn" data-tab="wishlist">Danh mục yêu thích</button>
          <button class="tab-btn" data-tab="purchaseHistory">Lịch sử mua hàng</button>
        </div>

        <div class="tab-content active" id="vouchers">
          <h2>Voucher hiện có</h2>
          <div class="voucher-list">
            <div class="order-item">
              <div class="order-details">
                <h3>Mã: Kesn10</h3>
                <p>Giảm giá: 10%</p>
                <p>Hết hạn: 31/12/2025</p>
                <a href="#" class="use-voucher">Sử dụng</a>
              </div>
            </div>
            <div class="order-item">
              <div class="order-details">
                <h3>Mã: Kesn20</h3>
                <p>Giảm giá: 20%</p>
                <p>Hết hạn: 15/01/2026</p>
                <a href="#" class="use-voucher">Sử dụng</a>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="usedVouchers">
          <h2>Voucher đã dùng</h2>
          <div class="voucher-list">
            <div class="order-item">
              <div class="order-details">
                <h3>Mã: Kesn15</h3>
                <p>Giảm giá: 15%</p>
                <p>Ngày sử dụng: 10/06/2025</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="wishlist">
          <h2>Danh mục yêu thích</h2>
          <div class="wishlist-list">
            <div class="order-item" data-item-id="1">
              <img src="https://via.placeholder.com/120x120?text=Sneaker+XYZ" alt="Giày Sneaker XYZ">
              <div class="order-details">
                <h3>Giày Sneaker XYZ</h3>
                <p>Giá: 1.500.000 VNĐ</p>
                <a href="#" class="remove-item">Xóa</a>
              </div>
            </div>
            <div class="order-item" data-item-id="2">
              <img src="https://via.placeholder.com/120x120?text=Sneaker+ABC" alt="Giày Thể Thao ABC">
              <div class="order-details">
                <h3>Giày Thể Thao ABC</h3>
                <p>Giá: 2.000.000 VNĐ</p>
                <a href="#" class="remove-item">Xóa</a>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="purchaseHistory">
          <h2>Lịch sử mua hàng</h2>
          <div class="purchase-history">
            <div class="purchase-item" data-item-id="1">
              <img src="https://via.placeholder.com/120x120?text=Sneaker+XYZ" alt="Giày Sneaker XYZ">
              <div class="purchase-details">
                <h3>Giày Sneaker XYZ</h3>
                <p>Giá: 1.500.000 VNĐ</p>
                <p>Ngày mua: 10/06/2025</p>
                <a href="#" class="buy-again">Mua lại</a>
              </div>
            </div>
            <div class="purchase-item" data-item-id="2">
              <img src="https://via.placeholder.com/120x120?text=Sneaker+ABC" alt="Giày Thể Thao ABC">
              <div class="purchase-details">
                <h3>Giày Thể Thao ABC</h3>
                <p>Giá: 2.000.000 VNĐ</p>
                <p>Ngày mua: 05/06/2025</p>
                <a href="#" class="buy-again">Mua lại</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Về Kesn Store</h3>
        <p>Kesn Store – Nơi định hình phong cách của bạn với những đôi giày độc đáo và chất lượng.</p>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Liên hệ</h3>
        <div class="contact-info">
          <div class="contact-item"><i class="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận 1, TP.HCM</div>
          <div class="contact-item"><i class="fas fa-phone"></i> (+84) 123 456 789</div>
          <div class="contact-item"><i class="fas fa-envelope"></i> info@kesnstore.com</div>
          <div class="contact-item"><i class="fas fa-globe"></i> www.kesnstore.com</div>
        </div>
      </div>
      <div class="footer-section">
        <h3>Đăng ký nhận tin</h3>
        <div class="newsletter">
          <p>Nhận thông tin mới nhất về sản phẩm và ưu đãi.</p>
          <input type="email" placeholder="Nhập email của bạn...">
          <button>Đăng ký ngay</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Kesn Store | Designed by Kesn Team</p>
    </div>
  </div>

  <script>
    // Handle avatar upload
    document.getElementById('avatarUpload').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Show edit form
    function showEditForm() {
      document.getElementById('editForm').classList.add('active');
      document.getElementById('profileDetails').style.display = 'none';
    }

    // Cancel edit
    function cancelEdit() {
      document.getElementById('editForm').classList.remove('active');
      document.getElementById('profileDetails').style.display = 'block';
    }

    // Save profile
    function saveProfile(event) {
      event.preventDefault();
      const name = document.getElementById('editName').value;
      const dob = document.getElementById('editDob').value;
      const email = document.getElementById('editEmail').value;
      const hobbies = document.getElementById('editHobbies').value;

      // Update profile details
      document.getElementById('profileName').textContent = name;
      document.getElementById('profileDob').textContent = `Ngày sinh: ${new Date(dob).toLocaleDateString('vi-VN')}`;
      document.getElementById('profileEmail').textContent = `Email: ${email}`;
      document.getElementById('profileHobbies').textContent = `Sở thích: ${hobbies || 'Không có'}`;

      // Hide form and show profile details
      document.getElementById('editForm').classList.remove('active');
      document.getElementById('profileDetails').style.display = 'block';
    }

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Show selected tab content
        document.getElementById(tabId).classList.add('active');
      });
    });

    // Handle remove item from wishlist
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const item = button.closest('.order-item');
        const itemName = item.querySelector('h3').textContent;
        if (confirm(`Bạn có chắc muốn xóa "${itemName}" khỏi danh mục yêu thích?`)) {
          item.remove();
        }
      });
    });

    // Handle buy again
    document.querySelectorAll('.buy-again').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const item = button.closest('.purchase-item');
        const itemName = item.querySelector('h3').textContent;
        alert(`Bạn đã chọn mua lại "${itemName}". Đang chuyển hướng đến trang sản phẩm...`);
        // Replace alert with actual redirect logic, e.g.:
        // window.location.href = `/product/${item.getAttribute('data-item-id')}`;
      });
    });

    // Handle use voucher
    document.querySelectorAll('.use-voucher').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const voucher = button.closest('.order-item');
        const voucherCode = voucher.querySelector('h3').textContent;
        alert(`Đã áp dụng voucher "${voucherCode}". Đang chuyển hướng đến trang thanh toán...`);
        // Replace alert with actual voucher application logic
      });
    });

    // Initialize first tab as active
    document.getElementById('vouchers').classList.add('active');
  </script>
</body>
</html>