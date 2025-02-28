package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.PriceRange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRangeRepository extends JpaRepository<PriceRange, Long> {
}
