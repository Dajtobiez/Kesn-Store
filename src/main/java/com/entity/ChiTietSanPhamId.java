package poly.edu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class ChiTietSanPhamId implements Serializable {
    @Column(name = "MaSP", length = 10)
    private String maSP;

    @Column(name = "MaMau", length = 10)
    private String maMau;

    @Column(name = "MaSize", length = 10)
    private String maSize;

    // Getters and Setters
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChiTietSanPhamId that = (ChiTietSanPhamId) o;
        return maSP.equals(that.maSP) && maMau.equals(that.maMau) && maSize.equals(that.maSize);
    }

    @Override
    public int hashCode() {
        return 31 * (maSP.hashCode() + maMau.hashCode() + maSize.hashCode());
    }
}
