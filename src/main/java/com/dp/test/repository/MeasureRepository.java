package com.dp.test.repository;

import com.dp.test.domain.Measure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Measure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureRepository extends JpaRepository<Measure, Long> {}
