package com.c2v4.greenery.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * A SchedulerConfig.
 */
@Entity
@Table(name = "scheduler_config")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SchedulerConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Label label;

    @OneToMany(mappedBy = "schedulerConfig",fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Property> properties = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("schedulerConfigs")
    private SchedulerType schedulerType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Label getLabel() {
        return label;
    }

    public SchedulerConfig label(Label label) {
        this.label = label;
        return this;
    }

    public void setLabel(Label label) {
        this.label = label;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public SchedulerConfig properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public SchedulerConfig addProperty(Property property) {
        this.properties.add(property);
        property.setSchedulerConfig(this);
        return this;
    }

    public SchedulerConfig removeProperty(Property property) {
        this.properties.remove(property);
        property.setSchedulerConfig(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    public SchedulerType getSchedulerType() {
        return schedulerType;
    }

    public SchedulerConfig schedulerType(SchedulerType schedulerType) {
        this.schedulerType = schedulerType;
        return this;
    }

    public void setSchedulerType(SchedulerType schedulerType) {
        this.schedulerType = schedulerType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Map<String,String> getProps(){
        return properties.stream().collect(Collectors.toMap(Property::getKey, Property::getValue));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SchedulerConfig)) {
            return false;
        }
        return id != null && id.equals(((SchedulerConfig) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SchedulerConfig{" +
            "id=" + getId() +
            ", type='" + getSchedulerType() + "'" +
            ", name='" + getLabel() + "'" +
            ", properties='" + getProperties() + "'" +
            "}";
    }
}
