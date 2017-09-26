package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Hub.
 */
@Entity
@Table(name = "hub")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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
