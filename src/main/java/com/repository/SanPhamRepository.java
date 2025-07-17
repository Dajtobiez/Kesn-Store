package com.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entity.SanPham;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
	
	Optional<SanPham> findFirstByOrderByMaSPDesc();
	
	Optional<SanPham> findByTen(String ten);

}
