package com.entity;

import java.io.Serializable;
import jakarta.persistence.*;

@Embeddable
public class ChiTietDonHangId implements Serializable {

    private String maDH;
    private String maSP;
    private String maMau;
    private String maSize;

    // Getters, Setters, hashCode, equals

    public String getMaDH() {
        return maDH;
    }

    public void setMaDH(String maDH) {
        this.maDH = maDH;
    }

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
        if (!(o instanceof ChiTietDonHangId)) return false;
        ChiTietDonHangId that = (ChiTietDonHangId) o;
        return maDH.equals(that.maDH) && maSP.equals(that.maSP)
                && maMau.equals(that.maMau) && maSize.equals(that.maSize);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(maDH, maSP, maMau, maSize);
    }
}
