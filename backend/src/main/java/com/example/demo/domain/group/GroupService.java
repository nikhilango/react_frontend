package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractService;

import java.util.NoSuchElementException;
import java.util.UUID;

public interface GroupService extends AbstractService<Group> {
    @Override
    Group updateById(UUID id, Group entity) throws NoSuchElementException;
}
