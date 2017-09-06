package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Device.
 */
@Entity
@Table(name = "device")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "download")
    private Long download;

    @Column(name = "upload")
    private Long upload;

    @Column(name = "new_field_1")
    private String newField1;

    @ManyToOne
    private Model model;

    @ManyToOne
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public Device deviceName(String deviceName) {
        this.deviceName = deviceName;
        return this;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public Device ipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Long getDownload() {
        return download;
    }

    public Device download(Long download) {
        this.download = download;
        return this;
    }

    public void setDownload(Long download) {
        this.download = download;
    }

    public Long getUpload() {
        return upload;
    }

    public Device upload(Long upload) {
        this.upload = upload;
        return this;
    }

    public void setUpload(Long upload) {
        this.upload = upload;
    }

    public String getNewField1() {
        return newField1;
    }

    public Device newField1(String newField1) {
        this.newField1 = newField1;
        return this;
    }

    public void setNewField1(String newField1) {
        this.newField1 = newField1;
    }

    public Model getModel() {
        return model;
    }

    public Device model(Model model) {
        this.model = model;
        return this;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Device device = (Device) o;
        if (device.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), device.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Device{" +
            "id=" + getId() +
            ", deviceName='" + getDeviceName() + "'" +
            ", ipAddress='" + getIpAddress() + "'" +
            ", download='" + getDownload() + "'" +
            ", upload='" + getUpload() + "'" +
            ", newField1='" + getNewField1() + "'" +
            "}";
    }
}
