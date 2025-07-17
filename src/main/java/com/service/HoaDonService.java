package com.service;

import java.util.List;

import com.dto.HoaDonDTO;

public interface HoaDonService {
	List<HoaDonDTO> getAll();
    HoaDonDTO getById(String maHD);
    HoaDonDTO create(HoaDonDTO dto);
    HoaDonDTO update(String maHD, HoaDonDTO dto);
    void delete(String maHD);
}