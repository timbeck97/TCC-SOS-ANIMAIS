package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.Castration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CastrationRepository extends JpaRepository<Castration, Long> {
}
