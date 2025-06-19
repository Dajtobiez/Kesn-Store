package com.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@IdClass(ChiTietSanPhamId.class)
public class ChiTietSanPham {

    @Id
    @ManyToOne
    @JoinColumn(name = "MaSP")
    private SanPham sanPham;

    @Id
    @ManyToOne
    @JoinColumn(name = "MaMau")
    private MauSac mauSac;

    @Id
    @ManyToOne
    @JoinColumn(name = "MaSize")
    private Size size;

    @Column(nullable = false)
    private BigDecimal gia;

    @Column(nullable = false)
    private int soLuong;

    // Getter & Setter

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public MauSac getMauSac() {
        return mauSac;
    }

    public void setMauSac(MauSac mauSac) {
        this.mauSac = mauSac;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }
}
