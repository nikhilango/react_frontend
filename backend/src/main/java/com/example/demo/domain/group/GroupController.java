package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public ResponseEntity<GroupDTO> retrieveById(@PathVariable UUID id) {
        Group group = groupService.findById(id);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
}
