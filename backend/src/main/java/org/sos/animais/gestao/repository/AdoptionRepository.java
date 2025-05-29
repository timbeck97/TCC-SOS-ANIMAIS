package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRepository extends JpaRepository<AdoptionAnimal, Long> {

    List<AdoptionAnimal> findAllBySituacaoOrderByIdAsc(EAdoptionSituation situacao);
}
