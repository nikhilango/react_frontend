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
}
