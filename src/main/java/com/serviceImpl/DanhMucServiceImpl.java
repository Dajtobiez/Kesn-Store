package com.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.DanhMucDTO;
import com.repository.DanhMucRepository;
import com.service.DanhMucService;

@Service
public class DanhMucServiceImpl implements DanhMucService {

    @Autowired
    private DanhMucRepository danhMucRepo;

    @Override
    public List<DanhMucDTO> getAllDanhMuc() {
        return danhMucRepo.findAll().stream().map(dm -> new DanhMucDTO(dm.getMaDanhMuc(), dm.getTenDanhMuc())).collect(Collectors.toList());
    }
}
