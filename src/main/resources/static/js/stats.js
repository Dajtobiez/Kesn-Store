document.addEventListener('DOMContentLoaded', function () {
  const timeRange = document.getElementById('timeRange');
  const customRange = document.getElementById('customDateRange');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  const applyBtn = document.getElementById('applyFilter');

  let revenueChart;

  async function fetchOverview(from, to) {
    const res = await fetch(`/api/stats/overview?from=${from}&to=${to}`);
    const data = await res.json();

    document.getElementById('totalRevenue').textContent = formatCurrency(data.totalRevenue);
    document.getElementById('totalOrders').textContent = data.totalOrders;
    document.getElementById('avgOrderValue').textContent = formatCurrency(data.averageOrderValue);
  }

  async function fetchChartData(from, to) {
    const res = await fetch(`/api/stats/chart?from=${from}&to=${to}`);
    const data = await res.json();

    const labels = data.map(item => item.date);
    const revenues = data.map(item => item.revenue);

    if (revenueChart) {
      revenueChart.destroy();
    }

    const ctx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Doanh thu (VND)',
          data: revenues,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  async function fetchRecentTransactions() {
    const res = await fetch('/api/stats/recent-transactions');
    const data = await res.json();

    const tbody = document.getElementById('transaction-list');
    tbody.innerHTML = '';
    data.forEach(tran => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border px-2 py-1">${tran.maDonHang}</td>
        <td class="border px-2 py-1">${tran.tenKhachHang}</td>
        <td class="border px-2 py-1">${tran.ngay}</td>
        <td class="border px-2 py-1">${tran.tenSanPham}</td>
        <td class="border px-2 py-1">${formatCurrency(tran.tongTien)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  function getDateRange(option) {
    const today = new Date();
    let fromDate, toDate;

    switch (option) {
      case 'today':
        fromDate = toDate = today;
        break;
      case '7days':
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 6);
        toDate = today;
        break;
      case '30days':
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 29);
        toDate = today;
        break;
      case 'custom':
        fromDate = new Date(startDate.value);
        toDate = new Date(endDate.value);
        break;
    }

    const format = date => date.toISOString().split('T')[0];
    return {
      from: format(fromDate),
      to: format(toDate)
    };
  }

  function updateAll() {
    const { from, to } = getDateRange(timeRange.value);
    fetchOverview(from, to);
    fetchChartData(from, to);
    fetchRecentTransactions();
  }

  timeRange.addEventListener('change', () => {
    if (timeRange.value === 'custom') {
      customRange.classList.remove('hidden');
    } else {
      customRange.classList.add('hidden');
    }
  });

  applyBtn.addEventListener('click', () => {
    updateAll();
  });

  updateAll(); // Khởi động ban đầu
});
