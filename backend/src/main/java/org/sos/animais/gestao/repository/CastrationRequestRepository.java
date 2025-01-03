package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.model.CastrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CastrationRequestRepository extends JpaRepository<CastrationRequest, Long> {

    @Query("SELECT new org.sos.animais.gestao.dto.CastrationRequestDto(c) FROM CastrationRequest c")
    List<CastrationRequestDto> findAllDto();

    List<CastrationRequest> findAllByCastracaoIsNullAndSituacaoIs(ERequestSituation situacao);
}
