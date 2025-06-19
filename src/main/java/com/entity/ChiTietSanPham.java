package poly.edu.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "ChiTietSanPham")
public class ChiTietSanPham {
    @EmbeddedId
    private ChiTietSanPhamId id;

    @ManyToOne
    @MapsId("maSP")
    @JoinColumn(name = "MaSP", nullable = false)
    private SanPham sanPham;

    @ManyToOne
    @MapsId("maMau")
    @JoinColumn(name = "MaMau", nullable = false)
    private MauSac mauSac;

    @ManyToOne
    @MapsId("maSize")
    @JoinColumn(name = "MaSize", nullable = false)
    private Size size;

    @Column(name = "Gia", nullable = false, precision = 10, scale = 2)
    private BigDecimal gia;

    @Column(name = "SoLuong", nullable = false)
    private int soLuong;

    // Getters and Setters
    public ChiTietSanPhamId getId() {
        return id;
    }

    public void setId(ChiTietSanPhamId id) {
        this.id = id;
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