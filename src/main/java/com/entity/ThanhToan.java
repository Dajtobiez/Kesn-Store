package com.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "ThanhToan")
public class ThanhToan {

    @Id
    @Column(name = "MaTT", length = 10)
    private String maTT;

    @ManyToOne
    @JoinColumn(name = "MaHD")
    private HoaDon hoaDon;

    @Column(name = "PhuongThucThanhToan", nullable = false, length = 50)
    private String phuongThucThanhToan;

    @Column(name = "SoTien", nullable = false, precision = 10, scale = 2)
    private BigDecimal soTien;

    @Column(name = "NgayThanhToan", nullable = false)
    private LocalDate ngayThanhToan;

	public String getMaTT() {
		return maTT;
	}

	public void setMaTT(String maTT) {
		this.maTT = maTT;
	}

	public HoaDon getHoaDon() {
		return hoaDon;
	}

	public void setHoaDon(HoaDon hoaDon) {
		this.hoaDon = hoaDon;
	}

	public String getPhuongThucThanhToan() {
		return phuongThucThanhToan;
	}

	public void setPhuongThucThanhToan(String phuongThucThanhToan) {
		this.phuongThucThanhToan = phuongThucThanhToan;
	}

	public BigDecimal getSoTien() {
		return soTien;
	}

	public void setSoTien(BigDecimal soTien) {
		this.soTien = soTien;
	}

	public LocalDate getNgayThanhToan() {
		return ngayThanhToan;
	}

	public void setNgayThanhToan(LocalDate ngayThanhToan) {
		this.ngayThanhToan = ngayThanhToan;
	}
}



