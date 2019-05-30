package com.c2v4.greenery.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Rule.
 */
@Entity
@Table(name = "rule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Predicate predicate;

    @OneToOne
    @JoinColumn(unique = true)
    private Numeric value;

    @OneToOne
    @JoinColumn(unique = true)
    private ExecutorLabel executor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Predicate getPredicate() {
        return predicate;
    }

    public Rule predicate(Predicate predicate) {
        this.predicate = predicate;
        return this;
    }

    public void setPredicate(Predicate predicate) {
        this.predicate = predicate;
    }

    public Numeric getValue() {
        return value;
    }

    public Rule value(Numeric numeric) {
        this.value = numeric;
        return this;
    }

    public void setValue(Numeric numeric) {
        this.value = numeric;
    }

    public ExecutorLabel getExecutor() {
        return executor;
    }

    public Rule executor(ExecutorLabel executorLabel) {
        this.executor = executorLabel;
        return this;
    }

    public void setExecutor(ExecutorLabel executorLabel) {
        this.executor = executorLabel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rule)) {
            return false;
        }
        return id != null && id.equals(((Rule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            "}";
    }
}
