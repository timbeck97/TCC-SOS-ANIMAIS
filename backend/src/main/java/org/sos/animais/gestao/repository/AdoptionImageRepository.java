package org.sos.animais.gestao.repository;

import jakarta.transaction.Transactional;
import org.sos.animais.gestao.model.AdoptionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface AdoptionImageRepository extends JpaRepository<AdoptionImage, Long>{
    @Transactional
    @Modifying
    void deleteByAdoptionId(Long id);
}
