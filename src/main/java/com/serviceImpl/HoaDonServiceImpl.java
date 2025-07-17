package com.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.HoaDonDTO;
import com.repository.HoaDonRepository;
import com.service.HoaDonService;

@Service
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Override
    public List<HoaDonDTO> getAll() {
        return hoaDonRepository.getAllHoaDonDTO();
    }

    @Override
    public HoaDonDTO getById(String maHD) {
        return getAll().stream()
            .filter(hd -> hd.getMaHD().equals(maHD))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));
    }

	@Override
	public HoaDonDTO create(HoaDonDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HoaDonDTO update(String maHD, HoaDonDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(String maHD) {
		// TODO Auto-generated method stub
		
	}
}

