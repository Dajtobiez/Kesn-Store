package com.controller.controller_admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.DonHangDTO;
import com.service.DonHangService;

@RestController
@RequestMapping("/api/donhang")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend (nếu khác origin)
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    // Lấy danh sách tất cả đơn hàng
    @GetMapping
    public List<DonHangDTO> getAll() {
        return donHangService.getAll();
    }

    // Lấy đơn hàng theo mã
    @GetMapping("/{maDH}")
    public DonHangDTO getById(@PathVariable String maDH) {
        return donHangService.getById(maDH);
    }

    // Tạo đơn hàng mới
    @PostMapping
    public DonHangDTO create(@RequestBody DonHangDTO dto) {
        return donHangService.create(dto);
    }

    @PutMapping("/{maDH}")
    public ResponseEntity<?> update(@PathVariable String maDH, @RequestBody DonHangDTO dto) {
        try {
            DonHangDTO updated = donHangService.update(maDH, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace(); // XEM LOG LỖI TẠI CONSOLE
            return ResponseEntity.status(500).body("Cập nhật đơn hàng thất bại: " + e.getMessage());
        }
    }
    
    // Xóa đơn hàng
    @DeleteMapping("/{maDH}")
    public void delete(@PathVariable String maDH) {
        donHangService.delete(maDH);
    }
}
