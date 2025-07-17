package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DanhMuc {

    @Id
    private String maDanhMuc;
    private String tenDanhMuc;

    public String getMaDanhMuc() {
        return maDanhMuc;
    }

    public void setMaDanhMuc(String maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    public String getTenDanhMuc() {
        return tenDanhMuc;
    }

    public void setTenDanhMuc(String tenDanhMuc) {
        this.tenDanhMuc = tenDanhMuc;
    }
}
