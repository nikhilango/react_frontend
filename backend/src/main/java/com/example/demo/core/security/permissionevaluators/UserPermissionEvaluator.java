package com.example.demo.core.security.permissionevaluators;

import com.example.demo.domain.group.Group;
import com.example.demo.domain.user.User;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserPermissionEvaluator {

  public UserPermissionEvaluator() {
  }

  public boolean isUserAboveAge(User principal, int age) {
    return true;
  }
  public boolean isNotInGroup(User principal){
    return principal.getGroup() == null;
  }

  public boolean isInGroup(User principal, UUID group){
    return principal.getGroup().getId().equals(group);
  }

}
