package com.example.demo.domain.user;

import com.example.demo.core.generic.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

public interface UserService extends UserDetailsService, AbstractService<User> {
  User register(User user);

  User registerUser(User user);

  List<User> getUsersByGroupId(UUID id, PageRequest pageRequest);
}
