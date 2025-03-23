insert into castration(id,data, observacao, situacao) values (50, '2024-01-01 10:00:00', 'Castração de cachorro', 'EM_ANDAMENTO');
insert into castration(id,data, observacao, situacao) values (51, '2024-01-02 14:30:00', 'Castração de gato', 'EM_ANDAMENTO');
insert into castration(id,data, observacao, situacao) values (52, '2024-01-03 08:45:00', 'Castração de cachorro', 'EM_ANDAMENTO');

insert into price_range(id, descricao, valor) values
(600, 'Até 5KG', 70.0),
(601, '5KG até 10KG', 90.0),
(602, '10KG até 15KG', 100.0),
(603, '15KG até 20KG', 110.0),
(604, '20KG até 25KG', 125.0);

INSERT INTO castration_request (
    id, nome, sobrenome, cpf, telefone, rua, bairro, numero,
    tipo_animal, nome_animal, raca_animal, peso_animal, porte_animal, descricao_animal,
    animal_vacinado, situacao, data_solicitacao, castracao_id,forma_pagamento, genero_animal
)
VALUES
(111, 'João', 'Silva', '12345678901', '(11) 91234-5678', 'Rua das Flores', 'Centro', '123', 'CACHORRO', 'Rex', 'Vira-lata', 15.2, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2024-01-01 10:00:00', NULL , 'PIX','MACHO'),
(112, 'Maria', 'Souza', '98765432100', '(21) 98765-4321', 'Av. Brasil', 'Bairro Alto', '456', 'GATO', 'Mia', 'Siamês', 4.1, 'PEQUENO', 'Gato calmo', false, 'AGUARDANDO', '2024-01-02 14:30:00', NULL, 'PIX','FEMEA'),
(113, 'Carlos', 'Oliveira', '32165498701', '(31) 99876-5432', 'Travessa Verde', 'Jardim Palmeiras', '789', 'CACHORRO', 'Bolt', 'Pastor Alemão', 22.0, 'GRANDE', 'Cachorro ativo', true, 'AGUARDANDO', '2024-01-03 08:45:00', NULL, 'PIX', 'MACHO'),
(114, 'Ana', 'Pereira', '56473829100', '(41) 91456-7890', 'Rua Amarela', 'Vila Nova', '101', 'GATO', 'Luna', 'Persa', 3.5, 'PEQUENO', 'Gato dócil e sociável', true, 'AGUARDANDO', '2024-01-04 09:15:00', NULL, 'PIX', 'FEMEA'),
(115, 'Bruno', 'Lima', '90817263545', '(51) 92234-5612', 'Av. dos Coqueiros', 'Centro', '200', 'CACHORRO', 'Thor', 'Labrador', 25.0, 'GRANDE', 'Cachorro brincalhão', false, 'AGUARDANDO', '2024-01-05 16:00:00', NULL, 'DINHEIRO', 'MACHO'),
(116, 'Cecília', 'Machado', '77123456789', '(71) 93456-1234', 'Rua das Margaridas', 'Bairro Verde', '99', 'GATO', 'Snow', 'Angorá', 4.0, 'PEQUENO', 'Gato tranquilo', true, 'AGUARDANDO', '2024-01-06 13:00:00', NULL, 'DINHEIRO', 'FEMEA'),
(117, 'Fernando', 'Almeida', '66554433211', '(61) 95678-2345', 'Rua das Acácias', 'Bairro Alto', '88', 'CACHORRO', 'Buddy', 'Beagle', 12.0, 'MEDIO', 'Cachorro curioso', true, 'AGUARDANDO', '2024-01-07 10:30:00', NULL, 'DINHEIRO', 'MACHO'),
(118, 'Juliana', 'Souza', '88990011223', '(81) 91234-5678', 'Avenida Central', 'Centro', '301', 'CACHORRO', 'Luna', 'Poodle', 8.5, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-01-08 11:45:00', NULL, 'DINHEIRO', 'FEMEA'),
(119, 'Lucas', 'Santos', '99887766554', '(31) 97865-4321', 'Rua do Sol', 'Bairro Azul', '102', 'GATO', 'Shadow', 'Siamês', 3.0, 'PEQUENO', 'Gato ágil', true, 'AGUARDANDO', '2024-01-09 14:15:00', 50,'CASTRACAO_SOLIDARIA', 'MACHO'),
(1110, 'Beatriz', 'Moura', '11223344556', '(91) 92123-4567', 'Rua da Paz', 'Vila Nova', '103', 'CACHORRO', 'Max', 'Golden Retriever', 28.0, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2024-01-10 15:30:00', 50, 'DINHEIRO', 'MACHO'),
(1111, 'Eduardo', 'Ferreira', '44332211009', '(41) 98765-1234', 'Avenida Paulista', 'Centro', '400', 'CACHORRO', 'Spike', 'Boxer', 20.0, 'MEDIO', 'Cachorro ativo', true, 'AGUARDANDO', '2024-01-11 12:00:00', 50, 'DINHEIRO', 'MACHO'),
(1112, 'Clara', 'Ribeiro', '66778899001', '(61) 91234-7890', 'Rua Verde', 'Bairro Jardim', '77', 'GATO', 'Milo', 'Maine Coon', 5.0, 'MEDIO', 'Gato dócil', false, 'AGUARDANDO', '2024-01-12 09:45:00', 50,'PIX', 'MACHO'),
(1113, 'Ricardo', 'Nunes', '55443322110', '(81) 93456-9876', 'Rua Esperança', 'Vila Alegre', '89', 'CACHORRO', 'Ziggy', 'Dachshund', 9.0, 'MEDIO', 'Cachorro energético', true, 'AGUARDANDO', '2024-01-13 14:00:00', NULL,'CASTRACAO_SOLIDARIA', 'MACHO'),
(1114, 'Patrícia', 'Cardoso', '22334455667', '(71) 94567-1234', 'Rua Nova', 'Bairro Antigo', '55', 'CACHORRO', 'Bella', 'Yorkshire', 3.2, 'PEQUENO', 'Cachorro calmo', true, 'AGUARDANDO', '2024-01-14 10:15:00', NULL,'CASTRACAO_SOLIDARIA', 'FEMEA'),
(1115, 'Vinícius', 'Oliveira', '77889900112', '(91) 95678-2345', 'Avenida Boa Vista', 'Centro', '66', 'GATO', 'Oscar', 'Himalaio', 4.5, 'PEQUENO', 'Gato amigável', false, 'AGUARDANDO', '2024-01-15 13:30:00', 51, 'DINHEIRO', 'MACHO'),
(1116, 'Isabela', 'Lopes', '99880077665', '(51) 91234-5678', 'Rua dos Anjos', 'Bairro Novo', '111', 'CACHORRO', 'Charlie', 'Bulldog', 15.0, 'MEDIO', 'Cachorro tranquilo', true, 'AGUARDANDO', '2024-01-16 11:00:00', 51, 'DINHEIRO', 'MACHO'),
(1117, 'Gabriel', 'Mendes', '33445566778', '(31) 98765-4321', 'Rua das Palmeiras', 'Bairro Verde', '90', 'CACHORRO', 'Rocky', 'Pug', 8.0, 'PEQUENO', 'Cachorro brincalhão', true, 'AGUARDANDO', '2024-01-17 15:00:00', 51, 'DINHEIRO', 'MACHO'),
(1118, 'Lorena', 'Barbosa', '12344321123', '(81) 91234-5678', 'Rua São João', 'Vila Velha', '80', 'GATO', 'Lily', 'Bengal', 3.8, 'PEQUENO', 'Gato curioso', true, 'AGUARDANDO', '2024-01-18 09:00:00', 52, 'DINHEIRO', 'FEMEA'),
(1119, 'Felipe', 'Costa', '55667788991', '(91) 94567-8910', 'Avenida Aurora', 'Centro', '300', 'CACHORRO', 'Buddy', 'Chihuahua', 3.0, 'PEQUENO', 'Cachorro leal', false, 'AGUARDANDO', '2024-01-19 08:45:00', 52, 'DINHEIRO', 'MACHO'),
(1120, 'Natália', 'Silva', '11009988776', '(71) 93456-1122', 'Rua Azul', 'Bairro Antigo', '44', 'CACHORRO', 'Duke', 'Husky Siberiano', 35.0, 'GRANDE', 'Cachorro resistente', true, 'AGUARDANDO', '2024-01-20 17:30:00', NULL, 'CASTRACAO_SOLIDARIA', 'MACHO'),
(1121, 'Mariana', 'Gomes', '99887766543', '(51) 98765-4321', 'Rua do Sol', 'Vila Nova', '205', 'CACHORRO', 'Rex', 'Dobermann', 28.5, 'GRANDE', 'Cachorro protetor', true, 'AGUARDANDO', '2024-01-21 09:00:00', NULL, 'PIX', 'MACHO'),
(1122, 'Luiza', 'Pinto', '11223344567', '(61) 92345-6789', 'Rua dos Girassóis', 'Bairro Belo', '300', 'GATO', 'Nina', 'Ragdoll', 6.0, 'MEDIO', 'Gata tranquila', false, 'AGUARDANDO', '2024-01-22 14:30:00', NULL, 'PIX', 'FEMEA'),
(123, 'Thiago', 'Ramos', '55667788910', '(41) 93456-7890', 'Rua Verde', 'Jardim Encantado', '155', 'CACHORRO', 'Bolt', 'Dachshund', 9.2, 'PEQUENO', 'Cachorro curioso e energético', true, 'AGUARDANDO', '2024-01-23 10:00:00', NULL, 'DINHEIRO', 'MACHO'),
(1124, 'Juliana', 'Martins', '66778899002', '(81) 92234-5678', 'Avenida das Acácias', 'Centro', '210', 'CACHORRO', 'Mel', 'Cocker Spaniel', 13.0, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-01-24 16:45:00', NULL, 'DINHEIRO', 'FEMEA'),
(1125, 'Eduardo', 'Santos', '88990022334', '(71) 93123-4567', 'Rua Central', 'Bairro da Paz', '180', 'CACHORRO', 'Thor', 'Rottweiler', 32.0, 'GRANDE', 'Cachorro forte e leal', true, 'AGUARDANDO', '2024-01-25 11:15:00', NULL, 'DINHEIRO', 'MACHO'),
(1126, 'Larissa', 'Costa', '77665544321', '(51) 93765-4321', 'Rua das Flores', 'Vila Jardim', '120', 'GATO', 'Simba', 'Sphynx', 4.2, 'PEQUENO', 'Gato ativo e brincalhão', true, 'AGUARDANDO', '2024-01-26 09:30:00', NULL, 'PIX', 'MACHO'),
(1127, 'André', 'Teixeira', '66554433222', '(31) 94567-1234', 'Rua da Paz', 'Bairro Alto', '220', 'CACHORRO', 'Max', 'Pitbull', 29.0, 'GRANDE', 'Cachorro protetor e amigável', false, 'AGUARDANDO', '2024-01-27 13:30:00', NULL, 'PIX', 'MACHO'),
(1128, 'Fabiana', 'Alves', '55443322199', '(61) 93678-1234', 'Avenida Brasil', 'Centro', '175', 'CACHORRO', 'Bella', 'Shih Tzu', 6.5, 'PEQUENO', 'Cachorro meigo e dócil', true, 'AGUARDANDO', '2024-01-28 14:00:00', NULL, 'DINHEIRO', 'FEMEA'),
(1129, 'Ricardo', 'Martins', '99887766532', '(41) 92345-6789', 'Rua das Palmeiras', 'Vila Nova', '160', 'GATO', 'Luna', 'Abyssinian', 4.8, 'PEQUENO', 'Gato independente e ágil', false, 'AGUARDANDO', '2024-01-29 17:00:00', NULL, 'PIX', 'FEMEA'),
(1130, 'Vanessa', 'Rodrigues', '44332211099', '(91) 93456-7890', 'Rua do Porto', 'Bairro São José', '185', 'CACHORRO', 'Rocky', 'Cocker Spaniel', 14.2, 'MEDIO', 'Cachorro brincalhão', true, 'AGUARDANDO', '2024-01-30 12:30:00', NULL, 'DINHEIRO', 'MACHO');