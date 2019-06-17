package com.c2v4.greenery.domain;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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

    @NotNull
    @Column(name = "jhi_type", nullable = false)
    private String type;

    @OneToOne
    @JoinColumn(unique = true)
    private Label label;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "schedulerConfig")
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

    public SchedulerConfig type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
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
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Map<String, String> getProps() {
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
            ", type='" + getType() + "'" +
            "}";
    }
}
