package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.ThuongHieu;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String> {
	ThuongHieu findByTenThuongHieu(String tenThuongHieu);
}

