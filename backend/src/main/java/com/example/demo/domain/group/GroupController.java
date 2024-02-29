package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.UserController;
import com.example.demo.domain.user.UserDetailsImpl;
import com.example.demo.domain.user.UserService;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
@Log4j2
@Validated
@Controller
@RequestMapping("/group")
public class GroupController {
    private final GroupServiceImpl groupService;
    private final GroupMapper groupMapper;

    @Autowired
    public GroupController(GroupServiceImpl groupService, GroupMapper groupMapper, UserService userService, UserController userController, UserMapper userMapper) {
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }
    @GetMapping("/{id}")
    @PreAuthorize("@userPermissionEvaluator.isInGroup(authentication.principal.user, #id)")
    @Operation(summary = "Fetches all Groups", description = "When successful it fetches all groups and returns a JSON-Code with the status code 200.")
    public ResponseEntity<GroupDTO> groupById(@PathVariable UUID id) {
        Group group = groupService.findById(id);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
    @GetMapping({"", "/"})
    @PreAuthorize("hasAuthority('USER_READ_GROUPS') or @userPermissionEvaluator.isNotInGroup(authentication.principal.user)")
    @Operation(summary = "Fetches a specific group", description = "When successful it fetches a specific group and returns a JSON-Code with the status code 200.")
    public ResponseEntity<List<GroupDTO>> allGroups(@RequestParam(defaultValue = "0") int page){
        List<Group> groups = groupService.findAll(PageRequest.of(page, 10));
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    @PreAuthorize("hasAuthority('GROUP_CREATE')")
    @Operation(summary = "Creates a group", description = "When successful it creates a group and returns a JSON-Code with the status code 200.")
    public ResponseEntity<GroupDTO> createGroup (@Valid @RequestBody GroupDTO group){
        Group returnedGroup = groupService.save(groupMapper.fromDTO(group));
        return new ResponseEntity<>(groupMapper.toDTO(returnedGroup), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('GROUP_MODIFY')")
    @Operation(summary = "Update a group", description = "When successful it updates a specific group and returns a JSON-Code with the status code 200.")
    public ResponseEntity<GroupDTO> updateGroup (@Valid @RequestBody GroupDTO group, @PathVariable UUID id) {
        Group returnedGroup = groupService.updateById(id,groupMapper.fromDTO(group));
        return  new ResponseEntity<>(groupMapper.toDTO(returnedGroup), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('GROUP_DELETE')")
    @Operation(summary = "Delete a group", description = "When successful it deletes a specific group and returns a JSON-Code with the status code 200.")
    public ResponseEntity<HttpStatus> deleteGroup (@PathVariable UUID id){
        groupService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
