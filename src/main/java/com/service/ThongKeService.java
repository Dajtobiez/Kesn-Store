package com.service;

import com.dto.*;
import com.entity.*;
import com.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class ThongKeService {

    @Autowired
    private DonHangRepository donHangRepo;

    public OverviewDTO getOverview(LocalDate from, LocalDate to) {
        BigDecimal total = donHangRepo.getTotalRevenue(from, to);
        long count = donHangRepo.countOrders(from, to);
        BigDecimal avg = count > 0 ? total.divide(BigDecimal.valueOf(count), 2, BigDecimal.ROUND_HALF_UP) : BigDecimal.ZERO;

        OverviewDTO dto = new OverviewDTO();
        dto.setTotalRevenue(total != null ? total : BigDecimal.ZERO);
        dto.setTotalOrders(count);
        dto.setAverageOrderValue(avg);
        return dto;
    }

    public List<ChartDataDTO> getChart(LocalDate from, LocalDate to) {
        List<Object[]> rawData = donHangRepo.getRevenueChart(from, to);
        List<ChartDataDTO> result = new ArrayList<>();
        for (Object[] row : rawData) {
            ChartDataDTO dto = new ChartDataDTO();
            dto.setDate(row[0].toString());
            dto.setRevenue((BigDecimal) row[1]);
            result.add(dto);
        }
        return result;
    }

    public List<TransactionDTO> getRecentTransactions() {
        List<DonHang> list = donHangRepo.findTop5ByOrderByNgayDatHangDesc();
        List<TransactionDTO> result = new ArrayList<>();

        for (DonHang dh : list) {
            TransactionDTO dto = new TransactionDTO();
            dto.setMaDonHang(dh.getMaDH());
            dto.setTenKhachHang(dh.getKhachHang().getTen());
            dto.setNgay(dh.getNgayDatHang().toString());
            if (dh.getChiTietDonHang() != null && !dh.getChiTietDonHang().isEmpty()) {
                dto.setTenSanPham(dh.getChiTietDonHang().get(0).getSanPham().getTen());
            } else {
                dto.setTenSanPham("N/A");
            }
            dto.setTongTien(dh.getTongTien());
            result.add(dto);
        }
        return result;
    }
}
