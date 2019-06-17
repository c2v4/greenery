package com.c2v4.greenery.domain;


import com.c2v4.greenery.domain.enumeration.Operation;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Numeric.
 */
@Entity
@Table(name = "numeric")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Numeric implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_value")
    private Float value;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    private Operation operation;

    @OneToOne
    @JoinColumn(unique = true)
    private Numeric left;

    @OneToOne
    @JoinColumn(unique = true)
    private Numeric right;

    @OneToOne
    @JoinColumn(unique = true)
    private Label label;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValue() {
        return value;
    }

    public Numeric value(Float value) {
        this.value = value;
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Operation getOperation() {
        return operation;
    }

    public Numeric operation(Operation operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
    }

    public Numeric getLeft() {
        return left;
    }

    public Numeric left(Numeric numeric) {
        this.left = numeric;
        return this;
    }

    public void setLeft(Numeric numeric) {
        this.left = numeric;
    }

    public Numeric getRight() {
        return right;
    }

    public Numeric right(Numeric numeric) {
        this.right = numeric;
        return this;
    }

    public void setRight(Numeric numeric) {
        this.right = numeric;
    }

    public Label getLabel() {
        return label;
    }

    public Numeric label(Label label) {
        this.label = label;
        return this;
    }

    public void setLabel(Label label) {
        this.label = label;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Numeric)) {
            return false;
        }
        return id != null && id.equals(((Numeric) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Numeric{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", operation='" + getOperation() + "'" +
            "}";
    }
}
