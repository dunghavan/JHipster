package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A LandingPage.
 */
@Entity
@Table(name = "landing_page")
@Document(indexName = "landingpage")
public class LandingPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "text_1")
    private String text1;

    @Column(name = "text_2")
    private String text2;

    @Column(name = "text_3")
    private String text3;

    @Column(name = "image_1")
    private String image1;

    @Column(name = "image_2")
    private String image2;

    @Column(name = "image_3")
    private String image3;

    @OneToMany(mappedBy = "landingPage")
    @JsonIgnore
    private Set<LoginType> loginTypes = new HashSet<>();

    @ManyToOne
    private Theme theme;

    @ManyToOne
    private Organization org;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public LandingPage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText1() {
        return text1;
    }

    public LandingPage text1(String text1) {
        this.text1 = text1;
        return this;
    }

    public void setText1(String text1) {
        this.text1 = text1;
    }

    public String getText2() {
        return text2;
    }

    public LandingPage text2(String text2) {
        this.text2 = text2;
        return this;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }

    public String getText3() {
        return text3;
    }

    public LandingPage text3(String text3) {
        this.text3 = text3;
        return this;
    }

    public void setText3(String text3) {
        this.text3 = text3;
    }

    public String getImage1() {
        return image1;
    }

    public LandingPage image1(String image1) {
        this.image1 = image1;
        return this;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public LandingPage image2(String image2) {
        this.image2 = image2;
        return this;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public LandingPage image3(String image3) {
        this.image3 = image3;
        return this;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public Set<LoginType> getLoginTypes() {
        return loginTypes;
    }

    public LandingPage loginTypes(Set<LoginType> loginTypes) {
        this.loginTypes = loginTypes;
        return this;
    }

    public LandingPage addLoginType(LoginType loginType) {
        this.loginTypes.add(loginType);
        loginType.setLandingPage(this);
        return this;
    }

    public LandingPage removeLoginType(LoginType loginType) {
        this.loginTypes.remove(loginType);
        loginType.setLandingPage(null);
        return this;
    }

    public void setLoginTypes(Set<LoginType> loginTypes) {
        this.loginTypes = loginTypes;
    }

    public Theme getTheme() {
        return theme;
    }

    public LandingPage theme(Theme theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public Organization getOrg() {
        return org;
    }

    public LandingPage org(Organization organization) {
        this.org = organization;
        return this;
    }

    public void setOrg(Organization organization) {
        this.org = organization;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LandingPage landingPage = (LandingPage) o;
        if (landingPage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), landingPage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LandingPage{" +
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
