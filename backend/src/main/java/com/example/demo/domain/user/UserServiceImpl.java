package com.example.demo.domain.user;

import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
public class UserServiceImpl extends AbstractServiceImpl<User> implements UserService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;

  @Autowired
  public UserServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder,
                         UserRepository userRepository, RoleRepository roleRepository) {
    super(repository);
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }

  @Override
  public User register(User user) {
    Role role = roleRepository.findRoleByName("NO_GROUP_USER");
    user.setRoles(new HashSet<>(Collections.singleton(role)));
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return save(user);
  }
  @Override
  //This Method can be used for development and testing. the Password for the user will be set to "1234"
  public User registerUser(User user){
    user.setPassword(passwordEncoder.encode("1234"));
    return save(user);
  }

  @Override
  public List<User> getUsersByGroupId(UUID id, PageRequest pageRequest) {
    return userRepository.findAllByGroup_Id(id, pageRequest).getContent();
  }


  public Stream<Character> getRandomSpecialChars(int count) {
    Random random = new SecureRandom();
    IntStream specialChars = random.ints(count, 33, 45);
    return specialChars.mapToObj(data -> (char) data);
  }

}
