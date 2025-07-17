package com.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "VanChuyen")
public class VanChuyen {

    @Id
    @Column(name = "MaVC", length = 10)
    private String maVC;

    @ManyToOne
    @JoinColumn(name = "MaHD")
    private HoaDon hoaDon;

    @Column(name = "PhuongThucVanChuyen", length = 50, nullable = false)
    private String phuongThucVanChuyen;

    @Column(name = "TrangThaiGiaoHang", length = 50, nullable = false)
    private String trangThaiGiaoHang;

    @Column(name = "NgayGiaoDuKien", nullable = false)
    private LocalDate ngayGiaoDuKien;

    // Getters và Setters

    public String getMaVC() {
        return maVC;
    }

    public void setMaVC(String maVC) {
        this.maVC = maVC;
    }

    public HoaDon getHoaDon() {
        return hoaDon;
    }

    public void setHoaDon(HoaDon hoaDon) {
        this.hoaDon = hoaDon;
    }

    public String getPhuongThucVanChuyen() {
        return phuongThucVanChuyen;
    }

    public void setPhuongThucVanChuyen(String phuongThucVanChuyen) {
        this.phuongThucVanChuyen = phuongThucVanChuyen;
    }

    public String getTrangThaiGiaoHang() {
        return trangThaiGiaoHang;
    }

    public void setTrangThaiGiaoHang(String trangThaiGiaoHang) {
        this.trangThaiGiaoHang = trangThaiGiaoHang;
    }

    public LocalDate getNgayGiaoDuKien() {
        return ngayGiaoDuKien;
    }

    public void setNgayGiaoDuKien(LocalDate ngayGiaoDuKien) {
        this.ngayGiaoDuKien = ngayGiaoDuKien;
    }
}

