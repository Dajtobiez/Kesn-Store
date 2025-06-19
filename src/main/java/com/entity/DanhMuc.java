package poly.edu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "DanhMuc")
public class DanhMuc {
    @Id
    @Column(name = "MaDM", length = 10)
    private String maDM;

    @Column(name = "TenDanhMuc", length = 50, nullable = false)
    private String tenDanhMuc;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;

    // Getters and Setters
    public String getMaDM() {
        return maDM;
    }

    public void setMaDM(String maDM) {
        this.maDM = maDM;
    }

    public String getTenDanhMuc() {
        return tenDanhMuc;
    }

    public void setTenDanhMuc(String tenDanhMuc) {
        this.tenDanhMuc = tenDanhMuc;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
}
