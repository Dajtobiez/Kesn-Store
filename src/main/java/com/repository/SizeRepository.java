package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Size;

public interface SizeRepository extends JpaRepository<Size, String> {

	Size findBySoSize(String soSize);
	
}