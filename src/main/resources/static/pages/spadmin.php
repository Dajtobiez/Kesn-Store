<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quản lý hỗ trợ - Kesn Store</title>
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

    /* Admin Content */
    .admin-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .admin-header h1 {
      font-size: 32px;
      font-weight: 900;
      text-transform: uppercase;
      color: #000000;
    }

    .filter-search {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .filter-search select,
    .filter-search input {
      padding: 10px;
      border: 1px solid #000000;
      border-radius: 25px;
      font-size: 14px;
      background-color: #FFFFFF;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .filter-search select:focus,
    .filter-search input:focus {
      border-color: #333333;
    }

    /* Support Table */
    .support-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f5f5f5;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .support-table th,
    .support-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #000000;
    }

    .support-table th {
      background-color: #000000;
      color: #FFFFFF;
      font-weight: 700;
      text-transform: uppercase;
    }

    .support-table td {
      font-size: 14px;
      color: #000000;
    }

    .support-table tr:hover {
      background-color: #e5e5e5;
    }

    .status {
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
    }

    .status.pending {
      background-color: #ffcc00;
      color: #000000;
    }

    .status.resolved {
      background-color: #00cc00;
      color: #FFFFFF;
    }

    .status.in-progress {
      background-color: #3399ff;
      color: #FFFFFF;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
    }

    .action-buttons button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .edit-btn {
      background-color: #000000;
      color: #FFFFFF;
    }

    .edit-btn:hover {
      background-color: #333333;
    }

    .delete-btn {
      background-color: #dc3545;
      color: #FFFFFF;
    }

    .delete-btn:hover {
      background-color: #b02a37;
    }

    /* Modal */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #FFFFFF;
      width: 600px;
      padding: 20px;
      border-radius: 10px;
      position: relative;
    }

    .modal-content h2 {
      font-size: 24px;
      font-weight: 900;
      color: #000000;
      margin-bottom: 20px;
    }

    .modal-content form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .modal-content input,
    .modal-content select,
    .modal-content textarea {
      padding: 10px;
      border: 1px solid #000000;
      border-radius: 25px;
      font-size: 14px;
      background-color: #FFFFFF;
      outline: none;
    }

    .modal-content textarea {
      border-radius: 10px;
      resize: vertical;
      min-height: 100px;
    }

    .modal-content button {
      padding: 10px;
      border: none;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .save-btn {
      background-color: #000000;
      color: #FFFFFF;
    }

    .save-btn:hover {
      background-color: #333333;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      color: #000000;
      cursor: pointer;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .admin-content {
        padding: 20px;
      }

      .admin-header h1 {
        font-size: 24px;
      }

      .support-table th,
      .support-table td {
        padding: 10px;
        font-size: 12px;
      }

      .modal-content {
        width: 90%;
      }
    }

    @media (max-width: 768px) {
      .filter-search {
        flex-direction: column;
        align-items: flex-start;
      }

      .support-table {
        font-size: 12px;
      }

      .support-table th,
      .support-table td {
        padding: 8px;
      }

      .action-buttons {
        flex-direction: column;
        gap: 5px;
      }

      .modal-content {
        width: 95%;
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="admin-content">
    <div class="admin-header">
      <h1>Quản lý yêu cầu hỗ trợ</h1>
      <div class="filter-search">
        <select>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Đang chờ</option>
          <option value="in-progress">Đang xử lý</option>
          <option value="resolved">Đã giải quyết</option>
        </select>
        <input type="text" placeholder="Tìm kiếm theo tên hoặc email">
      </div>
    </div>

    <table class="support-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Loại yêu cầu</th>
          <th>Mô tả</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#001</td>
          <td>ala</td>
          <td>ala@gmail.com</td>
          <td>Vấn đề về đơn hàng</td>
          <td>Đơn hàng bị giao sai sản phẩm</td>
          <td><span class="status pending">Đang chờ</span></td>
          <td class="action-buttons">
            <button class="edit-btn">Chỉnh sửa</button>
            <button class="delete-btn">Xóa</button>
          </td>
        </tr>
        <tr>
          <td>#002</td>
          <td>alu</td>
          <td>alu@gmail.com</td>
          <td>Vấn đề về sản phẩm</td>
          <td>Giày bị lỗi đường may</td>
          <td><span class="status in-progress">Đang xử lý</span></td>
          <td class="action-buttons">
            <button class="edit-btn">Chỉnh sửa</button>
            <button class="delete-btn">Xóa</button>
          </td>
        </tr>
        <tr>
          <td>#003</td>
          <td>ale</td>
          <td>ale@gmail.com</td>
          <td>Khác</td>
          <td>Hỏi về chính sách bảo hành</td>
          <td><span class="status resolved">Đã giải quyết</span></td>
          <td class="action-buttons">
            <button class="edit-btn">Chỉnh sửa</button>
            <button class="delete-btn">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal" id="editModal">
    <div class="modal-content">
      <span class="close-btn">×</span>
      <h2>Chỉnh sửa yêu cầu</h2>
      <form>
        <input type="text" placeholder="Họ và tên" value="ale">
        <input type="email" placeholder="Email" value="ale@gmail.com">
        <select>
          <option value="order">Vấn đề về đơn hàng</option>
          <option value="product">Vấn đề về sản phẩm</option>
          <option value="other" selected>Khác</option>
        </select>
        <textarea placeholder="Mô tả vấn đề">Đơn hàng bị giao sai sản phẩm</textarea>
        <select>
          <option value="pending">Đang chờ</option>
          <option value="in-progress">Đang xử lý</option>
          <option value="resolved">Đã giải quyết</option>
        </select>
        <button class="save-btn">Lưu thay đổi</button>
      </form>
    </div>
  </div>

  <script>
    // Modal Functionality
    const editButtons = document.querySelectorAll('.edit-btn');
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close-btn');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Delete Confirmation
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
          button.closest('tr').remove();
        }
      });
    });

    // Filter and Search (Placeholder)
    document.querySelector('.filter-search select').addEventListener('change', (e) => {
      console.log('Filter by status:', e.target.value);
      // Add filter logic here
    });

    document.querySelector('.filter-search input').addEventListener('input', (e) => {
      console.log('Search:', e.target.value);
      // Add search logic here
    });
  </script>
</body>
</html>