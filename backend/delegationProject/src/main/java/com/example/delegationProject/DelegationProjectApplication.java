package com.example.delegationProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DelegationProjectApplication {

    private JwtCore jwtCore;

    public void setJwtCore(JwtCore jwtCore){
        this.jwtCore = jwtCore;
    }

	public static void main(String[] args) {
		SpringApplication.run(DelegationProjectApplication.class, args);
	}

}
