package com.c2v4.greenery.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.c2v4.greenery.domain.enumeration.ExpressionLogic;

/**
 * A Expression.
 */
@Entity
@Table(name = "expression")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Expression implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "exression_logic")
    private ExpressionLogic exressionLogic;

    @OneToOne
    @JoinColumn(unique = true)
    private Numeric left;

    @OneToOne
    @JoinColumn(unique = true)
    private Numeric right;

    @OneToOne(mappedBy = "expression")
    @JsonIgnore
    private Predicate predicate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExpressionLogic getExressionLogic() {
        return exressionLogic;
    }

    public Expression exressionLogic(ExpressionLogic exressionLogic) {
        this.exressionLogic = exressionLogic;
        return this;
    }

    public void setExressionLogic(ExpressionLogic exressionLogic) {
        this.exressionLogic = exressionLogic;
    }

    public Numeric getLeft() {
        return left;
    }

    public Expression left(Numeric numeric) {
        this.left = numeric;
        return this;
    }

    public void setLeft(Numeric numeric) {
        this.left = numeric;
    }

    public Numeric getRight() {
        return right;
    }

    public Expression right(Numeric numeric) {
        this.right = numeric;
        return this;
    }

    public void setRight(Numeric numeric) {
        this.right = numeric;
    }

    public Predicate getPredicate() {
        return predicate;
    }

    public Expression predicate(Predicate predicate) {
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
        if (!(o instanceof Expression)) {
            return false;
        }
        return id != null && id.equals(((Expression) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expression{" +
            "id=" + getId() +
            ", exressionLogic='" + getExressionLogic() + "'" +
            "}";
    }
}
