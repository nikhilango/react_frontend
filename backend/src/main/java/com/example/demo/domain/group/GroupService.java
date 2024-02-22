package com.example.demo.domain.group;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static org.springframework.data.jpa.repository.support.JpaRepositoryFactory.EclipseLinkProjectionQueryCreationListener.log;
@Log4j2
@Service
public class GroupService {
    private final GroupRepository repository;
@Autowired
    public GroupService(GroupRepository repository) {
        this.repository = repository;
    }
    public Group getGroupById(UUID id){
    log.info("found id:" + id);

    }
}
