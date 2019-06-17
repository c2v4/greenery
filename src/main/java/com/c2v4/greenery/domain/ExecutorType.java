package com.c2v4.greenery.domain;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ExecutorType.
 */
@Entity
@Table(name = "executor_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExecutorType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "executorType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExecutorConfig> executorConfigs = new HashSet<>();

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

    public ExecutorType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ExecutorConfig> getExecutorConfigs() {
        return executorConfigs;
    }

    public ExecutorType executorConfigs(Set<ExecutorConfig> executorConfigs) {
        this.executorConfigs = executorConfigs;
        return this;
    }

    public ExecutorType addExecutorConfig(ExecutorConfig executorConfig) {
        this.executorConfigs.add(executorConfig);
        executorConfig.setExecutorType(this);
        return this;
    }

    public ExecutorType removeExecutorConfig(ExecutorConfig executorConfig) {
        this.executorConfigs.remove(executorConfig);
        executorConfig.setExecutorType(null);
        return this;
    }

    public void setExecutorConfigs(Set<ExecutorConfig> executorConfigs) {
        this.executorConfigs = executorConfigs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExecutorType)) {
            return false;
        }
        return id != null && id.equals(((ExecutorType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExecutorType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
