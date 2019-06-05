package com.c2v4.greenery.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SchedulerType.
 */
@Entity
@Table(name = "scheduler_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SchedulerType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "schedulerType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SchedulerConfig> schedulerConfigs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SchedulerType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SchedulerConfig> getSchedulerConfigs() {
        return schedulerConfigs;
    }

    public SchedulerType schedulerConfigs(Set<SchedulerConfig> schedulerConfigs) {
        this.schedulerConfigs = schedulerConfigs;
        return this;
    }

    public SchedulerType addSchedulerConfig(SchedulerConfig schedulerConfig) {
        this.schedulerConfigs.add(schedulerConfig);
        schedulerConfig.setSchedulerType(this);
        return this;
    }

    public SchedulerType removeSchedulerConfig(SchedulerConfig schedulerConfig) {
        this.schedulerConfigs.remove(schedulerConfig);
        schedulerConfig.setSchedulerType(null);
        return this;
    }

    public void setSchedulerConfigs(Set<SchedulerConfig> schedulerConfigs) {
        this.schedulerConfigs = schedulerConfigs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SchedulerType)) {
            return false;
        }
        return id != null && id.equals(((SchedulerType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SchedulerType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
