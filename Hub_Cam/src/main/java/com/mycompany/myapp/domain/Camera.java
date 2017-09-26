package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Camera.
 */
@Entity
@Table(name = "camera")
public class Camera implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "alias", length = 255, nullable = false)
    private String alias;

    @Size(max = 45)
    @Column(name = "lng", length = 45)
    private String lng;

    @Size(max = 45)
    @Column(name = "lat", length = 45)
    private String lat;

    @Size(max = 255)
    @Column(name = "icon", length = 255)
    private String icon;

    @Size(max = 45)
    @Column(name = "iconcluster", length = 45)
    private String iconcluster;

    @Max(value = 11)
    @Column(name = "mainstream")
    private Integer mainstream;

    @Max(value = 11)
    @Column(name = "substream")
    private Integer substream;

    @Size(max = 255)
    @Column(name = "address", length = 255)
    private String address;

    @Size(max = 45)
    @Column(name = "jhi_uid", length = 45)
    private String uid;

    @ManyToOne
    private Hub hub;

    @ManyToOne
    private Region region;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public Camera alias(String alias) {
        this.alias = alias;
        return this;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getLng() {
        return lng;
    }

    public Camera lng(String lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public Camera lat(String lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getIcon() {
        return icon;
    }

    public Camera icon(String icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getIconcluster() {
        return iconcluster;
    }

    public Camera iconcluster(String iconcluster) {
        this.iconcluster = iconcluster;
        return this;
    }

    public void setIconcluster(String iconcluster) {
        this.iconcluster = iconcluster;
    }

    public Integer getMainstream() {
        return mainstream;
    }

    public Camera mainstream(Integer mainstream) {
        this.mainstream = mainstream;
        return this;
    }

    public void setMainstream(Integer mainstream) {
        this.mainstream = mainstream;
    }

    public Integer getSubstream() {
        return substream;
    }

    public Camera substream(Integer substream) {
        this.substream = substream;
        return this;
    }

    public void setSubstream(Integer substream) {
        this.substream = substream;
    }

    public String getAddress() {
        return address;
    }

    public Camera address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUid() {
        return uid;
    }

    public Camera uid(String uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Hub getHub() {
        return hub;
    }

    public Camera hub(Hub hub) {
        this.hub = hub;
        return this;
    }

    public void setHub(Hub hub) {
        this.hub = hub;
    }

    public Region getRegion() {
        return region;
    }

    public Camera region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Camera camera = (Camera) o;
        if (camera.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), camera.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Camera{" +
            "id=" + getId() +
            ", alias='" + getAlias() + "'" +
            ", lng='" + getLng() + "'" +
            ", lat='" + getLat() + "'" +
            ", icon='" + getIcon() + "'" +
            ", iconcluster='" + getIconcluster() + "'" +
            ", mainstream='" + getMainstream() + "'" +
            ", substream='" + getSubstream() + "'" +
            ", address='" + getAddress() + "'" +
            ", uid='" + getUid() + "'" +
            "}";
    }
}
