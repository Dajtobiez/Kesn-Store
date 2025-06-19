package poly.edu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ThuongHieu")
public class ThuongHieu {
    @Id
    @Column(name = "MaTH", length = 10)
    private String maTH;

    @Column(name = "TenThuongHieu", length = 50, nullable = false)
    private String tenThuongHieu;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;

    // Getters and Setters
    public String getMaTH() {
        return maTH;
    }

    public void setMaTH(String maTH) {
        this.maTH = maTH;
    }

    public String getTenThuongHieu() {
        return tenThuongHieu;
    }

    public void setTenThuongHieu(String tenThuongHieu) {
        this.tenThuongHieu = tenThuongHieu;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
}
