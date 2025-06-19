package com.entity;

import java.io.Serializable;
import java.util.Objects;

public class ChiTietSanPhamId implements Serializable {

    private String sanPham;
    private String mauSac;
    private String size;

    public ChiTietSanPhamId() {}

    public ChiTietSanPhamId(String sanPham, String mauSac, String size) {
        this.sanPham = sanPham;
        this.mauSac = mauSac;
        this.size = size;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ChiTietSanPhamId)) return false;
        ChiTietSanPhamId that = (ChiTietSanPhamId) o;
        return Objects.equals(sanPham, that.sanPham) &&
               Objects.equals(mauSac, that.mauSac) &&
               Objects.equals(size, that.size);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sanPham, mauSac, size);
    }
}
