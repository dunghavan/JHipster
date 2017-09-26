package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 45)
    @Column(name = "name", length = 45)
    private String name;

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Hub> hubs = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Region> regions = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Organization name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Hub> getHubs() {
        return hubs;
    }

    public Organization hubs(Set<Hub> hubs) {
        this.hubs = hubs;
        return this;
    }

    public Organization addHub(Hub hub) {
        this.hubs.add(hub);
        hub.setOrganization(this);
        return this;
    }

    public Organization removeHub(Hub hub) {
        this.hubs.remove(hub);
        hub.setOrganization(null);
        return this;
    }

    public void setHubs(Set<Hub> hubs) {
        this.hubs = hubs;
    }

    public Set<Region> getRegions() {
        return regions;
    }

    public Organization regions(Set<Region> regions) {
        this.regions = regions;
        return this;
    }

    public Organization addRegion(Region region) {
        this.regions.add(region);
        region.setOrganization(this);
        return this;
    }

    public Organization removeRegion(Region region) {
        this.regions.remove(region);
        region.setOrganization(null);
        return this;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Organization organization = (Organization) o;
        if (organization.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organization.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
