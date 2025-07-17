package com.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "DonHang")
public class DonHang {

    @Id
    @Column(name = "MaDH", length = 10)
    private String maDH;

    @ManyToOne
    @JoinColumn(name = "MaKH")
    private KhachHang khachHang;

    @Column(name = "SoHoaDon", length = 20)
    private String soHoaDon;

    @Column(name = "NgayDatHang", nullable = false)
    private LocalDate ngayDatHang;

    @Column(name = "TongTien", precision = 10, scale = 2, nullable = false)
    private BigDecimal tongTien;

    @Column(name = "ThueVAT", precision = 5, scale = 2)
    private BigDecimal thueVAT;

    @Column(name = "PhuongThucVanChuyen", length = 50)
    private String phuongThucVanChuyen;
    
    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChiTietDonHang> chiTietDonHang;
    
    // Getters and setters

    public String getMaDH() {
        return maDH;
    }

    public void setMaDH(String maDH) {
        this.maDH = maDH;
    }

    public KhachHang getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }

    public String getSoHoaDon() {
        return soHoaDon;
    }

    public void setSoHoaDon(String soHoaDon) {
        this.soHoaDon = soHoaDon;
    }

    public LocalDate getNgayDatHang() {
        return ngayDatHang;
    }

    public void setNgayDatHang(LocalDate ngayDatHang) {
        this.ngayDatHang = ngayDatHang;
    }

    public BigDecimal getTongTien() {
        return tongTien;
    }

    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }

    public BigDecimal getThueVAT() {
        return thueVAT;
    }

    public void setThueVAT(BigDecimal thueVAT) {
        this.thueVAT = thueVAT;
    }

    public String getPhuongThucVanChuyen() {
        return phuongThucVanChuyen;
    }

    public void setPhuongThucVanChuyen(String phuongThucVanChuyen) {
        this.phuongThucVanChuyen = phuongThucVanChuyen;
    }

	public List<ChiTietDonHang> getChiTietDonHang() {
		return chiTietDonHang;
	}

	public void setChiTietDonHang(List<ChiTietDonHang> chiTietDonHang) {
		this.chiTietDonHang = chiTietDonHang;
	}

}
