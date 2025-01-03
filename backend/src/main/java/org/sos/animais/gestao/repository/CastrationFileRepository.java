package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.CastrationFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CastrationFileRepository extends JpaRepository<CastrationFile, Long> {

    CastrationFile findByCastrationRequestId(Long id);
}
