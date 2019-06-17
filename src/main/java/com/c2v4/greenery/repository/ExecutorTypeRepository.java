package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.ExecutorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExecutorType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExecutorTypeRepository extends JpaRepository<ExecutorType, Long> {

}
