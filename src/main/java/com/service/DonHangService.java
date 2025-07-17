package com.service;

import com.dto.DonHangDTO;

import java.util.List;

public interface DonHangService {

    List<DonHangDTO> getAll();

    DonHangDTO getById(String maDH);

    DonHangDTO create(DonHangDTO dto);

    DonHangDTO update(String maDH, DonHangDTO dto);

    void delete(String maDH);
    
    //DonHangDTO getDonHangById (String maDH);
}
