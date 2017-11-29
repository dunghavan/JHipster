package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AccessPointDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AccessPoint and its DTO AccessPointDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, })
public interface AccessPointMapper extends EntityMapper <AccessPointDTO, AccessPoint> {

    @Mapping(source = "location.id", target = "locationId")
    AccessPointDTO toDto(AccessPoint accessPoint);

    @Mapping(source = "locationId", target = "location")
    AccessPoint toEntity(AccessPointDTO accessPointDTO);
    default AccessPoint fromId(Long id) {
        if (id == null) {
            return null;
        }
        AccessPoint accessPoint = new AccessPoint();
        accessPoint.setId(id);
        return accessPoint;
    }
}
