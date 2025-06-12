document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu mẫu cho bảng giao dịch
    const transactions = [
        {
            MaDonHang: 'DH001',
            KhachHang: 'Nguyễn Văn A',
            Ngay: '06/06/2025',
            SanPham: 'KD18 EIBL EP',
            SoTien: '4,000,000 VND'
        },
        {
            MaDonHang: 'DH002',
            KhachHang: 'Trần Thị B',
            Ngay: '05/06/2025',
            SanPham: 'Giày thể thao',
            SoTien: '400,000 VND'
        },
        {
            MaDonHang: 'DH003',
            KhachHang: 'Lê Văn C',
            Ngay: '04/06/2025',
            SanPham: 'KD18 EIBL EP',
            SoTien: '4,000,000 VND'
        }
    ];

    // Initialize Chart.js
    const ctx = document.getElementById('revenueChart')?.getContext('2d');
    if (!ctx) {
        console.error('Không tìm thấy canvas revenueChart');
        return;
    }
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06'],
            datasets: [{
                label: 'Doanh thu (VND)',
                data: [200000000, 250000000, 300000000, 280000000, 320000000, 350000000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000) + 'M';
                        }
                    }
                }
            }
        }
    });

    // Render giao dịch
    const transactionList = document.getElementById('transaction-list');
    function renderTransactions(trans) {
        if (!transactionList) {
            console.error('Không tìm thấy transaction-list');
            return;
        }
        transactionList.innerHTML = '';
        trans.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3">${transaction.MaDonHang}</td>
                <td class="p-3">${transaction.KhachHang}</td>
                <td class="p-3">${transaction.Ngay}</td>
                <td class="p-3">${transaction.SanPham}</td>
                <td class="p-3">${transaction.SoTien}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    // Handle time range filter
    const timeRange = document.getElementById('timeRange');
    const customDateRange = document.getElementById('customDateRange');
    const applyFilter = document.getElementById('applyFilter');

    if (timeRange) {
        timeRange.addEventListener('change', () => {
            if (timeRange.value === 'custom') {
                customDateRange?.classList.remove('hidden');
            } else {
                customDateRange?.classList.add('hidden');
                updateChart(timeRange.value);
            }
        });
    }

    if (applyFilter) {
        applyFilter.addEventListener('click', () => {
            if (timeRange.value === 'custom') {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                if (startDate && endDate) {
                    updateChart('custom', startDate, endDate);
                } else {
                    alert('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
                }
            }
        });
    }

    function updateChart(range, startDate, endDate) {
        let labels = [];
        let data = [];

        if (range === 'today') {
            labels = ['Hôm nay'];
            data = [350000000];
        } else if (range === '7days') {
            labels = ['30/05', '31/05', '01/06', '02/06', '03/06', '04/06', '05/06'];
            data = [200000000, 220000000, 250000000, 270000000, 300000000, 320000000, 350000000];
        } else if (range === '30days') {
            labels = ['07/05', '14/05', '21/05', '28/05', '04/06'];
            data = [1000000000, 1100000000, 1200000000, 1250000000, 1300000000];
        } else if (range === 'custom' && startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            labels = [];
            data = [];
            for (let i = 0; i <= days; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                labels.push(date.toLocaleDateString('vi-VN'));
                data.push(Math.floor(Math.random() * 100000000) + 200000000);
            }
        }

        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = data;
        revenueChart.update();
    }

    // Render dữ liệu mẫu ban đầu
    renderTransactions(transactions);
});