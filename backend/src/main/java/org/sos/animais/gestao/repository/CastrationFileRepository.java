package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.CastrationFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CastrationFileRepository extends JpaRepository<CastrationFile, Long> {

    List<CastrationFile> findByCastrationRequestId(Long id);
}
