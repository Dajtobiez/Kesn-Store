package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.DanhMuc;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
	Optional<DanhMuc> findByTenDanhMuc(String tenDanhMuc);
}
