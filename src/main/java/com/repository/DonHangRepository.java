package com.repository;

import com.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface DonHangRepository extends JpaRepository<DonHang, String> {

    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE d.ngayDatHang BETWEEN :from AND :to")
    java.math.BigDecimal getTotalRevenue(LocalDate from, LocalDate to);

    @Query("SELECT COUNT(d) FROM DonHang d WHERE d.ngayDatHang BETWEEN :from AND :to")
    long countOrders(LocalDate from, LocalDate to);

    @Query("SELECT FUNCTION('DATE', d.ngayDatHang) AS ngay, SUM(d.tongTien) " +
           "FROM DonHang d WHERE d.ngayDatHang BETWEEN :from AND :to " +
           "GROUP BY FUNCTION('DATE', d.ngayDatHang) ORDER BY ngay")
    List<Object[]> getRevenueChart(LocalDate from, LocalDate to);

    List<DonHang> findTop5ByOrderByNgayDatHangDesc();
}
