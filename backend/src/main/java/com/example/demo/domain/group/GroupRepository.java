package com.example.demo.domain.group;

import com.example.demo.core.generic.AbstractRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GroupRepository extends AbstractRepository<Group>, PagingAndSortingRepository<Group, UUID> {
}
