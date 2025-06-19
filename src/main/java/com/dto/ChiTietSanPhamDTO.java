package poly.edu.dto;

import java.math.BigDecimal;

public class ChiTietSanPhamDTO {
	private String maSP;
	private String maMau;
	private String maSize;
	private BigDecimal gia;
	private int soLuong;
	
	public String getMaSP() {
		return maSP;
	}
	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}
	public String getMaMau() {
		return maMau;
	}
	public void setMaMau(String maMau) {
		this.maMau = maMau;
	}
	public String getMaSize() {
		return maSize;
	}
	public void setMaSize(String maSize) {
		this.maSize = maSize;
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
