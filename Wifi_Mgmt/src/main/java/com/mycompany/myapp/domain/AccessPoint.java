package com.mycompany.myapp.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AccessPoint.
 */
@Entity
@Table(name = "access_point")
public class AccessPoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mac")
    private String mac;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "last_active")
    private LocalDate lastActive;

    @ManyToOne
    private Location location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMac() {
        return mac;
    }

    public AccessPoint mac(String mac) {
        this.mac = mac;
        return this;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getDescription() {
        return description;
    }

    public AccessPoint description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isStatus() {
        return status;
    }

    public AccessPoint status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDate getLastActive() {
        return lastActive;
    }

    public AccessPoint lastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
        return this;
    }

    public void setLastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
    }

    public Location getLocation() {
        return location;
    }

    public AccessPoint location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AccessPoint accessPoint = (AccessPoint) o;
        if (accessPoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accessPoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccessPoint{" +
            "id=" + getId() +
            ", mac='" + getMac() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + isStatus() + "'" +
            ", lastActive='" + getLastActive() + "'" +
            "}";
    }
}
