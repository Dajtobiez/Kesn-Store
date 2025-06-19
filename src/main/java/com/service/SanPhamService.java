package com.service;

import java.util.List;

import com.dto.SanPhamDTO;

public interface SanPhamService {
	 // Lấy danh sách tất cả sản phẩm
    List<SanPhamDTO> getAllSanPham();

    // Lấy 1 sản phẩm theo mã
    SanPhamDTO getSanPhamById(String maSP);

    // Thêm mới sản phẩm
    SanPhamDTO createSanPham(SanPhamDTO sanPhamDTO);

    // Cập nhật sản phẩm
    SanPhamDTO updateSanPham(String maSP, SanPhamDTO sanPhamDTO);

    // Xoá sản phẩm
    void deleteSanPham(String maSP);
    
    String generateNextMaSanPham();
}
