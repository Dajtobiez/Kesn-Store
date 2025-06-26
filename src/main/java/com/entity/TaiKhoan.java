package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TaiKhoan")
public class TaiKhoan {
    @Id
    @Column(length = 10)
    private String maTK;

    @Column(nullable = false, length = 50)
    private String tenDangNhap;

    @Column(nullable = false, length = 50)
    private String matKhau;

    @Column(nullable = false, length = 20)
    private String vaiTro;

    @OneToOne(mappedBy = "taiKhoan", cascade = CascadeType.ALL)
    private KhachHang khachHang;

    public String getMaTK() {
        return maTK;
    }

    public void setMaTK(String maTK) {
        this.maTK = maTK;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    public KhachHang getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }
}