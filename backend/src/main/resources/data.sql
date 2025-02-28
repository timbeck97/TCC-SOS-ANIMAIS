insert into castration(id,data, observacao, situacao) values (50, '2024-01-01 10:00:00', 'Castração de cachorro', 'EM_ANDAMENTO');
insert into castration(id,data, observacao, situacao) values (51, '2024-01-02 14:30:00', 'Castração de gato', 'EM_ANDAMENTO');
insert into castration(id,data, observacao, situacao) values (52, '2024-01-03 08:45:00', 'Castração de cachorro', 'EM_ANDAMENTO');

insert into price_range(id, descricao, valor) values
(1, 'Até 5KG', 70.0),
(2, '5KG até 10KG', 90.0),
(3, '10KG até 15KG', 100.0),
(4, '15KG até 20KG', 110.0),
(5, '20KG até 25KG', 125.0);

INSERT INTO castration_request (
    id, nome, sobrenome, cpf, telefone, rua, bairro, numero,
    tipo_animal, nome_animal, raca_animal, peso_animal, porte_animal, descricao_animal,
    animal_vacinado, situacao, data_solicitacao, castracao_id,forma_pagamento
)
VALUES
(100, 'João', 'Silva', '12345678901', '(11) 91234-5678', 'Rua das Flores', 'Centro', '123', 'CACHORRO', 'Rex', 'Vira-lata', 15.2, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2024-01-01 10:00:00', NULL , 'PIX'),
(102, 'Maria', 'Souza', '98765432100', '(21) 98765-4321', 'Av. Brasil', 'Bairro Alto', '456', 'GATO', 'Mia', 'Siamês', 4.1, 'PEQUENO', 'Gato calmo', false, 'AGUARDANDO', '2024-01-02 14:30:00', NULL, 'PIX'),
(103, 'Carlos', 'Oliveira', '32165498701', '(31) 99876-5432', 'Travessa Verde', 'Jardim Palmeiras', '789', 'CACHORRO', 'Bolt', 'Pastor Alemão', 22.0, 'GRANDE', 'Cachorro ativo', true, 'AGUARDANDO', '2024-01-03 08:45:00', NULL, 'PIX'),
(104, 'Ana', 'Pereira', '56473829100', '(41) 91456-7890', 'Rua Amarela', 'Vila Nova', '101', 'GATO', 'Luna', 'Persa', 3.5, 'PEQUENO', 'Gato dócil e sociável', true, 'AGUARDANDO', '2024-01-04 09:15:00', NULL, 'PIX'),
(105, 'Bruno', 'Lima', '90817263545', '(51) 92234-5612', 'Av. dos Coqueiros', 'Centro', '200', 'CACHORRO', 'Thor', 'Labrador', 25.0, 'GRANDE', 'Cachorro brincalhão', false, 'AGUARDANDO', '2024-01-05 16:00:00', NULL, 'DINHEIRO'),
(106, 'Cecília', 'Machado', '77123456789', '(71) 93456-1234', 'Rua das Margaridas', 'Bairro Verde', '99', 'GATO', 'Snow', 'Angorá', 4.0, 'PEQUENO', 'Gato tranquilo', true, 'AGUARDANDO', '2024-01-06 13:00:00', NULL, 'DINHEIRO'),
(107, 'Fernando', 'Almeida', '66554433211', '(61) 95678-2345', 'Rua das Acácias', 'Bairro Alto', '88', 'CACHORRO', 'Buddy', 'Beagle', 12.0, 'MEDIO', 'Cachorro curioso', true, 'AGUARDANDO', '2024-01-07 10:30:00', NULL, 'DINHEIRO'),
(108, 'Juliana', 'Souza', '88990011223', '(81) 91234-5678', 'Avenida Central', 'Centro', '301', 'CACHORRO', 'Luna', 'Poodle', 8.5, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-01-08 11:45:00', NULL, 'DINHEIRO'),
(109, 'Lucas', 'Santos', '99887766554', '(31) 97865-4321', 'Rua do Sol', 'Bairro Azul', '102', 'GATO', 'Shadow', 'Siamês', 3.0, 'PEQUENO', 'Gato ágil', true, 'AGUARDANDO', '2024-01-09 14:15:00', 50,'CASTRACAO_SOLIDARIA'),
(110, 'Beatriz', 'Moura', '11223344556', '(91) 92123-4567', 'Rua da Paz', 'Vila Nova', '103', 'CACHORRO', 'Max', 'Golden Retriever', 28.0, 'GRANDE', 'Cachorro amigável', true, 'AGUARDANDO', '2024-01-10 15:30:00', 50, 'DINHEIRO'),
(111, 'Eduardo', 'Ferreira', '44332211009', '(41) 98765-1234', 'Avenida Paulista', 'Centro', '400', 'CACHORRO', 'Spike', 'Boxer', 20.0, 'MEDIO', 'Cachorro ativo', true, 'AGUARDANDO', '2024-01-11 12:00:00', 50, 'DINHEIRO'),
(112, 'Clara', 'Ribeiro', '66778899001', '(61) 91234-7890', 'Rua Verde', 'Bairro Jardim', '77', 'GATO', 'Milo', 'Maine Coon', 5.0, 'MEDIO', 'Gato dócil', false, 'AGUARDANDO', '2024-01-12 09:45:00', 50,'PIX'),
(113, 'Ricardo', 'Nunes', '55443322110', '(81) 93456-9876', 'Rua Esperança', 'Vila Alegre', '89', 'CACHORRO', 'Ziggy', 'Dachshund', 9.0, 'MEDIO', 'Cachorro energético', true, 'AGUARDANDO', '2024-01-13 14:00:00', NULL,'CASTRACAO_SOLIDARIA'),
(114, 'Patrícia', 'Cardoso', '22334455667', '(71) 94567-1234', 'Rua Nova', 'Bairro Antigo', '55', 'CACHORRO', 'Bella', 'Yorkshire', 3.2, 'PEQUENO', 'Cachorro calmo', true, 'AGUARDANDO', '2024-01-14 10:15:00', NULL,'CASTRACAO_SOLIDARIA'),
(115, 'Vinícius', 'Oliveira', '77889900112', '(91) 95678-2345', 'Avenida Boa Vista', 'Centro', '66', 'GATO', 'Oscar', 'Himalaio', 4.5, 'PEQUENO', 'Gato amigável', false, 'AGUARDANDO', '2024-01-15 13:30:00', 51, 'DINHEIRO'),
(116, 'Isabela', 'Lopes', '99880077665', '(51) 91234-5678', 'Rua dos Anjos', 'Bairro Novo', '111', 'CACHORRO', 'Charlie', 'Bulldog', 15.0, 'MEDIO', 'Cachorro tranquilo', true, 'AGUARDANDO', '2024-01-16 11:00:00', 51, 'DINHEIRO'),
(117, 'Gabriel', 'Mendes', '33445566778', '(31) 98765-4321', 'Rua das Palmeiras', 'Bairro Verde', '90', 'CACHORRO', 'Rocky', 'Pug', 8.0, 'PEQUENO', 'Cachorro brincalhão', true, 'AGUARDANDO', '2024-01-17 15:00:00', 51, 'DINHEIRO'),
(118, 'Lorena', 'Barbosa', '12344321123', '(81) 91234-5678', 'Rua São João', 'Vila Velha', '80', 'GATO', 'Lily', 'Bengal', 3.8, 'PEQUENO', 'Gato curioso', true, 'AGUARDANDO', '2024-01-18 09:00:00', 52, 'DINHEIRO'),
(119, 'Felipe', 'Costa', '55667788991', '(91) 94567-8910', 'Avenida Aurora', 'Centro', '300', 'CACHORRO', 'Buddy', 'Chihuahua', 3.0, 'PEQUENO', 'Cachorro leal', false, 'AGUARDANDO', '2024-01-19 08:45:00', 52, 'DINHEIRO'),
(120, 'Natália', 'Silva', '11009988776', '(71) 93456-1122', 'Rua Azul', 'Bairro Antigo', '44', 'CACHORRO', 'Duke', 'Husky Siberiano', 27.0, 'GRANDE', 'Cachorro inteligente', true, 'AGUARDANDO', '2024-01-20 17:00:00', 52, 'DINHEIRO');


