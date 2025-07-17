package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "HoaDon")
public class HoaDon {

    @Id
    @Column(name = "MaHD", length = 10)
    private String maHD;

    @ManyToOne
    @JoinColumn(name = "MaKH")
    private KhachHang khachHang;

    // Getters and setters

    public String getMaHD() {
        return maHD;
    }

    public void setMaHD(String maHD) {
        this.maHD = maHD;
    }

    public KhachHang getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }
}
