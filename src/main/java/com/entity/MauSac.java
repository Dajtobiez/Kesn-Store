package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MauSac {

    @Id
    private String maMau;

    private String tenMau;

    // Getter & Setter
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
