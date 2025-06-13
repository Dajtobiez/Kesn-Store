<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hỗ trợ - Kesn Store</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      background-color: #FFFFFF;
      color: #000000;
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* Support Banner */
    .support-banner {
      position: relative;
      width: 100%;
      height: 400px;
      background-color: #000000;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .support-banner h1 {
      font-size: 48px;
      font-weight: 900;
      text-transform: uppercase;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out forwards;
    }

    .support-banner p {
      font-size: 20px;
      font-weight: 300;
      max-width: 600px;
      animation: fadeIn 1s ease-in-out 0.3s forwards;
    }

    /* Animation */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Support Content */
    .support-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .support-section {
      margin-bottom: 60px;
    }

    .support-section h2 {
      font-size: 32px;
      font-weight: 900;
      text-transform: uppercase;
      color: #000000;
      margin-bottom: 20px;
      text-align: center;
    }

    /* Contact Info */
    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      text-align: center;
    }

    .contact-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 10px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .contact-item i {
      font-size: 24px;
      color: #000000;
      margin-bottom: 10px;
    }

    .contact-item p {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }

    /* FAQ Section */
    .faq {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      border-bottom: 1px solid #000000;
      margin-bottom: 10px;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      cursor: pointer;
    }

    .faq-question h3 {
      font-size: 18px;
      font-weight: 700;
      color: #000000;
    }

    .faq-question i {
      font-size: 16px;
      color: #000000;
      transition: transform 0.3s ease;
    }

    .faq-question.active i {
      transform: rotate(180deg);
    }

    .faq-answer {
      display: none;
      padding: 0 0 15px;
      font-size: 16px;
      font-weight: 300;
      color: #000000;
    }

    .faq-answer.active {
      display: block;
    }

    /* Support Form */
    .support-form {
      max-width: 600px;
      margin: 0 auto;
      background-color: #f5f5f5;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .support-form form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .support-form input,
    .support-form select,
    .support-form textarea {
      padding: 12px;
      border: 1px solid #000000;
      border-radius: 25px;
      font-size: 16px;
      background-color: #FFFFFF;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .support-form input:focus,
    .support-form select:focus,
    .support-form textarea:focus {
      border-color: #333333;
    }

    .support-form textarea {
      border-radius: 10px;
      resize: vertical;
      min-height: 150px;
    }

    .support-form button {
      padding: 12px;
      background-color: #000000;
      color: #FFFFFF;
      border: none;
      border-radius: 25px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .support-form button:hover {
      background-color: #333333;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .support-banner {
        height: 300px;
      }

      .support-banner h1 {
        font-size: 36px;
      }

      .support-banner p {
        font-size: 16px;
      }

      .support-content {
        padding: 20px;
      }

      .contact-info {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .support-banner {
        height: 200px;
      }

      .support-banner h1 {
        font-size: 28px;
      }

      .support-banner p {
        font-size: 14px;
      }

      .support-section h2 {
        font-size: 24px;
      }

      .support-form {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="support-banner">
    <div>
      <h1>Hỗ trợ khách hàng</h1>
      <p>Chúng tôi luôn sẵn sàng giúp bạn với bất kỳ câu hỏi hoặc vấn đề nào!</p>
    </div>
  </div>

  <div class="support-content">
    <div class="support-section">
      <h2>Liên hệ với chúng tôi</h2>
      <div class="contact-info">
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <p>Quận 12, TP. Hồ Chí Minh</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <p>(+84) 123 456 789</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <p>kesnstore@gmail.com</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-globe"></i>
          <p>www.kesnstore.com</p>
        </div>
      </div>
    </div>

    <div class="support-section">
      <h2>Câu hỏi thường gặp</h2>
      <div class="faq">
        <div class="faq-item">
          <div class="faq-question">
            <h3>Làm thế nào để đổi trả sản phẩm?</h3>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="faq-answer">
            <p>Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua. Vui lòng đảm bảo sản phẩm còn nguyên vẹn và liên hệ với chúng tôi qua email hoặc số điện thoại để được hướng dẫn chi tiết.</p>
          </div>
        </div>
        <div class="faq-item">
          <div class="faq-question">
            <h3>Thời gian giao hàng là bao lâu?</h3>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="faq-answer">
            <p>Thời gian giao hàng thường từ 3-7 ngày làm việc, tùy thuộc vào khu vực. Bạn sẽ nhận được thông tin theo dõi đơn hàng qua email.</p>
          </div>
        </div>
        <div class="faq-item">
          <div class="faq-question">
            <h3>Tôi có thể hủy đơn hàng không?</h3>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="faq-answer">
            <p>Bạn có thể hủy đơn hàng trước khi nó được vận chuyển. Vui lòng liên hệ ngay với chúng tôi để được hỗ trợ.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="support-section">
      <h2>Gửi yêu cầu hỗ trợ</h2>
      <div class="support-form">
        <form>
          <input type="text" placeholder="Họ và tên" required>
          <input type="email" placeholder="Email" required>
          <select required>
            <option value="" disabled selected>Chọn loại yêu cầu</option>
            <option value="order">Vấn đề về đơn hàng</option>
            <option value="product">Vấn đề về sản phẩm</option>
            <option value="other">Khác</option>
          </select>
          <textarea placeholder="Mô tả vấn đề của bạn..." required></textarea>
          <button type="submit">Gửi yêu cầu</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const icon = item.querySelector('i');
        const isActive = answer.classList.contains('active');

        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

        // Toggle current answer
        if (!isActive) {
          answer.classList.add('active');
          item.classList.add('active');
          icon.style.transform = 'rotate(180deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  </script>
</body>
</html>