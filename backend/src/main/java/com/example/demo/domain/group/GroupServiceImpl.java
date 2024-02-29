package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.role.RoleService;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Log4j2
@Service
public class GroupServiceImpl extends AbstractServiceImpl<Group> implements GroupService {
    private final RoleService roleService;
    private final UserService userService;
    private final UserRepository userRepository;
@Autowired
    public GroupServiceImpl(GroupRepository repository, RoleService roleService, UserService userService, UserRepository userRepository) {
    super(repository);
    this.roleService = roleService;
    this.userService = userService;
    this.userRepository = userRepository;
}
    @Override
    public Group updateById(UUID id, Group group) throws NoSuchElementException {
        if (repository.existsById(id)) {
            Optional<Group> existingGroup = repository.findById(id);
            for (User existingUser: existingGroup.get().getUsers()) {
                existingUser.setGroup(null);
                userRepository.save(existingUser);
            }
            group.setId(id);
            for (User user: group.getUsers()) {
                user.setGroup(group);
                User realUser = userService.findById(user.getId());
                realUser.setGroup(group);
                userRepository.save(realUser);
            }
            return repository.save(group);
        } else {
            throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
        }
    }
}
