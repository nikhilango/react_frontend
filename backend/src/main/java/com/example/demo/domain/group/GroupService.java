package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractService;

import java.util.NoSuchElementException;
import java.util.UUID;

public interface GroupService extends AbstractService<Group> {
    public Group updateById(UUID id, Group group) throws NoSuchElementException;
    public Group createGroup(Group group);

    public void deleteGroup(UUID id);
}
