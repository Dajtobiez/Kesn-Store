package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.ChiTietSanPham;
import com.entity.ChiTietSanPhamId;

public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, ChiTietSanPhamId> {
	
}
