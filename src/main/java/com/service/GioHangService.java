package poly.edu.service;

import poly.edu.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.edu.repository.*;
import java.util.List;
import java.util.Optional;

@Service
public class GioHangService {

	@Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private KhachHangService khachHangService;

    @Autowired
    private SanPhamService sanPhamService;

    public List<GioHang> getCartItemsByKhachHang(String maKH) {
        return gioHangRepository.findByKhachHang_MaKH(maKH);
    }

    public void addToCart(GioHang gioHang) {
        KhachHang khachHang = khachHangService.findByMaKH(gioHang.getKhachHang().getMaKH());
        SanPham sanPham = sanPhamService.findByMaSP(gioHang.getSanPham().getMaSP());
        if (khachHang == null || sanPham == null) {
            return;
        }
        gioHang.setKhachHang(khachHang);
        gioHang.setSanPham(sanPham);

        Optional<GioHang> existingItem = gioHangRepository.findByKhachHang_MaKHAndSanPham_MaSP(khachHang.getMaKH(), sanPham.getMaSP());
        if (existingItem.isPresent()) {
            GioHang cartItem = existingItem.get();
            cartItem.setSoLuong(cartItem.getSoLuong() + gioHang.getSoLuong());
            gioHangRepository.save(cartItem);
        } else {
            gioHangRepository.save(gioHang);
        }
    }

    public void updateCartItem(GioHang gioHang) {
        Optional<GioHang> existingCartItem = gioHangRepository.findById(gioHang.getMaGH());
        if (existingCartItem.isPresent()) {
            GioHang cartItem = existingCartItem.get();
            cartItem.setSoLuong(gioHang.getSoLuong());
            gioHangRepository.save(cartItem);
        }
    }

    public void removeFromCart(String maGH) {
        gioHangRepository.deleteById(maGH);
    }

    public double calculateCartTotal(String maKH) {
        List<GioHang> cartItems = getCartItemsByKhachHang(maKH);
        if (cartItems == null || cartItems.isEmpty()) {
            return 0.0;
        }
        return cartItems.stream()
                .mapToDouble(item -> {
                    if (item.getSanPham() == null || item.getSanPham().getChiTietSanPhamList() == null) {
                        return 0.0;
                    }
                    List<ChiTietSanPham> chiTietSanPhamList = item.getSanPham().getChiTietSanPhamList();
                    return chiTietSanPhamList.stream()
                            .findFirst()
                            .map(ctsp -> ctsp.getGia().doubleValue() * item.getSoLuong())
                            .orElse(0.0);
                })
                .sum();
    }
}

