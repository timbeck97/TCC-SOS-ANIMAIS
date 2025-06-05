package org.sos.animais.gestao.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.dto.CastrationDto;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.dto.CastrationRequestReturnDTO;
import org.sos.animais.gestao.dto.CastrationRequestTotalDto;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.enums.ENotification;
import org.sos.animais.gestao.enums.EPaymentMethod;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.factory.CastrationRequestFactory;
import org.sos.animais.gestao.model.Castration;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.model.PriceRange;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.repository.CastrationRepository;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.sos.animais.gestao.repository.PriceRangeRepository;
import org.sos.animais.gestao.service.file.FileService;
import org.sos.animais.gestao.service.telegram.TelegramBot;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;


@Service
public class CastrationService {

    private static final Logger logger = LoggerFactory.getLogger(CastrationService.class);


    private final CastrationRequestRepository castrationRequestRepository;
    private final CastrationRepository castrationRepository;
    private final FileService fileService;
    private final CastrationFileRepository castrationFileRepository;
    private final PriceRangeRepository priceRangeRepository;
    private final NotificationService notificationService;
    private final TelegramBot telegramBot;

    public CastrationService(CastrationRequestRepository castrationRequestRepository, CastrationRepository castrationRepository, FileService fileService, CastrationFileRepository castrationFileRepository, PriceRangeRepository priceRangeRepository, NotificationService notificationService, TelegramBot telegramBot) {
        this.castrationRequestRepository = castrationRequestRepository;
        this.castrationRepository = castrationRepository;
        this.fileService = fileService;
        this.castrationFileRepository = castrationFileRepository;
        this.priceRangeRepository = priceRangeRepository;
        this.notificationService = notificationService;
        this.telegramBot = telegramBot;
    }


    public List<CastrationDto> findAll(){
        return castrationRepository.findAll().stream().map(this::convertCastrationToDto).toList();
    }
    public CastrationDto findOne(Long id){
        return castrationRepository.findById(id).map(this::convertCastrationToDto).orElseThrow(()->new RuntimeException("Castration not found"));
    }
    public List<CastrationRequestReturnDTO> findAllRequest(){
        return castrationRequestRepository.findAllByCastracaoIsNullAndSituacaoIsOrderByDataSolicitacaoAsc(ERequestSituation.AGUARDANDO).stream().map(CastrationRequestReturnDTO::new).toList();
    }
    public CastrationRequestDto findOneRequest(Long id){
        return castrationRequestRepository.findById(id).map(CastrationRequestReturnDTO::new).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
    }
    public CastrationRequestTotalDto getTotal(){
        return castrationRequestRepository.countAll();
    }
    public ResponseEntity<?> removeCastrationRequest(Long id){
        return castrationRequestRepository.findById(id).map(castrationRequest -> {
            if(castrationRequest.getCastracao().getSituacao()==ERequestSituation.FINALIZADA){
                throw new RuntimeException("Não é possível remover uma solicitação de castração vinculada a uma castração finalizada");
            }
            castrationRequest.setCastracao(null);
            castrationRequest.setSituacao(ERequestSituation.AGUARDANDO);
            castrationRequestRepository.save(castrationRequest);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }
    public CastrationDto saveCastration(CastrationDto dto){
        Castration entity = new Castration();
        entity.setData(dto.getData());
        entity.setObservacao(dto.getObservacao());
        entity.setSituacao(ERequestSituation.EM_ANDAMENTO);
        for (CastrationRequestDto animal : dto.getAnimais()) {
            CastrationRequest castrationRequest = castrationRequestRepository.findById(animal.getId()).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
            castrationRequest.setCastracao(entity);
            castrationRequest.setSituacao(ERequestSituation.EM_ANDAMENTO);
            entity.getRequisicoes().add(castrationRequest);
        }
        entity = castrationRepository.save(entity);
        return convertCastrationToDto(entity);
    }
    public void addAnimal(Long idCastration, Long idAnimal){
        Castration entity = castrationRepository.findById(idCastration).orElseThrow(()->new RuntimeException("Castration not found"));
        CastrationRequest castrationRequest = castrationRequestRepository.findById(idAnimal).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        castrationRequest.setCastracao(entity);
        castrationRequest.setSituacao(ERequestSituation.EM_ANDAMENTO);
        entity.getRequisicoes().add(castrationRequest);
        castrationRepository.save(entity);
    }
    public void finishCastration(Long id){
        Castration entity = castrationRepository.findById(id).orElseThrow(()->new RuntimeException("Castration not found"));
       if(! entity.getRequisicoes().stream()
               .allMatch(x->x.getFaixaPreco()!=null)){
              throw new RuntimeException("Nem todos os animais possuem faixa de preço vinculada");
       }
        if(entity.getData().after(new Date())){
            throw new RuntimeException("Data de castração não pode ser anterior a data atual");
        }
        entity.setSituacao(ERequestSituation.FINALIZADA);
        castrationRepository.save(entity);
    }
    public void savePayment(Long id, MultipartFile file){
        CastrationRequest entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        if(file!=null){
            fileService.uploadFileCastrationRequest(file, Constantes.PAYMENT_RECEIPT_FOLDER, entity, EFileType.COMPROVANTE_PAGAMENTO);
            entity.setPaga(true);
        }else{
            entity.setPaga(true);
        }
        castrationRequestRepository.save(entity);
    }
    public CastrationDto convertCastrationToDto(Castration entity){
        CastrationDto dto = new CastrationDto();
        dto.setData(entity.getData());
        dto.setId(entity.getId());
        dto.setObservacao(entity.getObservacao());
        dto.setAnimais(entity.getRequisicoes().stream().map(CastrationRequestReturnDTO::new).toList());
        dto.setQuantidadeAnimais(entity.getRequisicoes().size());
        dto.setValoPagoPopulacao(entity.getRequisicoes().stream()
                        .filter(x->x.getFormaPagamento()!= EPaymentMethod.CASTRACAO_SOLIDARIA && x.getFaixaPreco()!=null)
                .mapToDouble(x->x.getFaixaPreco().getValor()).sum());
        dto.setValorPagoSos(entity.getRequisicoes().stream()
                .filter(x->x.getFormaPagamento()== EPaymentMethod.CASTRACAO_SOLIDARIA && x.getFaixaPreco()!=null)
                .mapToDouble(x->x.getFaixaPreco().getValor()).sum());
        dto.setSituacao(entity.getSituacao());
        return dto;
    }

    @Transactional
    public CastrationRequestReturnDTO saveCastrationRequest(CastrationRequestDto castrationRequestDto, Long id, MultipartFile file){
        logger.info("Saving castration request: {}", Utils.convertObjectToJson(castrationRequestDto));
        CastrationRequest entity=new CastrationRequest();
        if(id!=null){
            entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        }
        entity = CastrationRequestFactory.init().withEntity(entity).withDto(castrationRequestDto).build();
        if(castrationRequestDto.getIdFaixa()!=null && castrationRequestDto.getIdFaixa()>0l){
            PriceRange priceRange = priceRangeRepository.findById(castrationRequestDto.getIdFaixa()).orElseThrow(()->new RuntimeException("PriceRange not found"));
            entity.setFaixaPreco(priceRange);
        }else{
            entity.setFaixaPreco(null);
        }
        if(id==null){
            entity.setSituacao(ERequestSituation.AGUARDANDO);
            entity.setDataSolicitacao(new Date());
        }
        entity = castrationRequestRepository.save(entity);
        if(id==null && file!=null){
            CastrationFile castrationFile = fileService.uploadFileCastrationRequest(file, Constantes.CASTRATION_FOLDER, entity, EFileType.FOTO);
            entity.getArquivos().add(castrationFile);
        }
        if(id==null){
            notificationService.createNotification(ENotification.CASTRATION_REQUEST_CREATED, entity.getNomeFormatado());
        }
        entity = castrationRequestRepository.findById(entity.getId()).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        String mensagem = "<b>📋 Nova solicitação de castração recebida!</b>\n\n" +
                "<b>👤 Tutor:</b>\n" +
                "<b>Nome:</b> " + entity.getNome() + " " + entity.getSobrenome() + "\n" +
                "<b>CPF:</b> " + entity.getCpf() + "\n" +
                "<b>Telefone:</b> " + entity.getTelefone() + "\n" +
                "<b>Endereço:</b> " + entity.getRua() + ", nº " + entity.getNumero() + " - " + entity.getBairro() + "\n\n" +
                "<b>🐾 Animal:</b>\n" +
                "<b>Nome:</b> " + entity.getNomeAnimal() + "\n" +
                "<b>Espécie:</b> " + entity.getTipoAnimal() + "\n" +
                "<b>Raça:</b> " + (entity.getRacaAnimal() != null ? entity.getRacaAnimal() : "Não informada") + "\n" +
                "<b>Peso:</b> " + entity.getPesoAnimal() + " kg\n" +
                "<b>Porte:</b> " + entity.getPorteAnimal() + "\n" +
                "<b>Gênero:</b> " + entity.getGeneroAnimal() + "\n" +
                "<b>Vacinado:</b> " + (entity.isAnimalVacinado() ? "Sim ✅" : "Não ❌") + "\n" +
                "<b>Descrição:</b> " + (entity.getDescricaoAnimal() != null ? entity.getDescricaoAnimal() : "Não informada");
        telegramBot.sendMessage(mensagem);
        return new CastrationRequestReturnDTO(entity);
    }
    public void deleteCastrationRequest(Long id){
        CastrationRequest entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        List<CastrationFile> imgFile = castrationFileRepository.findByCastrationRequestId(entity.getId());
        for (CastrationFile file : imgFile) {
            fileService.deleteFileCastrationRequest(file);
        }
        castrationRequestRepository.delete(entity);
        logger.info("User {} Deleting castration request: {}", AutenticationService.getUser().name(), Utils.convertObjectToJson(entity));
    }
}
