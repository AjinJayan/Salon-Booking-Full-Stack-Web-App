package com.ajin.user_service.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.user_service.dto.UserDto;
import com.ajin.user_service.mapper.UserMapper;
import com.ajin.user_service.model.User;
import com.ajin.user_service.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid User user) {
        User savedUser = userService.createUser(user);
        return new ResponseEntity<UserDto>(UserMapper.toUserDto(savedUser), HttpStatus.CREATED);

    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        List<UserDto> userDtoList = users.stream().map(UserMapper::toUserDto).collect(Collectors.toList());
        return new ResponseEntity<List<UserDto>>(userDtoList, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return new ResponseEntity<UserDto>(UserMapper.toUserDto(userService.getUserById(id)), HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody @Valid User user) {
        return new ResponseEntity<UserDto>(UserMapper.toUserDto(userService.updateUser(id, user)), HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String message = userService.deleteUser(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/users/profile")
    public ResponseEntity<UserDto> getUserProfileInfo(@RequestHeader("Authorization") String jwt) {
        return new ResponseEntity<UserDto>(UserMapper.toUserDto(userService.getUserFromJwt(jwt)), HttpStatus.OK);
    }

}
