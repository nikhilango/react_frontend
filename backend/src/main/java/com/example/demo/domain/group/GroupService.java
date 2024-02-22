package com.example.demo.domain.group;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    return repository.findById(id).orElseThrow(() -> new NotFoundException("ID " + id + "not found"));
    }

    public List<Group> getAllgroups(){
    log.info("found all id's");
    return repository.findAll();
    }
}
