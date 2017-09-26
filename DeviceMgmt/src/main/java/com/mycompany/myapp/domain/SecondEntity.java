package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SecondEntity.
 */
@Entity
@Table(name = "second_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SecondEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "second_entityfield_1")
    private String secondEntityfield1;

    @Column(name = "second_entityfield_2")
    private String secondEntityfield2;

    @ManyToOne
    private FirstEntity firstEntity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSecondEntityfield1() {
        return secondEntityfield1;
    }

    public SecondEntity secondEntityfield1(String secondEntityfield1) {
        this.secondEntityfield1 = secondEntityfield1;
        return this;
    }

    public void setSecondEntityfield1(String secondEntityfield1) {
        this.secondEntityfield1 = secondEntityfield1;
    }

    public String getSecondEntityfield2() {
        return secondEntityfield2;
    }

    public SecondEntity secondEntityfield2(String secondEntityfield2) {
        this.secondEntityfield2 = secondEntityfield2;
        return this;
    }

    public void setSecondEntityfield2(String secondEntityfield2) {
        this.secondEntityfield2 = secondEntityfield2;
    }

    public FirstEntity getFirstEntity() {
        return firstEntity;
    }

    public SecondEntity firstEntity(FirstEntity firstEntity) {
        this.firstEntity = firstEntity;
        return this;
    }

    public void setFirstEntity(FirstEntity firstEntity) {
        this.firstEntity = firstEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SecondEntity secondEntity = (SecondEntity) o;
        if (secondEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), secondEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SecondEntity{" +
            "id=" + getId() +
            ", secondEntityfield1='" + getSecondEntityfield1() + "'" +
            ", secondEntityfield2='" + getSecondEntityfield2() + "'" +
            "}";
    }
}
