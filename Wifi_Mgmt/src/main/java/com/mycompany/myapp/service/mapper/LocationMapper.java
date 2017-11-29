package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.LocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Location and its DTO LocationDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class, LandingPageMapper.class, })
public interface LocationMapper extends EntityMapper <LocationDTO, Location> {

    @Mapping(source = "org.id", target = "orgId")

    @Mapping(source = "landingPage.id", target = "landingPageId")
    LocationDTO toDto(Location location); 

    @Mapping(source = "orgId", target = "org")

    @Mapping(source = "landingPageId", target = "landingPage")
    Location toEntity(LocationDTO locationDTO); 
    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
