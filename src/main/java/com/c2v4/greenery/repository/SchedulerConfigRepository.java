package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.SchedulerConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SchedulerConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchedulerConfigRepository extends JpaRepository<SchedulerConfig, Long> {

}
