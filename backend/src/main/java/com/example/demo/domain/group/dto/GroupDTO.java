package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.AbstractDTO;
import com.example.demo.domain.user.dto.UserDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@RequiredArgsConstructor
@Setter
@Getter
public class GroupDTO extends AbstractDTO {
    @NotNull
    @Size(min = 1, max = 255)
    private String name;

    private String description;

    private String logoUrl;

    private Integer memberCount;

    @Valid
    private Set<UserDTO> users;

}
