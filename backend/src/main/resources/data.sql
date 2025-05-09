insert into castration(id,data, observacao, situacao) values (50, '2025-01-06 10:00:00', 'Castração de cachorro', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (51, '2025-02-13 14:30:00', 'Castração de gato', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (52, '2025-03-20 08:45:00', 'Castração de cachorro', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (53, '2025-06-20 08:45:00', NULL, 'FINALIZADA');

insert into notification(id, data, mensagem, tipo, lida, usuario, data_leitura) values
(101,'2025-03-27 21:20:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
(102,'2025-03-27 21:15:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
(100,'2025-03-27 21:00:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
(103,'2025-03-27 20:18:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
(104,'2025-03-27 19:20:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
(105,'2025-03-27 21:45:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00');

insert into price_range(id, descricao, valor, data_inicio) values
(600, 'Até 5KG', 70.0, '2025-01-01'),
(601, '5KG até 10KG', 90.0,'2025-01-01'),
(602, '10KG até 15KG', 100.0,'2025-01-01'),
(603, '15KG até 20KG', 110.0, '2025-01-01'),
(604, '20KG até 25KG', 125.0, '2025-01-01');

INSERT INTO castration_request (
    id, nome, sobrenome, cpf, telefone, rua, bairro, numero,
    tipo_animal, nome_animal, raca_animal, peso_animal, porte_animal, descricao_animal,
    animal_vacinado, situacao, data_solicitacao, castracao_id,forma_pagamento, genero_animal, faixa_preco_id
)
VALUES
(111, 'João', 'Silva', '12345678901', '(11) 91234-5678', 'Rua das Flores', 'Centro', '123', 'CACHORRO', 'Rex', 'Vira-lata', 15.2, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2025-01-01 10:00:00', NULL , 'PIX','MACHO', null),
(112, 'Maria', 'Souza', '98765432100', '(21) 98765-4321', 'Av. Brasil', 'Bairro Alto', '456', 'GATO', 'Mia', 'Siamês', 4.1, 'PEQUENO', 'Gato calmo', false, 'AGUARDANDO', '2024-12-02 14:30:00', NULL, 'PIX','FEMEA', null),
(113, 'Carlos', 'Oliveira', '32165498701', '(31) 99876-5432', 'Travessa Verde', 'Jardim Palmeiras', '789', 'CACHORRO', 'Bolt', 'Pastor Alemão', 22.0, 'GRANDE', 'Cachorro ativo', true, 'AGUARDANDO', '2024-01-03 08:45:00', NULL, 'PIX', 'MACHO', null),
(114, 'Ana', 'Pereira', '56473829100', '(41) 91456-7890', 'Rua Amarela', 'Vila Nova', '101', 'GATO', 'Luna', 'Persa', 3.5, 'PEQUENO', 'Gato dócil e sociável', true, 'AGUARDANDO', '2024-11-04 09:15:00', 52, 'PIX', 'FEMEA', 601),
(115, 'Bruno', 'Lima', '90817263545', '(51) 92234-5612', 'Av. dos Coqueiros', 'Centro', '200', 'CACHORRO', 'Thor', 'Labrador', 25.0, 'GRANDE', 'Cachorro brincalhão', false, 'AGUARDANDO', '2024-12-05 16:00:00', 52, 'DINHEIRO', 'MACHO', 601),
(116, 'Cecília', 'Machado', '77123456789', '(71) 93456-1234', 'Rua das Margaridas', 'Bairro Verde', '99', 'GATO', 'Snow', 'Angorá', 4.0, 'PEQUENO', 'Gato tranquilo', true, 'AGUARDANDO', '2024-11-06 13:00:00', NULL, 'DINHEIRO', 'FEMEA', null),
(117, 'Fernando', 'Almeida', '66554433211', '(61) 95678-2345', 'Rua das Acácias', 'Bairro Alto', '88', 'CACHORRO', 'Buddy', 'Beagle', 12.0, 'MEDIO', 'Cachorro curioso', true, 'AGUARDANDO', '2024-12-07 10:30:00', NULL, 'DINHEIRO', 'MACHO', null),
(118, 'Juliana', 'Souza', '88990011223', '(81) 91234-5678', 'Avenida Central', 'Centro', '301', 'CACHORRO', 'Luna', 'Poodle', 8.5, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-12-08 11:45:00', NULL, 'DINHEIRO', 'FEMEA', null),
(119, 'Lucas', 'Santos', '99887766554', '(31) 97865-4321', 'Rua do Sol', 'Bairro Azul', '102', 'GATO', 'Shadow', 'Siamês', 3.0, 'PEQUENO', 'Gato ágil', true, 'AGUARDANDO', '2024-12-09 14:15:00', 50,'PIX', 'MACHO', 601),
(1110, 'Beatriz', 'Moura', '11223344556', '(91) 92123-4567', 'Rua da Paz', 'Vila Nova', '103', 'CACHORRO', 'Max', 'Golden Retriever', 28.0, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2024-12-10 15:30:00', 50, 'DINHEIRO', 'MACHO', 600),
(1111, 'Eduardo', 'Ferreira', '44332211009', '(41) 98765-1234', 'Avenida Paulista', 'Centro', '400', 'CACHORRO', 'Spike', 'Boxer', 20.0, 'MEDIO', 'Cachorro ativo', true, 'AGUARDANDO', '2024-12-11 12:00:00', 50, 'DINHEIRO', 'MACHO', 601),
(1112, 'Clara', 'Ribeiro', '66778899001', '(61) 91234-7890', 'Rua Verde', 'Bairro Jardim', '77', 'GATO', 'Milo', 'Maine Coon', 5.0, 'MEDIO', 'Gato dócil', false, 'AGUARDANDO', '2024-12-12 09:45:00', 50,'PIX', 'MACHO', 600),
(1113, 'Ricardo', 'Nunes', '55443322110', '(81) 93456-9876', 'Rua Esperança', 'Vila Alegre', '89', 'CACHORRO', 'Ziggy', 'Dachshund', 9.0, 'MEDIO', 'Cachorro energético', true, 'AGUARDANDO', '2024-12-13 14:00:00', 52,'CASTRACAO_SOLIDARIA', 'MACHO', 601),
(1114, 'Patrícia', 'Cardoso', '22334455667', '(71) 94567-1234', 'Rua Nova', 'Bairro Antigo', '55', 'CACHORRO', 'Bella', 'Yorkshire', 3.2, 'PEQUENO', 'Cachorro calmo', true, 'AGUARDANDO', '2024-12-14 10:15:00', NULL,'CASTRACAO_SOLIDARIA', 'FEMEA', null),
(1115, 'Vinícius', 'Oliveira', '77889900112', '(91) 95678-2345', 'Avenida Boa Vista', 'Centro', '66', 'GATO', 'Oscar', 'Himalaio', 4.5, 'PEQUENO', 'Gato amigável', false, 'AGUARDANDO', '2024-12-15 13:30:00', 51, 'DINHEIRO', 'MACHO', 600),
(1116, 'Isabela', 'Lopes', '99880077665', '(51) 91234-5678', 'Rua dos Anjos', 'Bairro Novo', '111', 'CACHORRO', 'Charlie', 'Bulldog', 15.0, 'MEDIO', 'Cachorro tranquilo', true, 'AGUARDANDO', '2024-12-16 11:00:00', 51, 'CASTRACAO_SOLIDARIA', 'MACHO', 600),
(1117, 'Gabriel', 'Mendes', '33445566778', '(31) 98765-4321', 'Rua das Palmeiras', 'Bairro Verde', '90', 'CACHORRO', 'Rocky', 'Pug', 8.0, 'PEQUENO', 'Cachorro brincalhão', true, 'AGUARDANDO', '2024-12-17 15:00:00', 51, 'CASTRACAO_SOLIDARIA', 'MACHO', 601),
(1118, 'Lorena', 'Barbosa', '12344321123', '(81) 91234-5678', 'Rua São João', 'Vila Velha', '80', 'GATO', 'Lily', 'Bengal', 3.8, 'PEQUENO', 'Gato curioso', true, 'AGUARDANDO', '2024-12-18 09:00:00', 52, 'DINHEIRO', 'FEMEA', 601),
(1119, 'Felipe', 'Costa', '55667788991', '(91) 94567-8910', 'Avenida Aurora', 'Centro', '300', 'CACHORRO', 'Buddy', 'Chihuahua', 3.0, 'PEQUENO', 'Cachorro leal', false, 'AGUARDANDO', '2024-12-19 08:45:00', 52, 'DINHEIRO', 'MACHO', 601),
(1120, 'Natália', 'Silva', '11009988776', '(71) 93456-1122', 'Rua Azul', 'Bairro Antigo', '44', 'CACHORRO', 'Duke', 'Husky Siberiano', 35.0, 'GRANDE', 'Cachorro resistente', true, 'AGUARDANDO', '2024-12-20 17:30:00', NULL, 'CASTRACAO_SOLIDARIA', 'MACHO', null),
(1121, 'Mariana', 'Gomes', '99887766543', '(51) 98765-4321', 'Rua do Sol', 'Vila Nova', '205', 'CACHORRO', 'Rex', 'Dobermann', 28.5, 'GRANDE', 'Cachorro protetor', true, 'AGUARDANDO', '2024-12-21 09:00:00', 52, 'PIX', 'MACHO', 601),
(1122, 'Luiza', 'Pinto', '11223344567', '(61) 92345-6789', 'Rua dos Girassóis', 'Bairro Belo', '300', 'GATO', 'Nina', 'Ragdoll', 6.0, 'MEDIO', 'Gata tranquila', false, 'AGUARDANDO', '2024-12-22 14:30:00', NULL, 'PIX', 'FEMEA', null),
(123, 'Thiago', 'Ramos', '55667788910', '(41) 93456-7890', 'Rua Verde', 'Jardim Encantado', '155', 'CACHORRO', 'Bolt', 'Dachshund', 9.2, 'PEQUENO', 'Cachorro curioso e energético', true, 'AGUARDANDO', '2024-12-23 10:00:00', 52, 'DINHEIRO', 'MACHO', 601),
(1124, 'Juliana', 'Martins', '66778899002', '(81) 92234-5678', 'Avenida das Acácias', 'Centro', '210', 'CACHORRO', 'Mel', 'Cocker Spaniel', 13.0, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-12-24 16:45:00', NULL, 'DINHEIRO', 'FEMEA', null),
(1125, 'Eduardo', 'Santos', '88990022334', '(71) 93123-4567', 'Rua Central', 'Bairro da Paz', '180', 'CACHORRO', 'Thor', 'Rottweiler', 32.0, 'GRANDE', 'Cachorro forte e leal', true, 'AGUARDANDO', '2024-12-25 11:15:00', NULL, 'DINHEIRO', 'MACHO', null),
(1126, 'Larissa', 'Costa', '77665544321', '(51) 93765-4321', 'Rua das Flores', 'Vila Jardim', '120', 'GATO', 'Simba', 'Sphynx', 4.2, 'PEQUENO', 'Gato ativo e brincalhão', true, 'AGUARDANDO', '2024-12-26 09:30:00', 52, 'PIX', 'MACHO', 601),
(1127, 'André', 'Teixeira', '66554433222', '(31) 94567-1234', 'Rua da Paz', 'Bairro Alto', '220', 'CACHORRO', 'Max', 'Pitbull', 29.0, 'GRANDE', 'Cachorro protetor e amigável', false, 'AGUARDANDO', '2024-12-27 13:30:00', NULL, 'PIX', 'MACHO', 601),
(1128, 'Fabiana', 'Alves', '55443322199', '(61) 93678-1234', 'Avenida Brasil', 'Centro', '175', 'CACHORRO', 'Bella', 'Shih Tzu', 6.5, 'PEQUENO', 'Cachorro meigo e dócil', true, 'AGUARDANDO', '2024-12-28 14:00:00', NULL, 'DINHEIRO', 'FEMEA', null),
(1129, 'Ricardo', 'Martins', '99887766532', '(41) 92345-6789', 'Rua das Palmeiras', 'Vila Nova', '160', 'GATO', 'Luna', 'Abyssinian', 4.8, 'PEQUENO', 'Gato independente e ágil', false, 'AGUARDANDO', '2024-12-29 17:00:00', 52, 'PIX', 'FEMEA', 601),
(1130, 'Vanessa', 'Rodrigues', '44332211099', '(91) 93456-7890', 'Rua do Porto', 'Bairro São José', '185', 'CACHORRO', 'Rocky', 'Cocker Spaniel', 14.2, 'MEDIO', 'Cachorro brincalhão', true, 'AGUARDANDO', '2024-12-30 12:30:00', NULL, 'DINHEIRO', 'MACHO', null),
(15111, 'João', 'Silva', '12345678901', '(11) 91234-5678', 'Rua das Flores', 'Centro', '123', 'CACHORRO', 'Rex', 'Vira-lata', 15.2, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2025-01-01 10:00:00', NULL , 'PIX','MACHO', null),
(15112, 'Maria', 'Souza', '98765432100', '(21) 98765-4321', 'Av. Brasil', 'Bairro Alto', '456', 'GATO', 'Mia', 'Siamês', 4.1, 'PEQUENO', 'Gato calmo', false, 'AGUARDANDO', '2024-12-02 14:30:00', NULL, 'CASTRACAO_SOLIDARIA','FEMEA', null),
(15113, 'Carlos', 'Oliveira', '32165498701', '(31) 99876-5432', 'Travessa Verde', 'Jardim Palmeiras', '789', 'CACHORRO', 'Bolt', 'Pastor Alemão', 22.0, 'GRANDE', 'Cachorro ativo', true, 'AGUARDANDO', '2024-12-03 08:45:00', NULL, 'CASTRACAO_SOLIDARIA', 'MACHO', null),
(15114, 'Ana', 'Ferreira', '65478912300', '(41) 92345-6789', 'Rua das Palmeiras', 'Vila Nova', '321', 'CACHORRO', 'Toby', 'Golden Retriever', 28.5, 'GRANDE', 'Muito dócil e brincalhão', true, 'AGUARDANDO', '2025-02-10 09:15:00', 53, 'DINHEIRO', 'MACHO', 603),
(15115, 'Bruno', 'Lima', '74185296301', '(51) 93456-7890', 'Rua São João', 'Centro', '159', 'GATO', 'Luna', 'Persa', 3.7, 'PEQUENO', 'Gato muito tranquilo', false, 'AGUARDANDO', '2025-03-05 11:20:00', 53, 'CASTRACAO_SOLIDARIA', 'FEMEA', 602),
(15116, 'Camila', 'Alves', '85296374102', '(61) 94567-8901', 'Avenida Central', 'Bairro Industrial', '753', 'CACHORRO', 'Spike', 'Bulldog', 18.0, 'MEDIO', 'Um pouco teimoso, mas carinhoso', true, 'AGUARDANDO', '2025-03-07 15:40:00', 53, 'PIX', 'MACHO', 601),
(15117, 'Diego', 'Ramos', '96374185203', '(71) 95678-9012', 'Rua das Acácias', 'Residencial Primavera', '951', 'GATO', 'Nina', 'Maine Coon', 6.5, 'MEDIO', 'Muito ativa e curiosa', true, 'AGUARDANDO', '2025-05-12 08:00:00', 53, 'DINHEIRO', 'FEMEA', 601),
(15118, 'Eduarda', 'Martins', '15926374804', '(81) 96789-0123', 'Travessa Azul', 'Vila Esperança', '852', 'CACHORRO', 'Thor', 'Husky Siberiano', 25.3, 'GRANDE', 'Cheio de energia, precisa de espaço', false, 'AGUARDANDO', '2025-06-20 13:30:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 602),
(15119, 'Fernando', 'Moura', '25836974105', '(91) 97890-1234', 'Rua do Sol', 'Bairro Novo', '456', 'GATO', 'Simba', 'Angorá', 5.0, 'MEDIO', 'Gosta de escalar móveis', true, 'AGUARDANDO', '2025-07-15 16:10:00', 53, 'PIX', 'MACHO', 600),
(15120, 'Gabriela', 'Costa', '36985214706', '(31) 98901-2345', 'Avenida das Rosas', 'Centro', '789', 'CACHORRO', 'Bobby', 'Poodle', 10.2, 'PEQUENO', 'Muito sociável e brincalhão', true, 'AGUARDANDO', '2025-08-08 14:00:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 601),
(15121, 'Henrique', 'Pereira', '98712365407', '(41) 99012-3456', 'Rua Bela Vista', 'Alto da Serra', '123', 'GATO', 'Mel', 'SRD', 3.9, 'PEQUENO', 'Muito carinhosa e independente', false, 'AGUARDANDO', '2025-09-01 09:50:00', 53, 'CASTRACAO_SOLIDARIA', 'FEMEA', 601),
(15122, 'Isabela', 'Rodrigues', '12378965408', '(21) 90123-4567', 'Rua das Orquídeas', 'Jardim Botânico', '234', 'CACHORRO', 'Fred', 'Beagle', 12.5, 'MEDIO', 'Muito curioso e farejador', true, 'AGUARDANDO', '2025-04-05 17:30:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 603),
(15123, 'Júlio', 'Santana', '14785236909', '(61) 91234-5678', 'Avenida Verde', 'Bairro Alto', '345', 'GATO', 'Tom', 'Bengal', 4.8, 'MEDIO', 'Muito ágil e esperto', true, 'AGUARDANDO', '2025-02-22 12:15:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 600),
(15124, 'Karen', 'Nunes', '25896314710', '(81) 92345-6789', 'Rua das Oliveiras', 'Residencial Tranquilo', '567', 'CACHORRO', 'Lulu', 'Lulu da Pomerânia', 3.2, 'PEQUENO', 'Muito fofo e dócil', false, 'AGUARDANDO', '2025-12-30 10:40:00', 53, 'PIX', 'FEMEA', 600),
(15125, 'Lucas', 'Fernandes', '36974185211', '(71) 93456-7890', 'Rua do Campo', 'Centro', '678', 'GATO', 'Felix', 'SRD', 4.5, 'PEQUENO', 'Muito brincalhão e curioso', true, 'AGUARDANDO', '2025-01-18 08:30:00', 53, 'DINHEIRO', 'MACHO', 600),
(15126, 'Mariana', 'Dias', '98745632112', '(91) 94567-8901', 'Avenida Principal', 'Jardim América', '789', 'CACHORRO', 'Max', 'Labrador', 30.0, 'GRANDE', 'Extremamente amigável', true, 'AGUARDANDO', '2025-02-10 15:45:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 601),
(15127, 'Natália', 'Moreira', '65412378913', '(31) 95678-9012', 'Rua Azul', 'Vila Feliz', '890', 'GATO', 'Pandora', 'Siberiano', 7.0, 'MEDIO', 'Gosta de brincar com bolinhas', false, 'AGUARDANDO', '2025-03-15 11:10:00', 53, 'PIX', 'FEMEA', 600),
(15128, 'Otávio', 'Teixeira', '32165498714', '(21) 96789-0123', 'Travessa Nova', 'Bairro Novo', '901', 'CACHORRO', 'Buddy', 'Border Collie', 18.7, 'MEDIO', 'Muito inteligente e obediente', true, 'AGUARDANDO', '2025-04-22 16:25:00', 53, 'CASTRACAO_SOLIDARIA', 'MACHO', 602);
