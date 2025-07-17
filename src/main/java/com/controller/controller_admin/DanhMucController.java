package com.controller.controller_admin;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dto.DanhMucDTO;
import com.service.DanhMucService;

@RestController
@RequestMapping("/api/danhmuc")
@CrossOrigin("*")
public class DanhMucController {

    @Autowired
    private DanhMucService danhMucService;

    @GetMapping
    public List<DanhMucDTO> getAllDanhMuc() {
        return danhMucService.getAllDanhMuc();
    }
}
