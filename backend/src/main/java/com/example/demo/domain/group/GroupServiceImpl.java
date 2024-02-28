package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class GroupServiceImpl extends AbstractServiceImpl<Group> implements GroupService {
@Autowired
    public GroupServiceImpl(GroupRepository repository) {
    super(repository);
    }
}
