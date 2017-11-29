package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.LoginTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LoginType and its DTO LoginTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {LandingPageMapper.class, })
public interface LoginTypeMapper extends EntityMapper <LoginTypeDTO, LoginType> {

    @Mapping(source = "landingPage.id", target = "landingPageId")
    LoginTypeDTO toDto(LoginType loginType); 

    @Mapping(source = "landingPageId", target = "landingPage")
    LoginType toEntity(LoginTypeDTO loginTypeDTO); 
    default LoginType fromId(Long id) {
        if (id == null) {
            return null;
        }
        LoginType loginType = new LoginType();
        loginType.setId(id);
        return loginType;
    }
}
