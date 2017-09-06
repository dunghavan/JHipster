package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A WLANConfig.
 */
@Entity
@Table(name = "wlan_config")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WLANConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alias")
    private String alias;

    @Column(name = "chanel")
    private Integer chanel;

    @Column(name = "max_assoc")
    private Integer maxAssoc;

    @Column(name = "ht_mode")
    private String htMode;

    @Column(name = "tx_power")
    private Integer txPower;

    @Column(name = "max_inactivity")
    private Integer maxInactivity;

    @ManyToOne
    private WLANGroup wlanGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public WLANConfig alias(String alias) {
        this.alias = alias;
        return this;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Integer getChanel() {
        return chanel;
    }

    public WLANConfig chanel(Integer chanel) {
        this.chanel = chanel;
        return this;
    }

    public void setChanel(Integer chanel) {
        this.chanel = chanel;
    }

    public Integer getMaxAssoc() {
        return maxAssoc;
    }

    public WLANConfig maxAssoc(Integer maxAssoc) {
        this.maxAssoc = maxAssoc;
        return this;
    }

    public void setMaxAssoc(Integer maxAssoc) {
        this.maxAssoc = maxAssoc;
    }

    public String getHtMode() {
        return htMode;
    }

    public WLANConfig htMode(String htMode) {
        this.htMode = htMode;
        return this;
    }

    public void setHtMode(String htMode) {
        this.htMode = htMode;
    }

    public Integer getTxPower() {
        return txPower;
    }

    public WLANConfig txPower(Integer txPower) {
        this.txPower = txPower;
        return this;
    }

    public void setTxPower(Integer txPower) {
        this.txPower = txPower;
    }

    public Integer getMaxInactivity() {
        return maxInactivity;
    }

    public WLANConfig maxInactivity(Integer maxInactivity) {
        this.maxInactivity = maxInactivity;
        return this;
    }

    public void setMaxInactivity(Integer maxInactivity) {
        this.maxInactivity = maxInactivity;
    }

    public WLANGroup getWlanGroup() {
        return wlanGroup;
    }

    public WLANConfig wlanGroup(WLANGroup wLANGroup) {
        this.wlanGroup = wLANGroup;
        return this;
    }

    public void setWlanGroup(WLANGroup wLANGroup) {
        this.wlanGroup = wLANGroup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WLANConfig wLANConfig = (WLANConfig) o;
        if (wLANConfig.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wLANConfig.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WLANConfig{" +
            "id=" + getId() +
            ", alias='" + getAlias() + "'" +
            ", chanel='" + getChanel() + "'" +
            ", maxAssoc='" + getMaxAssoc() + "'" +
            ", htMode='" + getHtMode() + "'" +
            ", txPower='" + getTxPower() + "'" +
            ", maxInactivity='" + getMaxInactivity() + "'" +
            "}";
    }
}
