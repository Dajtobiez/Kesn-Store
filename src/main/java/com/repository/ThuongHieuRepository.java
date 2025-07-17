package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.ThuongHieu;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String> {
	Optional<ThuongHieu> findByTenThuongHieu(String tenThuongHieu);
}

