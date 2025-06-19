package poly.edu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "MauSac")
public class MauSac {
    @Id
    @Column(name = "MaMau", length = 10)
    private String maMau;

    @Column(name = "TenMau", length = 50, nullable = false)
    private String tenMau;

    // Getters and Setters
    public String getMaMau() {
        return maMau;
    }

    public void setMaMau(String maMau) {
        this.maMau = maMau;
    }

    public String getTenMau() {
        return tenMau;
    }

    public void setTenMau(String tenMau) {
        this.tenMau = tenMau;
    }
}