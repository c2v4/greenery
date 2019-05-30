package com.c2v4.greenery.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.c2v4.greenery.domain.enumeration.PredicateLogic;

/**
 * A Predicate.
 */
@Entity
@Table(name = "predicate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Predicate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "predicate_logic", nullable = false)
    private PredicateLogic predicateLogic;

    @OneToOne
    @JoinColumn(unique = true)
    private Expression expression;

    @OneToMany(mappedBy = "predicate")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Predicate> predicates = new HashSet<>();

    @OneToOne(mappedBy = "predicate")
    @JsonIgnore
    private Rule rule;

    @ManyToOne
    @JsonIgnoreProperties("predicates")
    private Predicate predicate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PredicateLogic getPredicateLogic() {
        return predicateLogic;
    }

    public Predicate predicateLogic(PredicateLogic predicateLogic) {
        this.predicateLogic = predicateLogic;
        return this;
    }

    public void setPredicateLogic(PredicateLogic predicateLogic) {
        this.predicateLogic = predicateLogic;
    }

    public Expression getExpression() {
        return expression;
    }

    public Predicate expression(Expression expression) {
        this.expression = expression;
        return this;
    }

    public void setExpression(Expression expression) {
        this.expression = expression;
    }

    public Set<Predicate> getPredicates() {
        return predicates;
    }

    public Predicate predicates(Set<Predicate> predicates) {
        this.predicates = predicates;
        return this;
    }

    public Predicate addPredicate(Predicate predicate) {
        this.predicates.add(predicate);
        predicate.setPredicate(this);
        return this;
    }

    public Predicate removePredicate(Predicate predicate) {
        this.predicates.remove(predicate);
        predicate.setPredicate(null);
        return this;
    }

    public void setPredicates(Set<Predicate> predicates) {
        this.predicates = predicates;
    }

    public Rule getRule() {
        return rule;
    }

    public Predicate rule(Rule rule) {
        this.rule = rule;
        return this;
    }

    public void setRule(Rule rule) {
        this.rule = rule;
    }

    public Predicate getPredicate() {
        return predicate;
    }

    public Predicate predicate(Predicate predicate) {
        this.predicate = predicate;
        return this;
    }

    public void setPredicate(Predicate predicate) {
        this.predicate = predicate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Predicate)) {
            return false;
        }
        return id != null && id.equals(((Predicate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Predicate{" +
            "id=" + getId() +
            ", predicateLogic='" + getPredicateLogic() + "'" +
            "}";
    }
}
