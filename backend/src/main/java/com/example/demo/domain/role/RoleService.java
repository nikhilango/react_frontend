package com.example.demo.domain.role;

import com.example.demo.core.generic.AbstractRepository;
import com.example.demo.core.generic.AbstractServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends AbstractServiceImpl<Role> {
    private final RoleRepository roleRepository;
    public RoleService(AbstractRepository<Role> repository, RoleRepository roleRepository) {
        super(repository);
        this.roleRepository = roleRepository;
    }

    public Role getRoleByName(String name){
        return roleRepository.findRoleByName(name);
    }
}
