package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository <Student, Integer> {
	
	Optional<Student> findById(int id);
	

	
}