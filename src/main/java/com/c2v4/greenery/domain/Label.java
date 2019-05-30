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
 * A Label.
 */
@Entity
@Table(name = "label")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Label implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne(mappedBy = "label")
    @JsonIgnore
    private SchedulerConfig schedulerConfig;

    @OneToOne(mappedBy = "label")
    @JsonIgnore
    private Numeric numeric;

    @OneToMany(mappedBy = "label")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entry> entries = new HashSet<>();

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

    public Label name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SchedulerConfig getSchedulerConfig() {
        return schedulerConfig;
    }

    public Label schedulerConfig(SchedulerConfig schedulerConfig) {
        this.schedulerConfig = schedulerConfig;
        return this;
    }

    public void setSchedulerConfig(SchedulerConfig schedulerConfig) {
        this.schedulerConfig = schedulerConfig;
    }

    public Numeric getNumeric() {
        return numeric;
    }

    public Label numeric(Numeric numeric) {
        this.numeric = numeric;
        return this;
    }

    public void setNumeric(Numeric numeric) {
        this.numeric = numeric;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Label entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Label addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setLabel(this);
        return this;
    }

    public Label removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setLabel(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Label)) {
            return false;
        }
        return id != null && id.equals(((Label) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Label{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
