package com.mycompany.myapp.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A LoginType.
 */
@Entity
@Table(name = "login_type")
@Document(indexName = "logintype")
public class LoginType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private LandingPage landingPage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public LoginType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LandingPage getLandingPage() {
        return landingPage;
    }

    public LoginType landingPage(LandingPage landingPage) {
        this.landingPage = landingPage;
        return this;
    }

    public void setLandingPage(LandingPage landingPage) {
        this.landingPage = landingPage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LoginType loginType = (LoginType) o;
        if (loginType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loginType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoginType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
