package com.controller.controller_admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dto.TaiKhoanDTO;
import com.service.TaiKhoanService;

@RestController
@RequestMapping("/api/accounts")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping
    public List<TaiKhoanDTO> getAll() {
        return taiKhoanService.getAll();
    }

    @PostMapping
    public TaiKhoanDTO create(@RequestBody TaiKhoanDTO dto) {
        return taiKhoanService.create(dto);
    }

    @PutMapping("/{maTK}")
    public TaiKhoanDTO update(@PathVariable String maTK, @RequestBody TaiKhoanDTO dto) {
        return taiKhoanService.update(maTK, dto);
    }

    @DeleteMapping("/{maTK}")
    public void delete(@PathVariable String maTK) {
        taiKhoanService.delete(maTK);
    }
    
    @GetMapping("/check-username")
    public boolean checkUsernameExists(@RequestParam String username) {
        return taiKhoanService.existsByTenDangNhap(username);
    }
}
