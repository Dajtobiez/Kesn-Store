package poly.edu.repository;

import poly.edu.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GioHangRepository extends JpaRepository<GioHang, String>  {
	List<GioHang> findByKhachHang_MaKH(String maKH);
	Optional<GioHang> findByKhachHang_MaKHAndSanPham_MaSP(String maKH, String maSP);
}
