package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ChiTietDonHang")
public class ChiTietDonHang {

    @EmbeddedId
    private ChiTietDonHangId id = new ChiTietDonHangId();

    @ManyToOne
    @MapsId("maDH")
    @JoinColumn(name = "MaDH")
    private DonHang donHang;

    @ManyToOne
    @MapsId("maSP")
    @JoinColumn(name = "MaSP")
    private SanPham sanPham;

    @ManyToOne
    @MapsId("maMau")
    @JoinColumn(name = "MaMau")
    private MauSac mauSac;

    @ManyToOne
    @MapsId("maSize")
    @JoinColumn(name = "MaSize")
    private Size size;

    @Column(name = "SoLuong")
    private int soLuong;
    
    @Column(name = "DonGia")
    private Double donGia;

    @Column(name = "TrangThai")
    private String trangThai;

    // === Getter/Setter ===

    public ChiTietDonHangId getId() {
        return id;
    }

    public void setId(ChiTietDonHangId id) {
        this.id = id;
    }

    public DonHang getDonHang() {
        return donHang;
    }

    public void setDonHang(DonHang donHang) {
        this.donHang = donHang;
    }

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

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

	public Double getDonGia() {
		return donGia;
	}

	public void setDonGia(Double donGia) {
		this.donGia = donGia;
	}
}
