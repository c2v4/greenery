package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.Numeric;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Numeric entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NumericRepository extends JpaRepository<Numeric, Long> {

}
