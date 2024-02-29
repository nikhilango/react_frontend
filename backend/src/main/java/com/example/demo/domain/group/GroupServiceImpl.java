package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.role.RoleService;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Log4j2
@Service
public class GroupServiceImpl extends AbstractServiceImpl<Group> implements GroupService {
    private final GroupRepository groupRepository;
    private final RoleService roleService;
    private final UserService userService;
    private final UserRepository userRepository;
@Autowired
    public GroupServiceImpl(GroupRepository repository, RoleService roleService, UserService userService, UserRepository userRepository,
                            GroupRepository groupRepository) {
    super(repository);
    this.roleService = roleService;
    this.userService = userService;
    this.userRepository = userRepository;
    this.groupRepository = groupRepository;
}
    /**
     * Updates a group entity by its unique identifier.
     * If the group with the given ID exists, it updates the group's details along with the associated users.
     * If the group does not exist, it throws a NoSuchElementException.
     *
     * @param id The unique identifier of the group to be updated.
     * @param group The new group object containing updated details.
     * @return The updated group object.
     * @throws NoSuchElementException If the group with the given ID does not exist.
     */
    @Override
    public Group updateById(UUID id, Group group) throws NoSuchElementException {
        if (repository.existsById(id)) {
            // Retrieve existing group
            Optional<Group> existingGroup = repository.findById(id);

            // Remove association of existing users with the group
            for (User existingUser: existingGroup.get().getUsers()) {
                existingUser.setGroup(null);
                userRepository.save(existingUser);
            }

            // Set ID of the new group and update associations with users
            group.setId(id);
            for (User user: group.getUsers()) {
                user.setGroup(group);
                // Find and update the user's group association
                User realUser = userService.findById(user.getId());
                realUser.setGroup(group);
                userRepository.save(realUser);
            }

            // Save and return the updated group
            return repository.save(group);
        } else {
            // Throw exception if the group does not exist
            throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
        }
    }

    /**
     * Saves a group entity with its associated users.
     *
     * @param group The group object to be saved.
     * @return The saved group object.
     */
    @Override
    public Group save(Group group){
        // Save the group
        groupRepository.save(group);

        // Update associations with users
        for (User user: group.getUsers()) {
            // Find existing user and update group association
            User existingUser = userService.findById(user.getId());
            existingUser.setGroup(group);
            userRepository.save(existingUser);
        }

        // Return the saved group
        return group;
    }
    @Override
    public void deleteById(UUID id) {
        // Retrieve the group
        Group group = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Group not found with id: " + id));

        // Remove association of the group from users
        for (User user : group.getUsers()) {
            user.setGroup(null);
            // Save the updated user (remove the association with the group)
            userRepository.save(user);
        }

        // Finally, delete the group
        repository.deleteById(id);
    }


}
