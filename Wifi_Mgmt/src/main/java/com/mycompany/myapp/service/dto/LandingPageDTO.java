package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the LandingPage entity.
 */
public class LandingPageDTO implements Serializable {

    private Long id;

    private String name;

    private String text1;

    private String text2;

    private String text3;

    private String image1;

    private String image2;

    private String image3;

    private Long themeId;

    private Long orgId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText1() {
        return text1;
    }

    public void setText1(String text1) {
        this.text1 = text1;
    }

    public String getText2() {
        return text2;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }

    public String getText3() {
        return text3;
    }

    public void setText3(String text3) {
        this.text3 = text3;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public Long getThemeId() {
        return themeId;
    }

    public void setThemeId(Long themeId) {
        this.themeId = themeId;
    }

    public Long getOrgId() {
        return orgId;
    }

    public void setOrgId(Long organizationId) {
        this.orgId = organizationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LandingPageDTO landingPageDTO = (LandingPageDTO) o;
        if(landingPageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), landingPageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LandingPageDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", text1='" + getText1() + "'" +
            ", text2='" + getText2() + "'" +
            ", text3='" + getText3() + "'" +
            ", image1='" + getImage1() + "'" +
            ", image2='" + getImage2() + "'" +
            ", image3='" + getImage3() + "'" +
            "}";
    }
}
