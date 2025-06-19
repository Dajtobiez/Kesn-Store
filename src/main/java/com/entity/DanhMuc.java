package com.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "DanhMuc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhMuc {

    @Id
    @Column(name = "MaDM", length = 10)
    private String maDM;

    @Column(name = "TenDanhMuc", length = 50, nullable = false)
    private String tenDanhMuc;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;
}
