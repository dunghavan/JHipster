package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.ThemeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Theme and its DTO ThemeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ThemeMapper extends EntityMapper <ThemeDTO, Theme> {
    
    
    default Theme fromId(Long id) {
        if (id == null) {
            return null;
        }
        Theme theme = new Theme();
        theme.setId(id);
        return theme;
    }
}
