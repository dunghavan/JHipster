package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Hub.
 */
@Entity
@Table(name = "hub")
public class Hub implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Max(value = 11)
    @Column(name = "uid")
    private Integer uid;

    @Size(max = 45)
    @Column(name = "alias", length = 45)
    private String alias;

    @Size(max = 45)
    @Column(name = "uuid", length = 45)
    private String uuid;

    @Column(name = "lastactive")
    private ZonedDateTime lastactive;

    @OneToMany(mappedBy = "hub")
    @JsonIgnore
    private Set<Camera> cameras = new HashSet<>();

    @ManyToOne
    private Organization organization;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public Hub uid(Integer uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getAlias() {
        return alias;
    }

    public Hub alias(String alias) {
        this.alias = alias;
        return this;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getUuid() {
        return uuid;
    }

    public Hub uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public ZonedDateTime getLastactive() {
        return lastactive;
    }

    public Hub lastactive(ZonedDateTime lastactive) {
        this.lastactive = lastactive;
        return this;
    }

    public void setLastactive(ZonedDateTime lastactive) {
        this.lastactive = lastactive;
    }

    public Set<Camera> getCameras() {
        return cameras;
    }

    public Hub cameras(Set<Camera> cameras) {
        this.cameras = cameras;
        return this;
    }

    public Hub addCamera(Camera camera) {
        this.cameras.add(camera);
        camera.setHub(this);
        return this;
    }

    public Hub removeCamera(Camera camera) {
        this.cameras.remove(camera);
        camera.setHub(null);
        return this;
    }

    public void setCameras(Set<Camera> cameras) {
        this.cameras = cameras;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Hub organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Hub hub = (Hub) o;
        if (hub.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hub.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hub{" +
            "id=" + getId() +
            ", uid='" + getUid() + "'" +
            ", alias='" + getAlias() + "'" +
            ", uuid='" + getUuid() + "'" +
            ", lastactive='" + getLastactive() + "'" +
            "}";
    }
}
