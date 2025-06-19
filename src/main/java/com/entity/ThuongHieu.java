package com.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ThuongHieu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThuongHieu {

    @Id
    @Column(name = "MaTH", length = 10)
    private String maTH;

    @Column(name = "TenThuongHieu", length = 50, nullable = false)
    private String tenThuongHieu;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;
}
