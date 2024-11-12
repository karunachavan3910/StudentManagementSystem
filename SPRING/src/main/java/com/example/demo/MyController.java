package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MyController {
	
	@Autowired
	StudentRepo studentRepo;
	@Autowired
	UserRepo userRepo;
	
	
	@RequestMapping("login/{username}")
	@PostMapping("login/{username}")

	public int login(@PathVariable String username,@RequestBody String password)
	{
		int count=userRepo.countByUsername(username);
		if(count==0)
			return 2; //wrong username
		else if(count>1)
			return 3;
		else
		{
			User user=userRepo.findByUsername(username);
			if(user.password.equals(password))
				return 1; //login
			else
				return 4;
		}
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/delete/{id}") // Added slash before {id}
	public int delete(@PathVariable int id) {
	    try {
	        studentRepo.deleteById(id);
	        return 1;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return 0;
	    }
	}

	

	@PutMapping("/update/{id}")
	public Student updateStudent(@PathVariable int id, @RequestBody Student student) {
	    Optional<Student> existingStudent = studentRepo.findById(id);
	    if (existingStudent.isPresent()) {
	        Student updatedStudent = existingStudent.get();
	        updatedStudent.setName(student.getName());
	        updatedStudent.setMarks(student.getMarks());
	        return studentRepo.save(updatedStudent);
	    }
	    return null;
	}

	@RequestMapping("get")
	public List<Student> get(){
		try {
			return studentRepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping("add")
	public Student add(@RequestBody Student student){
		try {
			Student dbStudent= studentRepo.save(student);
			return dbStudent;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}