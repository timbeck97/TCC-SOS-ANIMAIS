package org.sos.animais.gestao.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.enums.*;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.model.PriceRange;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.sos.animais.gestao.repository.PriceRangeRepository;
import org.sos.animais.gestao.service.file.FileService;
import org.sos.animais.gestao.service.telegram.TelegramBot;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CastrationServiceTest {


    @InjectMocks
    private CastrationService castrationService;

    @Mock
    private CastrationRequestRepository castrationRequestRepository;

    @Mock
    private PriceRangeRepository priceRangeRepository;

    @Mock
    private FileService fileService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private TelegramBot telegramBot;

    @Captor
    private ArgumentCaptor<CastrationRequest> castrationRequestCapture;


    @Test
    void testSaveCastrationRequest_NewRequest() {

        CastrationRequestDto dto = new CastrationRequestDto();
        dto.setNome("Teste");
        dto.setSobrenome("Teste 2");
        dto.setCpf("12345678901");
        dto.setTelefone("123456789");
        dto.setRua("Rua Teste");
        dto.setBairro("Bairro Teste");
        dto.setNumero("123");
        dto.setTipoAnimal(EAnimalType.CACHORRO);
        dto.setNomeAnimal("Rex");
        dto.setRacaAnimal("SRD");
        dto.setPesoAnimal(10.0);
        dto.setPorteAnimal(EAnimalSize.MEDIO);
        dto.setDescricaoAnimal("Animal de teste");
        dto.setAnimalVacinado(true);
        dto.setFormaPagamento(EPaymentMethod.PIX);
        dto.setObservacoes("Observações de teste");
        dto.setGeneroAnimal(EAnimalGender.MACHO);
        dto.setIdFaixa(1L);


        PriceRange faixa = new PriceRange();
        faixa.setId(1L);

        MultipartFile file = Mockito.mock(MultipartFile.class);

        Mockito.when(priceRangeRepository.findById(1L)).thenReturn(Optional.of(faixa));
        Mockito.when(castrationRequestRepository.save(Mockito.any(CastrationRequest.class))).thenReturn(new CastrationRequest());
        Mockito.when(castrationRequestRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new CastrationRequest()));

        CastrationRequestDto result = castrationService.saveCastrationRequest(dto, null, file);

        Mockito.verify(castrationRequestRepository).save(castrationRequestCapture.capture()); // Captura o argumento
        CastrationRequest captured = castrationRequestCapture.getValue();
        assertEquals(dto.getNome(), captured.getNome());
        assertEquals(dto.getSobrenome(), captured.getSobrenome());
        assertEquals(dto.getCpf(), captured.getCpf());
        assertEquals(dto.getTelefone(), captured.getTelefone());
        assertEquals(dto.getRua(), captured.getRua());
        assertEquals(dto.getBairro(), captured.getBairro());
        assertEquals(dto.getNumero(), captured.getNumero());
        assertEquals(dto.getTipoAnimal(), captured.getTipoAnimal());
        assertEquals(dto.getNomeAnimal(), captured.getNomeAnimal());
        assertEquals(dto.getRacaAnimal(), captured.getRacaAnimal());
        assertEquals(dto.getPesoAnimal(), captured.getPesoAnimal());
        assertEquals(dto.getPorteAnimal(), captured.getPorteAnimal());
        assertEquals(dto.getDescricaoAnimal(), captured.getDescricaoAnimal());
        assertEquals(dto.isAnimalVacinado(), captured.isAnimalVacinado());
        assertEquals(dto.getFormaPagamento(), captured.getFormaPagamento());
        assertEquals(dto.getObservacoes(), captured.getObservacoes());
        assertEquals(dto.getGeneroAnimal(), captured.getGeneroAnimal());
        assertEquals(dto.getIdFaixa(), captured.getFaixaPreco().getId());
        assertNotNull(result);

        Mockito.verify(fileService).uploadFileCastrationRequest(Mockito.eq(file), Mockito.eq(Constantes.CASTRATION_FOLDER), Mockito.any(), Mockito.eq(EFileType.FOTO));
        Mockito.verify(notificationService).createNotification(Mockito.eq(ENotification.CASTRATION_REQUEST_CREATED), Mockito.anyString());

    }
    @Test
    void testSaveCastrationRequest_UpdateRequest() {

        CastrationRequestDto dto = new CastrationRequestDto();
        dto.setNome("Teste");
        dto.setSobrenome("Teste 2");
        dto.setCpf("12345678901");
        dto.setTelefone("123456789");
        dto.setRua("Rua Teste");
        dto.setBairro("Bairro Teste");
        dto.setNumero("123");
        dto.setTipoAnimal(EAnimalType.CACHORRO);
        dto.setNomeAnimal("Rex");
        dto.setRacaAnimal("SRD");
        dto.setPesoAnimal(10.0);
        dto.setPorteAnimal(EAnimalSize.MEDIO);
        dto.setDescricaoAnimal("Animal de teste");
        dto.setAnimalVacinado(true);
        dto.setFormaPagamento(EPaymentMethod.PIX);
        dto.setObservacoes("Observações de teste");
        dto.setGeneroAnimal(EAnimalGender.MACHO);
        dto.setIdFaixa(1L);


        PriceRange faixa = new PriceRange();
        faixa.setId(1L);
        PriceRange faixa2 = new PriceRange();
        faixa2.setId(2L);

        CastrationRequest existingRequest = new CastrationRequest();
        existingRequest.setNome("Teste ALTERADO");
        existingRequest.setSobrenome("Teste 2 ALTERADO");
        existingRequest.setCpf("99999999999");
        existingRequest.setTelefone("99999999");
        existingRequest.setRua("Rua Teste ALTERADO");
        existingRequest.setBairro("Bairro Teste ALTERADO");
        existingRequest.setNumero("999");
        existingRequest.setTipoAnimal(EAnimalType.GATO);
        existingRequest.setNomeAnimal("Rex ALTERADO");
        existingRequest.setRacaAnimal("SRD ALTERADO");
        existingRequest.setPesoAnimal(20.0);
        existingRequest.setPorteAnimal(EAnimalSize.GRANDE);
        existingRequest.setDescricaoAnimal("Animal de teste ALTERADO");
        existingRequest.setAnimalVacinado(false);
        existingRequest.setFormaPagamento(EPaymentMethod.DINHEIRO);
        existingRequest.setObservacoes("Observações de teste ALTERADO");
        existingRequest.setGeneroAnimal(EAnimalGender.FEMEA);
        existingRequest.setId(1L);
        existingRequest.setFaixaPreco(faixa2);

        MultipartFile file = Mockito.mock(MultipartFile.class);
        Mockito.when(priceRangeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(faixa));
        Mockito.when(castrationRequestRepository.findById(1L)).thenReturn(Optional.of(existingRequest));
        Mockito.when(castrationRequestRepository.save(Mockito.any(CastrationRequest.class))).thenReturn(existingRequest);

        CastrationRequestDto result = castrationService.saveCastrationRequest(dto, 1L, file);
        Mockito.verify(castrationRequestRepository).save(castrationRequestCapture.capture()); // Captura o argumento
        CastrationRequest captured = castrationRequestCapture.getValue();
        assertEquals(dto.getNome(), captured.getNome());
        assertEquals(dto.getSobrenome(), captured.getSobrenome());
        assertEquals(dto.getCpf(), captured.getCpf());
        assertEquals(dto.getTelefone(), captured.getTelefone());
        assertEquals(dto.getRua(), captured.getRua());
        assertEquals(dto.getBairro(), captured.getBairro());
        assertEquals(dto.getNumero(), captured.getNumero());
        assertEquals(dto.getTipoAnimal(), captured.getTipoAnimal());
        assertEquals(dto.getNomeAnimal(), captured.getNomeAnimal());
        assertEquals(dto.getRacaAnimal(), captured.getRacaAnimal());
        assertEquals(dto.getPesoAnimal(), captured.getPesoAnimal());
        assertEquals(dto.getPorteAnimal(), captured.getPorteAnimal());
        assertEquals(dto.getDescricaoAnimal(), captured.getDescricaoAnimal());
        assertEquals(dto.isAnimalVacinado(), captured.isAnimalVacinado());
        assertEquals(dto.getFormaPagamento(), captured.getFormaPagamento());
        assertEquals(dto.getObservacoes(), captured.getObservacoes());
        assertEquals(dto.getGeneroAnimal(), captured.getGeneroAnimal());
        assertEquals(dto.getIdFaixa(), captured.getFaixaPreco().getId());
        assertNotNull(result);




    }
}