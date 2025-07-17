package com.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.ChiTietDonHangDTO;
import com.dto.DonHangDTO;
import com.entity.ChiTietDonHang;
import com.entity.ChiTietDonHangId;
import com.entity.DonHang;
import com.entity.KhachHang;
import com.entity.MauSac;
import com.entity.SanPham;
import com.entity.Size;
import com.repository.DonHangRepository;
import com.repository.KhachHangRepository;
import com.repository.MauSacRepository;
import com.repository.SanPhamRepository;
import com.repository.SizeRepository;
import com.service.DonHangService;

@Service
public class DonHangServiceImpl implements DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private MauSacRepository mauSacRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<DonHangDTO> getAll() {
        List<DonHang> list = (List<DonHang>) donHangRepository.findAll();
        if (list == null) return List.of();

        return list.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DonHangDTO getById(String maDH) {
        DonHang donHang = donHangRepository.findById(maDH)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với mã: " + maDH));
        return toDTO(donHang);
    }

    @Override
    public DonHangDTO create(DonHangDTO dto) {
        DonHang donHang = toEntity(dto);

        if (dto.getChiTietSanPham() != null && !dto.getChiTietSanPham().isEmpty()) {
            List<ChiTietDonHang> chiTietList = dto.getChiTietSanPham().stream().map(ctdto -> {
                ChiTietDonHang chiTiet = new ChiTietDonHang();
                ChiTietDonHangId id = new ChiTietDonHangId();

                SanPham sanPham = sanPhamRepository.findByTen(ctdto.getTenSanPham())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm: " + ctdto.getTenSanPham()));
                MauSac mauSac = mauSacRepository.findByTenMau(ctdto.getMauSac())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy màu sắc: " + ctdto.getMauSac()));
                Size size = sizeRepository.findBySoSize(ctdto.getKichCo())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy kích cỡ: " + ctdto.getKichCo()));

                id.setMaDH(donHang.getMaDH());
                id.setMaSP(sanPham.getMaSP());
                id.setMaMau(mauSac.getMaMau());
                id.setMaSize(size.getMaSize());

                chiTiet.setId(id);
                chiTiet.setDonHang(donHang);
                chiTiet.setSanPham(sanPham);
                chiTiet.setMauSac(mauSac);
                chiTiet.setSize(size);
                chiTiet.setSoLuong(ctdto.getSoLuong());
                chiTiet.setTrangThai(ctdto.getTrangThai());
                chiTiet.setDonGia(ctdto.getGia());

                return chiTiet;
            }).collect(Collectors.toList());

            donHang.setChiTietDonHang(chiTietList);
        }

        DonHang saved = donHangRepository.save(donHang);
        return toDTO(saved);
    }

    @Override
    public DonHangDTO update(String maDH, DonHangDTO dto) {
        DonHang donHang = donHangRepository.findById(maDH)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng để cập nhật."));

        // Nếu chỉ cập nhật trạng thái
        if (dto.getTrangThai() != null) {
            if (donHang.getChiTietDonHang() != null) {
                for (ChiTietDonHang ct : donHang.getChiTietDonHang()) {
                    ct.setTrangThai(dto.getTrangThai());
                }
            }
        }

        if (dto.getSoHoaDon() != null) {
            donHang.setSoHoaDon(dto.getSoHoaDon());
        }

        if (dto.getNgayDatHang() != null) {
            donHang.setNgayDatHang(dto.getNgayDatHang());
        }

        if (dto.getTongTien() != null) {
            donHang.setTongTien(dto.getTongTien());
        }

        if (dto.getThueVAT() != null) {
            donHang.setThueVAT(dto.getThueVAT());
        }

        if (dto.getPhuongThucVanChuyen() != null) {
            donHang.setPhuongThucVanChuyen(dto.getPhuongThucVanChuyen());
        }

        if (dto.getMaKH() != null) {
            KhachHang khachHang = khachHangRepository.findById(dto.getMaKH())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với mã: " + dto.getMaKH()));
            donHang.setKhachHang(khachHang);
        }

        DonHang saved = donHangRepository.save(donHang);
        return toDTO(saved);
    }

    @Override
    public void delete(String maDH) {
        if (!donHangRepository.existsById(maDH)) {
            throw new RuntimeException("Không tìm thấy đơn hàng để xoá.");
        }
        donHangRepository.deleteById(maDH);
    }

    private DonHangDTO toDTO(DonHang entity) {
        DonHangDTO dto = new DonHangDTO();
        dto.setMaDH(entity.getMaDH());
        dto.setMaKH(entity.getKhachHang() != null ? entity.getKhachHang().getMaKH() : null);
        dto.setTenKH(entity.getKhachHang() != null ? entity.getKhachHang().getTen() : null);
        dto.setSoHoaDon(entity.getSoHoaDon());
        dto.setNgayDatHang(entity.getNgayDatHang());
        dto.setTongTien(entity.getTongTien());
        dto.setThueVAT(entity.getThueVAT());
        dto.setPhuongThucVanChuyen(entity.getPhuongThucVanChuyen());

        if (entity.getChiTietDonHang() != null && !entity.getChiTietDonHang().isEmpty()) {
            dto.setChiTietSanPham(entity.getChiTietDonHang().stream().map(ct -> {
                ChiTietDonHangDTO ctDto = new ChiTietDonHangDTO();
                ctDto.setTenSanPham(ct.getSanPham().getTen());
                ctDto.setMauSac(ct.getMauSac().getTenMau());
                ctDto.setKichCo(ct.getSize().getSoSize());
                ctDto.setSoLuong(ct.getSoLuong());
                ctDto.setGia(ct.getDonGia());
                ctDto.setTrangThai(ct.getTrangThai());
                return ctDto;
            }).collect(Collectors.toList()));
        } else {
            dto.setChiTietSanPham(List.of());
        }

        return dto;
    }

    private DonHang toEntity(DonHangDTO dto) {
        DonHang entity = new DonHang();
        entity.setMaDH(dto.getMaDH());
        entity.setSoHoaDon(dto.getSoHoaDon());
        entity.setNgayDatHang(dto.getNgayDatHang());
        entity.setTongTien(dto.getTongTien());
        entity.setThueVAT(dto.getThueVAT());
        entity.setPhuongThucVanChuyen(dto.getPhuongThucVanChuyen());

        if (dto.getMaKH() != null) {
            KhachHang khachHang = khachHangRepository.findById(dto.getMaKH())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với mã: " + dto.getMaKH()));
            entity.setKhachHang(khachHang);
        }

        return entity;
    }
}
