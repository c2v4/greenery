package com.c2v4.greenery.repository;

import com.c2v4.greenery.domain.Predicate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Predicate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PredicateRepository extends JpaRepository<Predicate, Long> {

}
