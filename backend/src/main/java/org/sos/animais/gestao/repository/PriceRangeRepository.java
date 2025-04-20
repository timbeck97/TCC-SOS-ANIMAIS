package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.PriceRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PriceRangeRepository extends JpaRepository<PriceRange, Long> {

    @Query("SELECT p FROM PriceRange p WHERE p.dataFim IS NULL OR CURRENT_DATE between p.dataInicio AND p.dataFim order by id asc")
    List<PriceRange> findAllAtivos();
}
