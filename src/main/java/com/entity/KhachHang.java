package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "KhachHang")
public class KhachHang {
    @Id
    @Column(name = "MaKH", length = 10)
    private String maKH;

    @OneToOne
    @JoinColumn(name = "MaTK", unique = true)
    private TaiKhoan taiKhoan;

    @Column(name = "Ten", length = 50, nullable = false)
    private String ten;

    @Column(name = "DiaChi", length = 100)
    private String diaChi;

    @Column(name = "SoDienThoai", length = 15)
    private String soDienThoai;

    @Column(name = "Email", length = 50)
    private String email;

    public String getMaKH() {
        return maKH;
    }

    public void setMaKH(String maKH) {
        this.maKH = maKH;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
