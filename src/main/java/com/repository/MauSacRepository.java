package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.MauSac;

public interface MauSacRepository extends JpaRepository<MauSac, String> {

	Optional<MauSac> findByTenMau(String tenMau);
	

}