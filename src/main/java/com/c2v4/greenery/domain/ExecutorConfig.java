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
 * A ExecutorConfig.
 */
@Entity
@Table(name = "executor_config")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExecutorConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @OneToOne
    @JoinColumn(unique = true)
    private ExecutorLabel executorLabel;

    @OneToMany(mappedBy = "executorConfig")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Property> properties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public ExecutorConfig type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ExecutorLabel getExecutorLabel() {
        return executorLabel;
    }

    public ExecutorConfig executorLabel(ExecutorLabel executorLabel) {
        this.executorLabel = executorLabel;
        return this;
    }

    public void setExecutorLabel(ExecutorLabel executorLabel) {
        this.executorLabel = executorLabel;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public ExecutorConfig properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public ExecutorConfig addProperty(Property property) {
        this.properties.add(property);
        property.setExecutorConfig(this);
        return this;
    }

    public ExecutorConfig removeProperty(Property property) {
        this.properties.remove(property);
        property.setExecutorConfig(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExecutorConfig)) {
            return false;
        }
        return id != null && id.equals(((ExecutorConfig) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExecutorConfig{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
