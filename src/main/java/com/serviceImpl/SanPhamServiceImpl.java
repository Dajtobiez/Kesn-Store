package com.serviceImpl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.DanhMucDTO;
import com.dto.MauDTO;
import com.dto.SanPhamDTO;
import com.dto.SizeDTO;
import com.dto.ThuongHieuDTO;
import com.entity.ChiTietSanPham;
import com.entity.DanhMuc;
import com.entity.MauSac;
import com.entity.SanPham;
import com.entity.Size;
import com.entity.ThuongHieu;
import com.repository.DanhMucRepository;
import com.repository.MauSacRepository;
import com.repository.SanPhamRepository;
import com.repository.SizeRepository;
import com.repository.ThuongHieuRepository;
import com.service.SanPhamService;

@Service
public class SanPhamServiceImpl implements SanPhamService {

	@Autowired
	private SanPhamRepository sanPhamRepo;

	@Autowired
	private DanhMucRepository danhMucRepo;

	@Autowired
	private ThuongHieuRepository thuongHieuRepo;

	@Autowired
	private MauSacRepository mauSacRepo;

	@Autowired
	private SizeRepository sizeRepo;

	@Override
	public List<SanPhamDTO> getAllSanPham() {
		return sanPhamRepo.findAll().stream().map(this::convertToDTO).toList();
	}

	@Override
	public SanPhamDTO getSanPhamById(String maSP) {
		SanPham entity = sanPhamRepo.findById(maSP).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
		return convertToDTO(entity);
	}

	@Override
	public SanPhamDTO createSanPham(SanPhamDTO dto) {
		if (dto.getMaSP() == null || dto.getMaSP().isEmpty()) {
	        dto.setMaSP(generateNextMaSanPham());
	    }
	    SanPham entity = convertToEntity(dto);
	    sanPhamRepo.save(entity);
	    return convertToDTO(entity);
	}
	
	@Override
	public String generateNextMaSanPham() {
	    return sanPhamRepo.findFirstByOrderByMaSPDesc()
	        .map(sp -> {
	            String ma = sp.getMaSP(); // VD: "SP007"
	            int num = Integer.parseInt(ma.replaceAll("\\D", ""));
	            return String.format("SP%03d", num + 1);
	        })
	        .orElse("SP001");
	}

	@Override
	public SanPhamDTO updateSanPham(String maSP, SanPhamDTO dto) {
		if (!sanPhamRepo.existsById(maSP)) {
			throw new RuntimeException("Không tìm thấy sản phẩm để cập nhật");
		}
		SanPham entity = convertToEntity(dto);
		return convertToDTO(sanPhamRepo.save(entity));
	}

	@Override
	public void deleteSanPham(String maSP) {
		sanPhamRepo.deleteById(maSP);
	}

	private SanPhamDTO convertToDTO(SanPham sp) {
		SanPhamDTO dto = new SanPhamDTO();
		dto.setMaSP(sp.getMaSP());
		dto.setTen(sp.getTen());
		//dto.setAnh(sp.getAnh());

		if (sp.getDanhMuc() != null) {
			DanhMucDTO dm = new DanhMucDTO();
			dm.setMaDanhMuc(null);
			dm.setTenDanhMuc(sp.getDanhMuc().getTenDanhMuc());
			dm.setMaDanhMuc(null);
			dto.setDanhMuc(dm);
		}

		if (sp.getThuongHieu() != null) {
			ThuongHieuDTO th = new ThuongHieuDTO();
			th.setMaTH(sp.getThuongHieu().getMaTH());
			th.setTenThuongHieu(sp.getThuongHieu().getTenThuongHieu());
			th.setMoTa(sp.getThuongHieu().getMoTa());
			dto.setThuongHieu(th);
		}

		// Fix lỗi null chiTiet
		if (sp.getChiTiet() != null) {
			Map<String, MauDTO> mauMap = new LinkedHashMap<>();
			for (ChiTietSanPham ct : sp.getChiTiet()) {
				String maMau = ct.getMauSac().getMaMau();
				String tenMau = ct.getMauSac().getTenMau();

				MauDTO mauDTO = mauMap.computeIfAbsent(maMau, k -> {
					MauDTO m = new MauDTO();
					m.setMaMau(k);
					m.setTenMau(tenMau);
					m.setSizes(new ArrayList<>());
					return m;
				});

				SizeDTO s = new SizeDTO();
				s.setMaSize(ct.getSize().getMaSize());
				s.setSoSize(ct.getSize().getSoSize());
				s.setSoLuong(ct.getSoLuong());
				s.setGia(ct.getGia());

				mauDTO.getSizes().add(s);
			}
			dto.setChiTiet(new ArrayList<>(mauMap.values()));
		} else {
			dto.setChiTiet(new ArrayList<>()); // tránh null ở frontend
		}

		return dto;
	}

	private SanPham convertToEntity(SanPhamDTO dto) {
	    SanPham entity = new SanPham();
	    entity.setMaSP(dto.getMaSP());
	    entity.setTen(dto.getTen());
	    // entity.setAnh(dto.getAnh());

	    // Gán danh mục
	    if (dto.getDanhMuc() != null && dto.getDanhMuc().getTenDanhMuc() != null) {
	        String tenDM = dto.getDanhMuc().getTenDanhMuc();
	        DanhMuc dm = danhMucRepo.findByTenDanhMuc(tenDM)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục: " + tenDM));
	        entity.setDanhMuc(dm);
	    }

	    // Gán thương hiệu
	    if (dto.getThuongHieu() != null && dto.getThuongHieu().getTenThuongHieu() != null) {
	        String tenTH = dto.getThuongHieu().getTenThuongHieu();
	        ThuongHieu th = thuongHieuRepo.findByTenThuongHieu(tenTH)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu: " + tenTH));
	        entity.setThuongHieu(th);
	    }

	    // Gán chi tiết sản phẩm (màu và size)
	    List<ChiTietSanPham> chiTietList = new ArrayList<>();
	    if (dto.getChiTiet() != null) {
	        for (MauDTO mauDTO : dto.getChiTiet()) {
	            // Tìm màu theo tên
	            String tenMau = mauDTO.getTenMau();
	            MauSac mau = mauSacRepo.findByTenMau(tenMau)
	                .orElseThrow(() -> new RuntimeException("Không tìm thấy màu: " + tenMau));

	            // Lặp qua các size
	            for (SizeDTO sizeDTO : mauDTO.getSizes()) {
	                String soSize = sizeDTO.getSoSize();
	                Size size = sizeRepo.findBySoSize(soSize)
	                    .orElseThrow(() -> new RuntimeException("Không tìm thấy size: " + soSize));

	                ChiTietSanPham ct = new ChiTietSanPham();
	                ct.setMauSac(mau);
	                ct.setSize(size);
	                ct.setGia(sizeDTO.getGia());
	                ct.setSoLuong(sizeDTO.getSoLuong());
	                ct.setSanPham(entity);

	                chiTietList.add(ct);
	            }
	        }
	    }

	    entity.setChiTiet(chiTietList);
	    return entity;
	}


    private final SanPhamRepository repository;

    public SanPhamServiceImpl(SanPhamRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<SanPham> findAll() {
        return repository.findAll();
    }

    @Override
    public SanPham save(SanPham sanPham) {
        return repository.save(sanPham);
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }	
}
