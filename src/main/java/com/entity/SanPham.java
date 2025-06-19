package poly.edu.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "SanPham")
public class SanPham {
	@Id
    @Column(name = "MaSP", length = 10)
    private String maSP;

    @ManyToOne
    @JoinColumn(name = "MaDM", nullable = true)
    private DanhMuc danhMuc;

    @ManyToOne
    @JoinColumn(name = "MaTH", nullable = true)
    private ThuongHieu thuongHieu;

    @Column(name = "Ten", length = 100, nullable = false)
    private String ten;

    @OneToMany(mappedBy = "sanPham")
    private List<ChiTietSanPham> chiTietSanPhamList;

    // Getters and Setters
    public String getMaSP() {
        return maSP;
    }

    public void setMaSP(String maSP) {
        this.maSP = maSP;
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

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public List<ChiTietSanPham> getChiTietSanPhamList() {
        return chiTietSanPhamList;
    }

    public void setChiTietSanPhamList(List<ChiTietSanPham> chiTietSanPhamList) {
        this.chiTietSanPhamList = chiTietSanPhamList;
    }
}
