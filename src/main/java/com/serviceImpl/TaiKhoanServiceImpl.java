package com.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.TaiKhoanDTO;
import com.entity.KhachHang;
import com.entity.TaiKhoan;
import com.repository.KhachHangRepository;
import com.repository.TaiKhoanRepository;
import com.service.TaiKhoanService;

import static com.util.Constants.ROLE_CUSTOMER;
import static com.util.Constants.ROLE_ADMIN;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {

	@Autowired
	private TaiKhoanRepository repo;

	@Autowired
	private KhachHangRepository khachHangRepo;

	@Override
	public List<TaiKhoanDTO> getAll() {
		return repo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public TaiKhoanDTO create(TaiKhoanDTO dto) {
	    // Kiểm tra dữ liệu bắt buộc
	    if (dto.getTenDangNhap() == null || dto.getTenDangNhap().isBlank()) {
	        throw new RuntimeException("Tên đăng nhập không được để trống");
	    }
	    if (dto.getMatKhau() == null || dto.getMatKhau().isBlank()) {
	        throw new RuntimeException("Mật khẩu không được để trống");
	    }

	    TaiKhoan entity = toEntity(dto);

	    TaiKhoan saved;
	    try {
	        saved = repo.save(entity);
	    } catch (Exception e) {
	        throw new RuntimeException("Không thể tạo tài khoản. Có thể tên đăng nhập đã tồn tại hoặc dữ liệu không hợp lệ.", e);
	    }

	    // Nếu là khách hàng, tạo bản ghi KhachHang
	    if (isKhachHang(dto.getVaiTro())) {
	        KhachHang kh = new KhachHang();
	        String maTK = saved.getMaTK();
	        String number = maTK.replace("TK", "");
	        String maKH = "KH" + number;
	        kh.setMaKH(maKH);

	        kh.setTen(dto.getHoTen());
	        kh.setDiaChi(dto.getDiaChi());
	        kh.setEmail(dto.getEmail());
	        kh.setSoDienThoai(dto.getSdt());
	        kh.setTaiKhoan(saved);

	        khachHangRepo.save(kh);

	        try {
	            khachHangRepo.save(kh);
	        } catch (Exception e) {
	            throw new RuntimeException("Không thể tạo thông tin khách hàng", e);
	        }
	    }

	    return toDTO(saved);
	}


	@Override
	public TaiKhoanDTO update(String maTK, TaiKhoanDTO dto) {
		TaiKhoan existing = repo.findById(maTK).orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

		existing.setTenDangNhap(dto.getTenDangNhap());

		if (!dto.getMatKhau().isEmpty()) {
			existing.setMatKhau(dto.getMatKhau());
		}

		existing.setVaiTro(dto.getVaiTro());

		TaiKhoan saved = repo.save(existing);

		if (isKhachHang(dto.getVaiTro())) {
		    Optional<KhachHang> optionalKH = khachHangRepo.findByTaiKhoan_MaTK(maTK);
		    KhachHang kh = optionalKH.orElseGet(() -> {
		        KhachHang newKH = new KhachHang();
		        String number = maTK.replace("TK", "");
		        newKH.setMaKH("KH" + number);
		        return newKH;
		    });

		    kh.setTen(dto.getHoTen());
		    kh.setDiaChi(dto.getDiaChi());
		    kh.setEmail(dto.getEmail());
		    kh.setSoDienThoai(dto.getSdt());
		    kh.setTaiKhoan(saved);

		    khachHangRepo.save(kh);
		}

		return toDTO(saved);
	}

	@Override
	public void delete(String maTK) {
		repo.deleteById(maTK);
	}

	private TaiKhoanDTO toDTO(TaiKhoan entity) {
		TaiKhoanDTO dto = new TaiKhoanDTO();
		dto.setMaTK(entity.getMaTK());
		dto.setTenDangNhap(entity.getTenDangNhap());
		dto.setMatKhau(entity.getMatKhau());
		dto.setVaiTro(entity.getVaiTro());

		if (isKhachHang(entity.getVaiTro())) {
		    khachHangRepo.findByTaiKhoan_MaTK(entity.getMaTK()).ifPresent(kh -> {
		        dto.setHoTen(kh.getTen());
		        dto.setDiaChi(kh.getDiaChi());
		        dto.setEmail(kh.getEmail());
		        dto.setSdt(kh.getSoDienThoai());
		    });
		}
		return dto;
	}

	public TaiKhoan toEntity(TaiKhoanDTO dto) {
		TaiKhoan entity = new TaiKhoan();
		entity.setMaTK(dto.getMaTK());
		entity.setTenDangNhap(dto.getTenDangNhap());
		entity.setMatKhau(dto.getMatKhau());
		entity.setVaiTro(dto.getVaiTro());
		return entity;
	}
	
	private boolean isKhachHang(String vaiTro) {
	    if (vaiTro == null) return false;
	    String normalized = vaiTro.toLowerCase().replaceAll("\\s+", "");
	    return normalized.equals("khachhang") || normalized.equals("kháchhàng");
	}

	@Override
	public boolean existsByTenDangNhap(String tenDangNhap) {
	    return repo.existsByTenDangNhap(tenDangNhap);
	}
}
