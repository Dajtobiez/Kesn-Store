package com.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class HoaDonDTO {

	private String maHD;
	private String maKH;
	private String tenKhachHang;

	private BigDecimal tongTien;
	private String trangThaiThanhToan;
	private String phuongThucThanhToan;
	private String trangThaiGiaoHang;
	private String phuongThucVanChuyen;
	private LocalDate ngayGiaoDuKien;

	public HoaDonDTO(String maHD, String maKH, String tenKhachHang, BigDecimal tongTien, String phuongThucThanhToan,
			String trangThaiGiaoHang, String phuongThucVanChuyen, LocalDate ngayGiaoDuKien) {
		this.maHD = maHD;
		this.maKH = maKH;
		this.tenKhachHang = tenKhachHang;
		this.tongTien = tongTien;
		this.phuongThucThanhToan = phuongThucThanhToan;
		this.trangThaiGiaoHang = trangThaiGiaoHang;
		this.phuongThucVanChuyen = phuongThucVanChuyen;
		this.ngayGiaoDuKien = ngayGiaoDuKien;
	}

	public String getMaHD() {
		return maHD;
	}

	public void setMaHD(String maHD) {
		this.maHD = maHD;
	}

	public String getMaKH() {
		return maKH;
	}

	public void setMaKH(String maKH) {
		this.maKH = maKH;
	}

	public String getTenKhachHang() {
		return tenKhachHang;
	}

	public void setTenKhachHang(String tenKhachHang) {
		this.tenKhachHang = tenKhachHang;
	}

	public BigDecimal getTongTien() {
		return tongTien;
	}

	public void setTongTien(BigDecimal tongTien) {
		this.tongTien = tongTien;
	}

	public String getTrangThaiThanhToan() {
		return trangThaiThanhToan;
	}

	public void setTrangThaiThanhToan(String trangThaiThanhToan) {
		this.trangThaiThanhToan = trangThaiThanhToan;
	}

	public String getPhuongThucThanhToan() {
		return phuongThucThanhToan;
	}

	public void setPhuongThucThanhToan(String phuongThucThanhToan) {
		this.phuongThucThanhToan = phuongThucThanhToan;
	}

	public String getTrangThaiGiaoHang() {
		return trangThaiGiaoHang;
	}

	public void setTrangThaiGiaoHang(String trangThaiGiaoHang) {
		this.trangThaiGiaoHang = trangThaiGiaoHang;
	}

	public String getPhuongThucVanChuyen() {
		return phuongThucVanChuyen;
	}

	public void setPhuongThucVanChuyen(String phuongThucVanChuyen) {
		this.phuongThucVanChuyen = phuongThucVanChuyen;
	}

	public LocalDate getNgayGiaoDuKien() {
		return ngayGiaoDuKien;
	}

	public void setNgayGiaoDuKien(LocalDate ngayGiaoDuKien) {
		this.ngayGiaoDuKien = ngayGiaoDuKien;
	}
}
