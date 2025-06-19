package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.DanhMuc;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
	DanhMuc findByTenDanhMuc(String tenDanhMuc);
}
