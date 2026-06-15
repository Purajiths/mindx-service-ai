package com.purajith.mindxserviceai.service;

import com.purajith.mindxserviceai.entity.User;
import com.purajith.mindxserviceai.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	public User saveUser(User user) {
    return userRepository.save(user);
}

}
