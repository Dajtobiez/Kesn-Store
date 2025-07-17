package com.service;

import java.util.List;

import com.dto.TaiKhoanDTO;

public interface TaiKhoanService {
	List<TaiKhoanDTO> getAll();

	TaiKhoanDTO create(TaiKhoanDTO dto);

	TaiKhoanDTO update(String maTK, TaiKhoanDTO dto);

	void delete(String maTK);
	
	boolean existsByTenDangNhap(String tenDangNhap);
}
