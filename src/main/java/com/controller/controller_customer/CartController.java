package poly.edu.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.edu.dto.GioHangDTO;
import poly.edu.entity.GioHang;
import poly.edu.service.GioHangService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private GioHangService gioHangService;

    @GetMapping("/user/{maKH}")
    public String getCartItems(@PathVariable String maKH, Model model) {
        List<GioHang> cartItems = gioHangService.getCartItemsByKhachHang(maKH);
        if (cartItems == null) {
            cartItems = List.of(); // Tránh null, trả về danh sách rỗng
        }
        List<GioHangDTO> dtoList = cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        model.addAttribute("cartItems", dtoList);
        model.addAttribute("maKH", maKH);
        return "customer/GioHang";
    }

    private GioHangDTO convertToDTO(GioHang gioHang) {
        GioHangDTO dto = new GioHangDTO();
        if (gioHang != null) {
            dto.setMaGH(gioHang.getMaGH());
            if (gioHang.getKhachHang() != null) {
                dto.setMaKH(gioHang.getKhachHang().getMaKH());
            }
            if (gioHang.getSanPham() != null) {
                dto.setMaSP(gioHang.getSanPham().getMaSP());
            }
            dto.setSoLuong(gioHang.getSoLuong());
        }
        return dto;
    }
}