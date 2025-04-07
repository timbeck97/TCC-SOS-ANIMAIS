package org.sos.animais.gestao.repository;

import org.assertj.core.util.DateUtil;
import org.junit.jupiter.api.*;
import org.sos.animais.gestao.enums.*;
import org.sos.animais.gestao.factory.CastrationFactory;
import org.sos.animais.gestao.factory.CastrationRequestFactory;
import org.sos.animais.gestao.factory.PriceRangeFactory;
import org.sos.animais.gestao.model.Castration;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.model.PriceRange;
import org.sos.animais.gestao.service.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CastrationRequestRepositoryTest {

    @Autowired
    private CastrationRequestRepository castrationRequestRepository;
    @Autowired
    private CastrationRepository castrationRepository;
    @Autowired
    private PriceRangeRepository priceRangeRepository;

    List<Castration> castrations;

    @BeforeAll
    void setUp() {
        Castration castration1 = CastrationFactory.create().withSituacao(ERequestSituation.FINALIZADA).withData(Utils.getDate(1,1,2025)).build();
        Castration castration2 = CastrationFactory.create().withSituacao(ERequestSituation.FINALIZADA).withData(Utils.getDate(20,2,2025)).build();
        Castration castration3 = CastrationFactory.create().withSituacao(ERequestSituation.FINALIZADA).withData(Utils.getDate(1,4,2025)).build();
        Castration castration4 = CastrationFactory.create().withSituacao(ERequestSituation.FINALIZADA).withData(Utils.getDate(10,4,2025)).build();
        Castration castration5 = CastrationFactory.create().withSituacao(ERequestSituation.EM_ANDAMENTO).withData(Utils.getDate(8,5,2025)).build();
        castrations = Arrays.asList(castration1, castration2, castration3, castration4, castration5);
        castrations=castrationRepository.saveAll(castrations);
    }

    @Test
    void findAllByCastracaoIsNullAndSituacaoIsOrderByDataSolicitacaoAsc() {
    }

    @Nested
    public class CountAllCastrationsRequest{
        @Test
        void countAll_shouldCountAllCastrationRequests() {
            List<CastrationRequest> solicitacoes = new ArrayList<>();
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.GATO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.GATO).build());
            castrationRequestRepository.saveAll(solicitacoes);

            var result = castrationRequestRepository.countAll();

            assertNotNull(result);
            assertEquals(6, result.getTotal());
            assertEquals(4, result.getTotalDogs());
            assertEquals(2, result.getTotalCats());
        }
        @Test
        void countAll_ignoreCastratedRequests() {
            List<CastrationRequest> solicitacoes = new ArrayList<>();
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.CACHORRO).build());
            solicitacoes.add(getDefault().withTipoAnimal(EAnimalType.GATO).build());
            solicitacoes.add(getDefault().withCastracao(castrations.get(0)).withTipoAnimal(EAnimalType.GATO).build());
            solicitacoes.add(getDefault().withCastracao(castrations.get(0)).withTipoAnimal(EAnimalType.GATO).build());
            solicitacoes.add(getDefault().withCastracao(castrations.get(0)).withTipoAnimal(EAnimalType.CACHORRO).build());
            castrationRequestRepository.saveAll(solicitacoes);

            var result = castrationRequestRepository.countAll();

            assertNotNull(result);
            assertEquals(5, result.getTotal());
            assertEquals(4, result.getTotalDogs());
            assertEquals(1, result.getTotalCats());
        }
    }


    @Nested
    public class CountByDate{

        @Test
        void countByData_shouldCountAllCastrations() {

            CastrationRequest c1 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c2 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c3 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c4 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c5 =  getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c6 =  getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c7 =  getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c8 =  getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c9 =  getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c10 = getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c11 = getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c12 = getDefault().withCastracao(castrations.get(3)).build();
            castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8,c9,c10,c11,c12));


            Date inicio = Utils.getFirstDyByCompetencia("202502");
            Date fim = Utils.getLastDyByCompetencia("202504");
            var result = castrationRequestRepository.countByData(inicio, fim);
            assertNotNull(result);
            Object competencia1  = result.get(0);
            Object[] row1 = (Object[]) competencia1;
            String cpt1 = (String) row1[1];
            Long count = (Long) row1[0];
            assertEquals("202502", cpt1);
            assertEquals(4, count);

            Object competencia2  = result.get(1);
            Object[] row2 = (Object[]) competencia2;
            String cpt2 = (String) row2[1];
            Long count2 = (Long) row2[0];
            assertEquals("202503", cpt2);
            assertEquals(0, count2);

            Object competencia3  = result.get(2);
            Object[] row3 = (Object[]) competencia3;
            String cpt3 = (String) row3[1];
            Long count3 = (Long) row3[0];
            assertEquals("202504", cpt3);
            assertEquals(8, count3);

        }
        @Test
        void countByData_shouldShowEmptyMonths() {

            CastrationRequest c1 =  getDefault().withCastracao(castrations.get(0)).build();
            CastrationRequest c2 =  getDefault().withCastracao(castrations.get(0)).build();
            CastrationRequest c3 =  getDefault().withCastracao(castrations.get(0)).build();
            CastrationRequest c4 =  getDefault().withCastracao(castrations.get(0)).build();
            CastrationRequest c5 =  getDefault().withCastracao(castrations.get(0)).build();
            CastrationRequest c6 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c7 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c8 =  getDefault().withCastracao(castrations.get(1)).build();
            CastrationRequest c9 =  getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c10 = getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c11 = getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c12 = getDefault().withCastracao(castrations.get(2)).build();
            CastrationRequest c13 = getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c14 = getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c15 = getDefault().withCastracao(castrations.get(3)).build();
            CastrationRequest c16 = getDefault().withCastracao(castrations.get(3)).build();
            castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16));


            Date inicio = Utils.getFirstDyByCompetencia("202501");
            Date fim = Utils.getLastDyByCompetencia("202505");
            var result = castrationRequestRepository.countByData(inicio, fim);
            Map<String, Long> values = new HashMap<>();
            assertNotNull(result);
            for (Object object : result) {
                Object[] columns = (Object[]) object;
                Long count = (Long) columns[0];
                String competencia = (String) columns[1];
                values.put(competencia, count);
            }
            assertEquals(5, values.size());
            assertTrue(values.containsKey("202501"));
            assertTrue(values.containsKey("202502"));
            assertTrue(values.containsKey("202503"));
            assertTrue(values.containsKey("202504"));
            assertTrue(values.containsKey("202505"));
            assertEquals(5, values.get("202501"));
            assertEquals(3, values.get("202502"));
            assertEquals(0, values.get("202503"));
            assertEquals(8, values.get("202504"));
            assertEquals(0, values.get("202505"));

        }
        @Test
        void countByData_shouldNotCountInProgressCastrations() {
            CastrationRequest c1 =  getDefault().withCastracao(castrations.get(4)).build();
            CastrationRequest c2 =  getDefault().withCastracao(castrations.get(4)).build();
            CastrationRequest c3 =  getDefault().withCastracao(castrations.get(4)).build();
            CastrationRequest c4 =  getDefault().withCastracao(castrations.get(4)).build();
            CastrationRequest c5 =  getDefault().withCastracao(castrations.get(4)).build();

            castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5));


            Date inicio = Utils.getFirstDyByCompetencia("202502");
            Date fim = Utils.getLastDyByCompetencia("202505");
            var result = castrationRequestRepository.countByData(inicio, fim);
            Map<String, Long> values = new HashMap<>();
            assertNotNull(result);
            for (Object object : result) {
                Object[] columns = (Object[]) object;
                Long count = (Long) columns[0];
                String competencia = (String) columns[1];
                values.put(competencia, count);
            }
            assertEquals(4, values.size());
            assertTrue(values.containsKey("202502"));
            assertTrue(values.containsKey("202503"));
            assertTrue(values.containsKey("202504"));
            assertTrue(values.containsKey("202505"));
            assertEquals(0, values.get("202502"));
            assertEquals(0, values.get("202503"));
            assertEquals(0, values.get("202504"));
            assertEquals(0, values.get("202505"));

        }
    }


   @Nested
   public class countPyPaymentMethod{


       @Test
       void countByPaymentMethod_shouldCountAll() {

           CastrationRequest c1 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c2 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c3 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c4 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(0)).build();
           CastrationRequest c5 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(0)).build();
           CastrationRequest c6 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(0)).build();
           CastrationRequest c7 =  getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(0)).build();
           CastrationRequest c8 =  getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(0)).build();
           CastrationRequest c9 =  getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(0)).build();
           CastrationRequest c10 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(0)).build();
           CastrationRequest c11 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();
           CastrationRequest c12 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();

           //shouldn't appear in the result
           CastrationRequest c13 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c14 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c15 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8,c9,c10,c11,c12,c13,c14,c15));

           var result = castrationRequestRepository.countByPaymentMethod(Utils.getDate(1,1,2025), Utils.getDate(31,4,2025));
           Map<String, Long> values = new HashMap<>();
           assertNotNull(result);
           for (Object object : result) {
               Object[] columns = (Object[]) object;
               Long count = (Long) columns[0];
               String formaPagamento = (String) columns[1];
               values.put(formaPagamento, count);
           }
           assertEquals(3, values.size());
           assertTrue(values.containsKey("CASTRACAO_SOLIDARIA"));
           assertTrue(values.containsKey("DINHEIRO"));
           assertTrue(values.containsKey("PIX"));
           assertEquals(3, values.get("CASTRACAO_SOLIDARIA"));
           assertEquals(3, values.get("DINHEIRO"));
           assertEquals(6, values.get("PIX"));

       }
       @Test
       void countByPaymentMethod_shouldNotCountInProgressCastrations() {

           CastrationRequest c1 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c2 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c3 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c4 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(4)).build();
           CastrationRequest c5 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(4)).build();

           CastrationRequest c13 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c14 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c15 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c13,c14,c15));

           var result = castrationRequestRepository.countByPaymentMethod(Utils.getDate(1,1,2025), Utils.getDate(31,1,2025));
           Map<String, Long> values = new HashMap<>();
           assertNotNull(result);
           for (Object object : result) {
               Object[] columns = (Object[]) object;
               Long count = (Long) columns[0];
               String formaPagamento = (String) columns[1];
               values.put(formaPagamento, count);
           }
           assertEquals(0, values.size());

       }
       @Test
       void countByPaymentMethod_shouldNotCountOffPeriodRecords() {

           CastrationRequest c1 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c2 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c3 =  getDefault().withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(0)).build();
           CastrationRequest c4 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(3)).build();
           CastrationRequest c5 =  getDefault().withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(3)).build();

           CastrationRequest c13 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c14 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c15 = getDefault().withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c13,c14,c15));

           var result = castrationRequestRepository.countByPaymentMethod(Utils.getDate(1,1,2025), Utils.getDate(31,1,2025));
           Map<String, Long> values = new HashMap<>();
           assertNotNull(result);
           for (Object object : result) {
               Object[] columns = (Object[]) object;
               Long count = (Long) columns[0];
               String formaPagamento = (String) columns[1];
               values.put(formaPagamento, count);
           }
           assertEquals(1, values.size());
           assertTrue(values.containsKey("CASTRACAO_SOLIDARIA"));
           assertEquals(3, values.get("CASTRACAO_SOLIDARIA"));
       }
   }

   @Nested
   public class SumPaymentPercent{
       @Test
       void sumPaymentPercent_shouldSumAll() {

           PriceRange p1= PriceRangeFactory.init().withValor(100.0).withDescricao("50-100").build();
           PriceRange p2= PriceRangeFactory.init().withValor(150.0).withDescricao("50-100").build();

           priceRangeRepository.saveAll(Arrays.asList(p1, p2));

           CastrationRequest c1 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(1)).build();
           CastrationRequest c2 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(1)).build();
           CastrationRequest c3 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(1)).build();
           CastrationRequest c4 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(1)).build();
           CastrationRequest c5 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(1)).build();
           CastrationRequest c6 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(1)).build();
           CastrationRequest c7 =  getDefault().withFaixapreco(p2).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();
           CastrationRequest c8 =  getDefault().withFaixapreco(p2).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();
           CastrationRequest c9 =  getDefault().withFaixapreco(p2).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();
           CastrationRequest c10 = getDefault().withFaixapreco(p2).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(1)).build();
           //shouldn't appear in the result
           CastrationRequest c11 = getDefault().withFaixapreco(p2).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(4)).build();
           CastrationRequest c12 = getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.PIX).withCastracao(castrations.get(4)).build();
           CastrationRequest c13 = getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c14 = getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           CastrationRequest c15 = getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.PIX).withCastracao(null).build();
           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8,c9,c10,c11,c12,c13,c14,c15));

           var result = castrationRequestRepository.sumPaymentPercent(Utils.getDate(10,2,2025), Utils.getDate(25,2,2025));

           assertNotNull(result);

           Object[] columns = (Object[]) result.get(0);
           double valorSos=((Number) columns[0]).doubleValue();
           double valorPopulacao= ((Number) columns[1]).doubleValue();
           double total= ((Number) columns[2]).doubleValue();
           assertEquals(300.0, valorSos);
           assertEquals(900.0, valorPopulacao);
           assertEquals(1200.0, total);

       }
       @Test
       void sumPaymentPercent_shouldNotSumWaitingCastrations() {

           PriceRange p1= PriceRangeFactory.init().withValor(100.0).withDescricao("50-100").build();
           PriceRange p2= PriceRangeFactory.init().withValor(150.0).withDescricao("50-100").build();

           priceRangeRepository.saveAll(Arrays.asList(p1, p2));

           CastrationRequest c1 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(null).build();
           CastrationRequest c2 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(null).build();
           CastrationRequest c3 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(null).build();
           CastrationRequest c4 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(null).build();

           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4));

           var result = castrationRequestRepository.sumPaymentPercent(Utils.getDate(10,2,2025), Utils.getDate(25,2,2025));

           assertNotNull(result);

           Object[] columns = (Object[]) result.get(0);
           double valorSos=((Number) columns[0]).doubleValue();
           double valorPopulacao= ((Number) columns[1]).doubleValue();
           double total= ((Number) columns[2]).doubleValue();
           assertEquals(0, valorSos);
           assertEquals(0, valorPopulacao);
           assertEquals(0, total);

       }
       @Test
       void sumPaymentPercent_shouldNotSumInProgressCastrations() {

           PriceRange p1= PriceRangeFactory.init().withValor(100.0).withDescricao("50-100").build();
           PriceRange p2= PriceRangeFactory.init().withValor(150.0).withDescricao("50-100").build();
           priceRangeRepository.saveAll(Arrays.asList(p1, p2));
           CastrationRequest c1 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c2 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c3 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.CASTRACAO_SOLIDARIA).withCastracao(castrations.get(4)).build();
           CastrationRequest c4 =  getDefault().withFaixapreco(p1).withFormaPagamento(EPaymentMethod.DINHEIRO).withCastracao(castrations.get(4)).build();

           castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4));

           var result = castrationRequestRepository.sumPaymentPercent(Utils.getDate(1,1,2025), Utils.getDate(25,10,2025));

           assertNotNull(result);
           Object[] columns = (Object[]) result.get(0);
           double valorSos=((Number) columns[0]).doubleValue();
           double valorPopulacao= ((Number) columns[1]).doubleValue();
           double total= ((Number) columns[2]).doubleValue();
           assertEquals(0, valorSos);
           assertEquals(0, valorPopulacao);
           assertEquals(0, total);

       }
   }

  @Nested
  public class CountTotalCards{
      @Test
      void countTotalCards_shouldCountAllAnimals() {
            CastrationRequest c1 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(10,12,2024)).withCastracao(castrations.get(0)).build(); // average 22 days
            CastrationRequest c2 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(11,12,2024)).withCastracao(castrations.get(0)).build(); // average 21 days
            CastrationRequest c3 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(12,12,2024)).withCastracao(castrations.get(0)).build(); // average 20 days
            CastrationRequest c4 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(13,12,2024)).withCastracao(castrations.get(0)).build(); // average 19 days
            CastrationRequest c5 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(15,12,2024)).withCastracao(castrations.get(0)).build(); // average 17 days

            CastrationRequest c6 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(1,1,2025)).withCastracao(castrations.get(1)).build(); //average 50 days
            CastrationRequest c7 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(3,1,2025)).withCastracao(castrations.get(1)).build(); //average 48 days
            CastrationRequest c8 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(5,1,2025)).withCastracao(castrations.get(1)).build(); //average 46 days

            castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8));

            var result = castrationRequestRepository.countTotalCards(Utils.getDate(1,1,2025), Utils.getDate(28,2,2025));
            assertNotNull(result);
            Object[] columns = (Object[]) result;
            long totalDogs = ((Number) columns[0]).longValue();
            long totalCats = ((Number) columns[1]).longValue();
            long totalAnimals = ((Number) columns[2]).longValue();
            double averageDays = ((Number) columns[3]).doubleValue();
            assertEquals(5, totalDogs);
            assertEquals(3, totalCats);
            assertEquals(8, totalAnimals);
            assertEquals(30.375, averageDays);

      }
      @Test
      void countTotalCards_shouldNotCountInProgressCastration() {


          CastrationRequest c6 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(1,1,2025)).withCastracao(castrations.get(4)).build();
          CastrationRequest c7 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(3,1,2025)).withCastracao(castrations.get(4)).build();
          CastrationRequest c8 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(5,1,2025)).withCastracao(castrations.get(4)).build();

          castrationRequestRepository.saveAll(Arrays.asList(c6,c7,c8));

          var result = castrationRequestRepository.countTotalCards(Utils.getDate(1,5,2025), Utils.getDate(30,5,2025));
          assertNotNull(result);
          Object[] columns = (Object[]) result;
          long totalDogs = ((Number) columns[0]).longValue();
          long totalCats = ((Number) columns[1]).longValue();
          long totalAnimals = ((Number) columns[2]).longValue();
          double averageDays = ((Number) columns[3]).doubleValue();
          assertEquals(0, totalDogs);
          assertEquals(0, totalCats);
          assertEquals(0, totalAnimals);
          assertEquals(0, averageDays);

      }
      @Test
      void countTotalCards_shouldCountOffPeriodRecords() {
          CastrationRequest c1 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(10,12,2024)).withCastracao(castrations.get(0)).build(); // average 22 days
          CastrationRequest c2 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(11,12,2024)).withCastracao(castrations.get(0)).build(); // average 21 days
          CastrationRequest c3 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(12,12,2024)).withCastracao(castrations.get(0)).build(); // average 20 days
          CastrationRequest c4 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(13,12,2024)).withCastracao(castrations.get(0)).build(); // average 19 days
          CastrationRequest c5 =  getDefault().withTipoAnimal(EAnimalType.GATO).withDataSolicitacao(Utils.getDate(15,12,2024)).withCastracao(castrations.get(0)).build(); // average 17 days

          CastrationRequest c6 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(1,1,2025)).withCastracao(castrations.get(4)).build();
          CastrationRequest c7 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(3,1,2025)).withCastracao(castrations.get(4)).build();
          CastrationRequest c8 =  getDefault().withTipoAnimal(EAnimalType.CACHORRO).withDataSolicitacao(Utils.getDate(5,1,2025)).withCastracao(castrations.get(4)).build();

          castrationRequestRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6,c7,c8));

          var result = castrationRequestRepository.countTotalCards(Utils.getDate(1,1,2025), Utils.getDate(28,2,2025));
          assertNotNull(result);
          Object[] columns = (Object[]) result;
          long totalDogs = ((Number) columns[0]).longValue();
          long totalCats = ((Number) columns[1]).longValue();
          long totalAnimals = ((Number) columns[2]).longValue();
          double averageDays = ((Number) columns[3]).doubleValue();
          assertEquals(2, totalDogs);
          assertEquals(3, totalCats);
          assertEquals(5, totalAnimals);
          assertEquals(19,8, averageDays);

      }
  }


    public CastrationRequestFactory getDefault(){
        return CastrationRequestFactory.init()
                .withNome("Teste")
                .withSobrenome("Teste")
                .withCpf("04263284005")
                .withRua("Rua Teste")
                .withBairro("Bairro Teste")
                .withNumero("123")
                .withTelefone("123456789")
                .withNomeAnimal("Teste")
                .withPorteAnimal(EAnimalSize.MEDIO)
                .withGeneroAnimal(EAnimalGender.MACHO)
                .withRacaAnimal("SRD")
                .withTipoAnimal(EAnimalType.CACHORRO)
                .withSituacao(ERequestSituation.AGUARDANDO)
                .withDataSolicitacao(new Date());
    }
}