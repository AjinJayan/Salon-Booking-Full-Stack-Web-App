package com.ajin.user_service.mapper;

import com.ajin.user_service.dto.UserDto;
import com.ajin.user_service.model.User;

public class UserMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().toString());
        userDto.setPhone(user.getPhone());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setUsername(user.getUsername());
        return userDto;
    }
}
