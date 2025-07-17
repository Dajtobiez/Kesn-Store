package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dto.HoaDonDTO;
import com.entity.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon, String>{
	@Query("""
		    SELECT new com.dto.HoaDonDTO(
		        hd.maHD,
		        kh.maKH,
		        kh.ten,
		        dh.tongTien,
		        tt.phuongThucThanhToan,
		        vc.trangThaiGiaoHang,
		        vc.phuongThucVanChuyen,
		        vc.ngayGiaoDuKien
		    )
		    FROM HoaDon hd
		    JOIN hd.khachHang kh
		    JOIN DonHang dh ON dh.soHoaDon = hd.maHD
		    LEFT JOIN ThanhToan tt ON tt.hoaDon = hd
		    LEFT JOIN VanChuyen vc ON vc.hoaDon = hd
		""")
		List<HoaDonDTO> getAllHoaDonDTO();

}
