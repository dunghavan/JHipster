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
 * A FirstEntity.
 */
@Entity
@Table(name = "first_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FirstEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_entityfield_1")
    private String firstEntityfield1;

    @Column(name = "first_entityfield_2")
    private String firstEntityfield2;

    @OneToMany(mappedBy = "firstEntity")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SecondEntity> secondEntities = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstEntityfield1() {
        return firstEntityfield1;
    }

    public FirstEntity firstEntityfield1(String firstEntityfield1) {
        this.firstEntityfield1 = firstEntityfield1;
        return this;
    }

    public void setFirstEntityfield1(String firstEntityfield1) {
        this.firstEntityfield1 = firstEntityfield1;
    }

    public String getFirstEntityfield2() {
        return firstEntityfield2;
    }

    public FirstEntity firstEntityfield2(String firstEntityfield2) {
        this.firstEntityfield2 = firstEntityfield2;
        return this;
    }

    public void setFirstEntityfield2(String firstEntityfield2) {
        this.firstEntityfield2 = firstEntityfield2;
    }

    public Set<SecondEntity> getSecondEntities() {
        return secondEntities;
    }

    public FirstEntity secondEntities(Set<SecondEntity> secondEntities) {
        this.secondEntities = secondEntities;
        return this;
    }

    public FirstEntity addSecondEntity(SecondEntity secondEntity) {
        this.secondEntities.add(secondEntity);
        secondEntity.setFirstEntity(this);
        return this;
    }

    public FirstEntity removeSecondEntity(SecondEntity secondEntity) {
        this.secondEntities.remove(secondEntity);
        secondEntity.setFirstEntity(null);
        return this;
    }

    public void setSecondEntities(Set<SecondEntity> secondEntities) {
        this.secondEntities = secondEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FirstEntity firstEntity = (FirstEntity) o;
        if (firstEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), firstEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FirstEntity{" +
            "id=" + getId() +
            ", firstEntityfield1='" + getFirstEntityfield1() + "'" +
            ", firstEntityfield2='" + getFirstEntityfield2() + "'" +
            "}";
    }
}
