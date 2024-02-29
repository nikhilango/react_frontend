package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.role.RoleService;
import com.example.demo.domain.user.User;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.DialectOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Log4j2
@Service
public class GroupServiceImpl extends AbstractServiceImpl<Group> implements GroupService {
    private final RoleService roleService;
@Autowired
    public GroupServiceImpl(GroupRepository repository, RoleService roleService) {
    super(repository);
    this.roleService = roleService;
}

    @Override
    public Group updateById(UUID id, Group group) throws NoSuchElementException{
        if (repository.existsById(id)) {
            Set<User> newUser;
            if (group.getUsers() == null){
                newUser = new HashSet<>();
            }else {
                newUser = group.getUsers();
            }
            group.setId(id);
            Optional<Group> existingGroup = repository.findById(id);
            Set<User> existingUser = existingGroup.get().getUsers();
            for (User user : newUser) {
                if (!existingUser.contains(user)) {
                    log.trace("users added");
                    Set<Role> userRoles = user.getRoles();
                    userRoles.clear();
                    userRoles.add(roleService.getRoleByName("GROUP_USER"));
                    user.setGroup(findById(id));

                }}
            for (User exUser : existingUser) {
                if (!newUser.contains(exUser)) {
                    log.trace("user removed");
                    Set<Role> userRoles = exUser.getRoles();
                    userRoles.clear();
                    userRoles.add(roleService.getRoleByName("NO_GROUP_USER"));
                    exUser.setGroup(null);
                }
            }
            return repository.save(group);
        } else {
            throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
        }
        }

    @Override
    public Group createGroup(Group group) {
        for (User user: group.getUsers()) {
            Set<Role> roles = user.getRoles();
            roles.clear();
            roles.add(roleService.getRoleByName("GROUP_USER"));
            user.setGroup(group);
        }
    repository.save(group);
    return group;
    }
    @Override
    public void deleteGroup(UUID id){
        if (repository.existsById(id)) {
            Optional<Group> group = repository.findById(id);
            for (User user: group.get().getUsers()) {
               Set<Role> userRoles = user.getRoles();
               userRoles.clear();
               userRoles.add(roleService.getRoleByName("NO_GROUP_USER"));
               user.setGroup(null);
            }
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
        }
    }
}
