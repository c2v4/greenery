package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.ExecutorConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExecutorConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExecutorConfigRepository extends JpaRepository<ExecutorConfig, Long> {

}
