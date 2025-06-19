package poly.edu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.edu.repository.*;
import poly.edu.entity.SanPham;

@Service
public class SanPhamService {
	@Autowired
    private SanPhamRepository sanPhamRepository;

    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    public SanPham findByMaSP(String maSP) {
        Optional<SanPham> sanPham = sanPhamRepository.findById(maSP);
        return sanPham.orElse(null);
    }

    public void save(SanPham sanPham) {
        sanPhamRepository.save(sanPham);
    }

    public void delete(String maSP) {
        sanPhamRepository.deleteById(maSP);
    }
}
