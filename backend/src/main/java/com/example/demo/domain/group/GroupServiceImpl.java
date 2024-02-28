package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.role.RoleService;
import com.example.demo.domain.user.User;
import lombok.extern.log4j.Log4j2;
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
                    Set<Role> userRoles = user.getRoles();
                    userRoles.add(roleService.getRoleByName("GROUP_USER"));
                    userRoles.remove(roleService.getRoleByName("NO_GROUP_USER"));
                }}
            for (User exUser : existingUser) {
                if (!newUser.contains(exUser)) {
                    Set<Role> userRoles = exUser.getRoles();
                    userRoles.add(roleService.getRoleByName("NO_GROUP_USER"));
                    userRoles.remove(roleService.getRoleByName("GROUP_USER"));
                }
            }
            group.setMemberCount(newUser.size());
            return repository.save(group);
        } else {
            throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
        }
        }

    @Override
    public Group createGroup(Group group) {
    if (group.getUsers().isEmpty()){
        group.setMemberCount(0);
    }else {
        group.setMemberCount(group.getUsers().size());
    }
    repository.save(group);
    return group;
    }
}
