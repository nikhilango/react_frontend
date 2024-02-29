package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractEntity;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Set;
import java.util.UUID;

@Entity
// groups ist in der mehrzahl da group ein keyword ist.
@Table(name = "groups")
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class Group extends AbstractEntity {
    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "logo_url")
    private String logoUrl;

    @Transient
    private Integer memberCount;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "group")
    @JsonBackReference
    private Set<User> users;

    public Group(UUID id, String name, String description, String logoUrl, Integer memberCount){
        super(id);
        this.name = name;
        this.description = description;
        this.logoUrl = logoUrl;
        this.memberCount = memberCount;
    }

}
