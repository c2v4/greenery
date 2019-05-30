package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.Expression;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Expression entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpressionRepository extends JpaRepository<Expression, Long> {

}
