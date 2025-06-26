package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.KhachHang;

public interface KhachHangRepository extends JpaRepository<KhachHang, String>{
	Optional<KhachHang> findByTaiKhoan_MaTK(String maTK);

}
