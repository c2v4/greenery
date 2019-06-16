package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.SchedulerType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SchedulerType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchedulerTypeRepository extends JpaRepository<SchedulerType, Long> {

}