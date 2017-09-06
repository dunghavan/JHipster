package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A WLANGroup.
 */
@Entity
@Table(name = "wlan_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WLANGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alias")
    private String alias;

    @Column(name = "ssid")
    private String ssid;

    @Column(name = "encryption")
    private String encryption;

    @Column(name = "passphase")
    private String passphase;

    @OneToMany(mappedBy = "wlanGroup")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WLANConfig> wlanConfigs = new HashSet<>();

//    //@Dung Add:
//    private String owner1;
//
//    public String getOwner1() {
//        return owner1;
//    }
//
//    public void setOwner1(String owner1) {
//        this.owner1 = owner1;
//    }

    @ManyToOne
    private User owner;

    public User Owner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public WLANGroup alias(String alias) {
        this.alias = alias;
        return this;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getSsid() {
        return ssid;
    }

    public WLANGroup ssid(String ssid) {
        this.ssid = ssid;
        return this;
    }

    public void setSsid(String ssid) {
        this.ssid = ssid;
    }

    public String getEncryption() {
        return encryption;
    }

    public WLANGroup encryption(String encryption) {
        this.encryption = encryption;
        return this;
    }

    public void setEncryption(String encryption) {
        this.encryption = encryption;
    }

    public String getPassphase() {
        return passphase;
    }

    public WLANGroup passphase(String passphase) {
        this.passphase = passphase;
        return this;
    }

    public void setPassphase(String passphase) {
        this.passphase = passphase;
    }

    public Set<WLANConfig> getWlanConfigs() {
        return wlanConfigs;
    }

    public WLANGroup wlanConfigs(Set<WLANConfig> wLANConfigs) {
        this.wlanConfigs = wLANConfigs;
        return this;
    }

    public WLANGroup addWlanConfig(WLANConfig wLANConfig) {
        this.wlanConfigs.add(wLANConfig);
        wLANConfig.setWlanGroup(this);
        return this;
    }

    public WLANGroup removeWlanConfig(WLANConfig wLANConfig) {
        this.wlanConfigs.remove(wLANConfig);
        wLANConfig.setWlanGroup(null);
        return this;
    }

    public void setWlanConfigs(Set<WLANConfig> wLANConfigs) {
        this.wlanConfigs = wLANConfigs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WLANGroup wLANGroup = (WLANGroup) o;
        if (wLANGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wLANGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WLANGroup{" +
            "id=" + getId() +
            ", alias='" + getAlias() + "'" +
            ", ssid='" + getSsid() + "'" +
            ", encryption='" + getEncryption() + "'" +
            ", passphase='" + getPassphase() + "'" +
            "}";
    }
}
