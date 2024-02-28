package com.example.demo.domain.user.dto;

import com.example.demo.core.generic.AbstractDTO;
import com.example.demo.domain.group.Group;
import com.example.demo.domain.role.dto.RoleDTO;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserDTO extends AbstractDTO {

  private String firstName;

  private String lastName;

  @Email
  private String email;

  @Valid
  private Set<RoleDTO> roles;

  @ManyToOne
  @JoinColumn(name = "group_id", referencedColumnName = "id")
  private Group group;

  public UserDTO(UUID id, String firstName, String lastName, String email, Set<RoleDTO> roles, Group group) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = roles;
    this.group = group;
  }

}
