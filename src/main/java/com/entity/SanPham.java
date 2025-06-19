package com.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "SanPham")
public class SanPham {

    @Id
    @Column(name = "MaSP", length = 10)
    private String maSP;

    @Column(name = "Ten", length = 100, nullable = false)
    private String ten;
    
   // @Lob
   // @Column(name = "Anh")
    //private String anh; // Nếu lưu 1 ảnh hoặc JSON string chứa nhiều ảnh

    @ManyToOne
    @JoinColumn(name = "MaDM")
    private DanhMuc danhMuc;

    @ManyToOne
    @JoinColumn(name = "MaTH")
    private ThuongHieu thuongHieu;
    
    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietSanPham> chiTiet = new ArrayList<>();

    // Getters and setters
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

    public DanhMuc getDanhMuc() {
        return danhMuc;
    }

    public void setDanhMuc(DanhMuc danhMuc) {
        this.danhMuc = danhMuc;
    }

    public ThuongHieu getThuongHieu() {
        return thuongHieu;
    }

    public void setThuongHieu(ThuongHieu thuongHieu) {
        this.thuongHieu = thuongHieu;
    }

	public List<ChiTietSanPham> getChiTiet() {
		return chiTiet;
	}

	public void setChiTiet(List<ChiTietSanPham> chiTiet) {
		this.chiTiet = chiTiet;
	}

	//public String getAnh() {
	//	return anh;
	//}

	//public void setAnh(String anh) {
	//	this.anh = anh;
	//}
    
    
}
