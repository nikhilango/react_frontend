package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Validated
@Controller
@RequestMapping("/group")
public class GroupController {
    private final GroupServiceImpl groupService;
    private final GroupMapper groupMapper;

@Autowired
    public GroupController(GroupServiceImpl groupService, GroupMapper groupMapper) {
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }
    @GetMapping("/{id}")
    public ResponseEntity<GroupDTO> groupById(@PathVariable UUID id) {
        Group group = groupService.findById(id);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
    @GetMapping({"", "/"})
    @PreAuthorize("hasAuthority('USER_READ_GROUPS')")
    public ResponseEntity<List<GroupDTO>> allGroups(){
        List<Group> groups = groupService.findAll();
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    @PreAuthorize("hasAuthority('GROUP_CREATE')")
    public ResponseEntity<GroupDTO> createGroup (@Valid @RequestBody GroupDTO group){
        Group returnedGroup = groupService.save(groupMapper.fromDTO(group));
        return new ResponseEntity<>(groupMapper.toDTO(returnedGroup), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('GROUP_MODIFY')")
    public ResponseEntity<GroupDTO> updateGroup (@Valid @RequestBody GroupDTO group, @PathVariable UUID id) {
        Group returnedGroup = groupService.updateById(id,groupMapper.fromDTO(group));
        return  new ResponseEntity<>(groupMapper.toDTO(returnedGroup), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('GROUP_DELETE')")
    public ResponseEntity<HttpStatus> deleteGroup (@PathVariable UUID id){
        groupService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
