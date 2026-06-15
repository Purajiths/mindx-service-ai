package com.purajith.mindxserviceai.repository;

import com.purajith.mindxserviceai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
