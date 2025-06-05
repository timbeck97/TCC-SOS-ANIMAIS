package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalType;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AdoptionRepository extends JpaRepository<AdoptionAnimal, Long> {
    @Query("SELECT new org.sos.animais.gestao.dto.AdoptionAnimalDto(a) FROM AdoptionAnimal a WHERE " +
            "(:tipoAnimal IS NULL OR a.tipoAnimal = :tipoAnimal) AND " +
            "(:genero IS NULL OR a.genero = :genero) AND " +
            "(:situacaoAdocao IS NULL OR a.situacao = :situacaoAdocao) " +
            "ORDER BY a.id ASC")
    Page findAllFiltered(@Param("tipoAnimal") EAnimalType tipoAnimal, @Param("genero") EAnimalGender genero, @Param("situacaoAdocao") EAdoptionSituation situacaoAdocao, Pageable page);

    @Query("SELECT new org.sos.animais.gestao.dto.AdoptionAnimalDto(a) FROM AdoptionAnimal a WHERE a.situacao = :situacao ORDER BY a.id ASC")
    List<AdoptionAnimalDto> findAllBySituacaoOrderByIdAsc(@Param("situacao") EAdoptionSituation situacao);
}
