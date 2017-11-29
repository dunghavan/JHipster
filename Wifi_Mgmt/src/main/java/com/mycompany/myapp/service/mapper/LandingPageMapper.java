package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.LandingPageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LandingPage and its DTO LandingPageDTO.
 */
@Mapper(componentModel = "spring", uses = {ThemeMapper.class, OrganizationMapper.class, })
public interface LandingPageMapper extends EntityMapper <LandingPageDTO, LandingPage> {

    @Mapping(source = "theme.id", target = "themeId")

    @Mapping(source = "org.id", target = "orgId")
    LandingPageDTO toDto(LandingPage landingPage); 
    @Mapping(target = "loginTypes", ignore = true)

    @Mapping(source = "themeId", target = "theme")

    @Mapping(source = "orgId", target = "org")
    LandingPage toEntity(LandingPageDTO landingPageDTO); 
    default LandingPage fromId(Long id) {
        if (id == null) {
            return null;
        }
        LandingPage landingPage = new LandingPage();
        landingPage.setId(id);
        return landingPage;
    }
}
