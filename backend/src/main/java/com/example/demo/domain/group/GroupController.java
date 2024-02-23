package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Validated
@Controller
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;
    private final GroupMapper groupMapper;

@Autowired
    public GroupController(GroupService groupService, GroupMapper groupMapper) {
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }
    @GetMapping("/{id}")
    public ResponseEntity<GroupDTO> groupById(@PathVariable UUID id) {
        Group group = groupService.getGroupById(id);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
    @GetMapping({"", "/"})
    @PreAuthorize("hasAuthority('USER_READ_GROUPS')")
    public ResponseEntity<List<GroupDTO>> allGroups(){
        List<Group> groups = groupService.getAllgroups();
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.OK);
    }
}
