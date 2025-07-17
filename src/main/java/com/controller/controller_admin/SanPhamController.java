package com.controller.controller_admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dto.SanPhamDTO;
import com.service.SanPhamService;

@RestController
@RequestMapping("/api/sanpham") // 🔁 chỉnh sửa lại path theo JS frontend
@CrossOrigin("*")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    // GET: Lấy tất cả sản phẩm
    @GetMapping
    public List<SanPhamDTO> getAll() {
        return sanPhamService.getAllSanPham();
    }

    // GET: Lấy 1 sản phẩm theo mã
    @GetMapping("/{id}")
    public SanPhamDTO getById(@PathVariable String id) {
        return sanPhamService.getSanPhamById(id);
    }

    // GET: Tạo mã sản phẩm tiếp theo
    @GetMapping("/generate-code")
    public String generateCode() {
        return sanPhamService.generateNextMaSanPham();
    }

    // POST: Thêm mới sản phẩm
    @PostMapping
    public SanPhamDTO create(@RequestBody SanPhamDTO dto) {
        if (dto.getMaSP() == null || dto.getMaSP().trim().isEmpty()) {
            String newMa = sanPhamService.generateNextMaSanPham();
            dto.setMaSP(newMa);
        }
        return sanPhamService.createSanPham(dto);
    }

    // PUT: Cập nhật sản phẩm
    @PutMapping("/{id}")
    public SanPhamDTO update(@PathVariable String id, @RequestBody SanPhamDTO dto) {
        return sanPhamService.updateSanPham(id, dto);
    }

    // DELETE: Xoá sản phẩm
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        sanPhamService.deleteSanPham(id);
    }
}
