package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.ExecutorLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExecutorLabel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExecutorLabelRepository extends JpaRepository<ExecutorLabel, Long> {

}
