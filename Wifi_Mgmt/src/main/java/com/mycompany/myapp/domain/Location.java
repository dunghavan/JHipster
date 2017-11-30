package com.mycompany.myapp.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Location.
 */
@Entity
@Table(name = "location")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "province")
    private String province;

    @Column(name = "city")
    private String city;

    @Column(name = "longtitude")
    private String longtitude;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "redirect_url")
    private String redirectUrl;

    @ManyToOne
    private Organization org;

    @ManyToOne
    private LandingPage landingPage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Location streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getProvince() {
        return province;
    }

    public Location province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public Location city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLongtitude() {
        return longtitude;
    }

    public Location longtitude(String longtitude) {
        this.longtitude = longtitude;
        return this;
    }

    public void setLongtitude(String longtitude) {
        this.longtitude = longtitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public Location latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Boolean isStatus() {
        return status;
    }

    public Location status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public Location redirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
        return this;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Organization getOrg() {
        return org;
    }

    public Location org(Organization organization) {
        this.org = organization;
        return this;
    }

    public void setOrg(Organization organization) {
        this.org = organization;
    }

    public LandingPage getLandingPage() {
        return landingPage;
    }

    public Location landingPage(LandingPage landingPage) {
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
        Location location = (Location) o;
        if (location.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), location.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", province='" + getProvince() + "'" +
            ", city='" + getCity() + "'" +
            ", longtitude='" + getLongtitude() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", status='" + isStatus() + "'" +
            ", redirectUrl='" + getRedirectUrl() + "'" +
            "}";
    }
}
