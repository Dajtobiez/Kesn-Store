package poly.edu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TaiKhoan")
public class TaiKhoan {
    @Id
    @Column(name = "MaTK", length = 10)
    private String maTK;

    @Column(name = "TenDangNhap", length = 50, nullable = false)
    private String tenDangNhap;

    @Column(name = "MatKhau", length = 50, nullable = false)
    private String matKhau;

    @Column(name = "VaiTro", length = 20, nullable = false)
    private String vaiTro;

    // Getters and Setters
    public String getMaTK() {
        return maTK;
    }

    public void setMaTK(String maTK) {
        this.maTK = maTK;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }
}
