package com.controller.controller_admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dto.HoaDonDTO;
import com.service.HoaDonService;

@RestController
@RequestMapping("/api/hoadon")
@CrossOrigin
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    // Lấy tất cả hóa đơn
    @GetMapping
    public ResponseEntity<List<HoaDonDTO>> getAll() {
        return ResponseEntity.ok(hoaDonService.getAll());
    }

    // Lấy theo mã hóa đơn
    @GetMapping("/{maHD}")
    public ResponseEntity<HoaDonDTO> getById(@PathVariable String maHD) {
        return ResponseEntity.ok(hoaDonService.getById(maHD));
    }

    // Tạo mới hóa đơn
    @PostMapping
    public ResponseEntity<HoaDonDTO> create(@RequestBody HoaDonDTO dto) {
        return ResponseEntity.ok(hoaDonService.create(dto));
    }

    // Cập nhật hóa đơn
    @PutMapping("/{maHD}")
    public ResponseEntity<HoaDonDTO> update(@PathVariable String maHD, @RequestBody HoaDonDTO dto) {
        return ResponseEntity.ok(hoaDonService.update(maHD, dto));
    }

    // Xóa hóa đơn
    @DeleteMapping("/{maHD}")
    public ResponseEntity<Void> delete(@PathVariable String maHD) {
        hoaDonService.delete(maHD);
        return ResponseEntity.noContent().build();
    }
}
