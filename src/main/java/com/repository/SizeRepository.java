package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Size;

public interface SizeRepository extends JpaRepository<Size, String> {

	Optional<Size> findBySoSize(String soSize);
	
}