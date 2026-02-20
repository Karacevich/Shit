package com.example.delegationProject;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String password;

    public Object getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Object getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Object getEmail() {
        return email;
    }

    public void setEmail(String  email) {
        this.email = email;
    }

    public Object getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
