package com.dto;

import java.util.List;

public class SanPhamDTO {
	  private String maSP;
	    private String ten;
	    private DanhMucDTO danhMuc;
	    private ThuongHieuDTO thuongHieu;
	    private String anh;
	    private List<MauDTO> chiTiet;
	    
		public String getMaSP() {
			return maSP;
		}
		public void setMaSP(String maSP) {
			this.maSP = maSP;
		}
		public String getTen() {
			return ten;
		}
		public void setTen(String ten) {
			this.ten = ten;
		}
		public DanhMucDTO getDanhMuc() {
			return danhMuc;
		}
		public void setDanhMuc(DanhMucDTO danhMuc) {
			this.danhMuc = danhMuc;
		}
		public ThuongHieuDTO getThuongHieu() {
			return thuongHieu;
		}
		public void setThuongHieu(ThuongHieuDTO thuongHieu) {
			this.thuongHieu = thuongHieu;
		}
		public List<MauDTO> getChiTiet() {
			return chiTiet;
		}
		public void setChiTiet(List<MauDTO> chiTiet) {
			this.chiTiet = chiTiet;
		}
		public String getAnh() {
			return anh;
		}
		public void setAnh(String anh) {
			this.anh = anh;
		}
		
}
