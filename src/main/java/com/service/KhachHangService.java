package poly.edu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.edu.entity.KhachHang;
import poly.edu.repository.*;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {
	@Autowired
    private KhachHangRepository khachHangRepository;

    public List<KhachHang> getAllKhachHang() {
        return khachHangRepository.findAll();
    }

    public KhachHang findByMaKH(String maKH) {
        Optional<KhachHang> khachHang = khachHangRepository.findById(maKH);
        return khachHang.orElse(null);
    }

    public void save(KhachHang khachHang) {
        khachHangRepository.save(khachHang);
    }

    public void delete(String maKH) {
        khachHangRepository.deleteById(maKH);
    }
}
