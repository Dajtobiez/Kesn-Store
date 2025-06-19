package com.controller.controller_admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.SanPhamDTO;
import com.service.SanPhamService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    // Lấy tất cả sản phẩm (kèm chi tiết màu, size)
    @GetMapping
    public List<SanPhamDTO> getAll() {
        return sanPhamService.getAllSanPham();
    }

    // Lấy 1 sản phẩm theo mã
    @GetMapping("/{id}")
    public SanPhamDTO getById(@PathVariable String id) {
        return sanPhamService.getSanPhamById(id);
    }
    
    @GetMapping("/generate-code")
    public String generateCode() {
        return sanPhamService.generateNextMaSanPham();
    }

    // Thêm mới sản phẩm
    @PostMapping
    public SanPhamDTO create(@RequestBody SanPhamDTO dto) {
        System.out.println("DTO nhận được: " + dto.getMaSP()); // log để biết có mã chưa

        if (dto.getMaSP() == null || dto.getMaSP().trim().isEmpty()) {
            String newMa = sanPhamService.generateNextMaSanPham();
            System.out.println("Tạo mã mới: " + newMa);
            dto.setMaSP(newMa);
        }

        return sanPhamService.createSanPham(dto);
    }



    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public SanPhamDTO update(@PathVariable String id, @RequestBody SanPhamDTO dto) {
        return sanPhamService.updateSanPham(id, dto);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        sanPhamService.deleteSanPham(id);
    }
}
