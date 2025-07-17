package com.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DonHangDTO {

    private String maDH;
    private String maKH;
    private String soHoaDon;
    private LocalDate ngayDatHang;
    private BigDecimal tongTien;
    private BigDecimal thueVAT;
    private String phuongThucVanChuyen;
    private String tenKH;
    private String trangThai;
    private List<ChiTietDonHangDTO> chiTietSanPham;
    // Getters and setters

    public String getMaDH() {
        return maDH;
    }

    public void setMaDH(String maDH) {
        this.maDH = maDH;
    }

    public String getMaKH() {
        return maKH;
    }

    public void setMaKH(String maKH) {
        this.maKH = maKH;
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

	public String getTenKH() {
		return tenKH;
	}

	public void setTenKH(String tenKH) {
		this.tenKH = tenKH;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<ChiTietDonHangDTO> getChiTietSanPham() {
		return chiTietSanPham;
	}

	public void setChiTietSanPham(List<ChiTietDonHangDTO> chiTietSanPham) {
		this.chiTietSanPham = chiTietSanPham;
	}
}
