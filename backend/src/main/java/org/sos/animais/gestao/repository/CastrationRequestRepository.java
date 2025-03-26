package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.dto.CastrationRequestTotalDto;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.model.CastrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CastrationRequestRepository extends JpaRepository<CastrationRequest, Long> {


    List<CastrationRequest> findAllByCastracaoIsNullAndSituacaoIsOrderByDataSolicitacaoAsc(ERequestSituation situacao);

    @Query("SELECT new org.sos.animais.gestao.dto.CastrationRequestTotalDto(count(*), count(case when c.tipoAnimal = 'CACHORRO' then 1  end) as dogs, count(case when c.tipoAnimal = 'GATO' then 1 end) as cats) FROM CastrationRequest c where c.castracao is null")
    CastrationRequestTotalDto countAll();

    @Query(value = "WITH competencias_cte AS (" +
            "  SELECT TO_CHAR(generate_series(:startDate, :endDate, '1 month'::INTERVAL), 'YYYYMM') AS competencia" +
            ") " +
            " SELECT count(ct), aux.competencia " +
            " FROM castration_request c inner join castration ct on ct.id=c.castracao_id and ct.situacao='FINALIZADA' and ct.data BETWEEN :startDate AND :endDate" +
            " RIGHT JOIN competencias_cte aux on aux.competencia=to_char(ct.data,'YYYYMM') " +
            " GROUP BY 2 " +
            " ORDER BY 2 ASC", nativeQuery = true)
    List<Object> countByData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT count(1), forma_pagamento FROM castration_request c " +
            " INNER JOIN castration ct on ct.id=c.castracao_id " +
            " WHERE ct.data BETWEEN :startDate AND :endDate AND ct                                                                                                                                  .situacao='FINALIZADA' " +
            " GROUP BY 2", nativeQuery = true)
    List<Object> countByPaymentMethod(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT COALESCE(SUM(CASE WHEN cr.forma_pagamento='CASTRACAO_SOLIDARIA' then p.valor else 0.0 end),0) as valorSos," +
            " COALESCE(SUM(CASE WHEN cr.forma_pagamento<>'CASTRACAO_SOLIDARIA' then p.valor else 0.0 end),0) as valorPopulacao ," +
            " COALESCE(sum(p.valor), 0) as total " +
            " from castration_request cr INNER JOIN price_range p on p.id=cr.faixa_preco_id " +
            " INNER JOIN castration c on c.id=cr.castracao_id " +
            " WHERE c.data BETWEEN :startDate AND :endDate AND c.situacao='FINALIZADA'"
            , nativeQuery = true)
    List<Object> sumPaymentPercent(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT COALESCE(SUM(CASE WHEN c.tipo_animal='CACHORRO' then 1 else 0 END),0), " +
            " COALESCE(SUM(CASE WHEN c.tipo_animal='GATO' then 1 else 0 END),0)," +
            " COALESCE(COUNT(1),0), " +
            " COALESCE(AVG(EXTRACT(DAY FROM (ct.data - c.data_solicitacao))),0)" +
            " FROM castration_request c " +
            " INNER JOIN castration ct on ct.id=c.castracao_id " +
            " WHERE ct.situacao='FINALIZADA' and ct.data BETWEEN :startDate AND :endDate ", nativeQuery = true)
    Object countTotalCards(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
