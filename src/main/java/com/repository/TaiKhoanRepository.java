package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.TaiKhoan;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String>{

	boolean existsByTenDangNhap(String tenDangNhap);

}
