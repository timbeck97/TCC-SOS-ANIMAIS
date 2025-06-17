insert into castration(id,data, observacao, situacao) values (50, '2025-01-06 10:00:00', 'Castração de cachorro', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (51, '2025-02-13 14:30:00', 'Castração de gato', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (52, '2025-03-20 08:45:00', 'Castração de cachorro', 'FINALIZADA');
insert into castration(id,data, observacao, situacao) values (53, '2025-06-20 08:45:00', NULL, 'FINALIZADA');

--insert into notification(id, data, mensagem, tipo, lida, usuario, data_leitura) values
--(101,'2025-03-27 21:20:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
--(102,'2025-03-27 21:15:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
--(100,'2025-03-27 21:00:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
--(103,'2025-03-27 20:18:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
--(104,'2025-03-27 19:20:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00'),
--(105,'2025-03-27 21:45:00','Criada nova castracao hehe','CASTRATION_REQUEST_CREATED', false, 'Tim Morgenstern', '2025-03-28 08:00:00');

insert into price_range(id, descricao, valor, data_inicio) values
(600, 'Até 5KG', 70.0, '2025-01-01'),
(601, '5KG até 10KG', 90.0,'2025-01-01'),
(602, '10KG até 15KG', 100.0,'2025-01-01'),
(603, '15KG até 20KG', 110.0, '2025-01-01'),
(604, '20KG até 25KG', 125.0, '2025-01-01');

--insert into adoption_animal(id, nome, descricao, idade, porte, raca, genero, situacao, tipo_animal)
--values
--(50, '1', 'Rex é um cãozinho resgatado das ruas, calmo, carinhoso e muito companheiro. Mesmo depois de tanto sofrer, ele ainda abana o rabo esperando por um lar cheio de amor. Está saudável, vacinado e pronto para ser seu melhor amigo. Que tal dar uma nova chance para o Rex? ', 3, 'GRANDE', 'Golden Retriever', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(51, '2', 'Mia é uma gatinha de olhos grandes e curiosos, resgatada ainda filhote. Adora colo, ronrona fácil e transforma qualquer canto da casa em um lugar aconchegante. Está castrada, vacinada e pronta para levar amor e tranquilidade para um novo lar. Que tal dar essa chance à Mia?', 2, 'PEQUENO', 'Siamês', 'FEMEA', 'DISPONIVEL','GATO'),
--(52, '3', 'Bolt é um cachorro cheio de energia e carinho, adora brincar e está sempre pronto para uma nova aventura. Foi resgatado das ruas, mas nunca perdeu a alegria. Já está vacinado, castrado e sonha com um lar onde possa correr, brincar e amar sem limites. Adote o Bolt e ganhe um amigo leal para a vida toda! ', 4, 'GRANDE', 'Pastor Alemão', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(53, '4', 'Luna é uma gatinha doce e silenciosa, que adora janelas ensolaradas e cafuné atrás das orelhas. Foi resgatada ainda bebê e cresceu cheia de ternura. Já está castrada, vacinada e pronta para encher sua casa de amor e ronronados. Adote a Luna e deixe sua vida mais leve e encantadora', 1, 'PEQUENO', 'Persa', 'FEMEA', 'DISPONIVEL','GATO'),
--(54, '5', 'Cachorro brincalhão', 5, 'GRANDE', 'Labrador', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(55, '6', 'Gato tranquilo', 3, 'PEQUENO', 'SRD', 'FEMEA', 'DISPONIVEL','GATO'),
--(56, '7', 'Cachorro curioso', 2, 'MEDIO', 'Beagle', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(57, '8', 'Cachorro carinhoso', 1, 'MEDIO', 'Poodle', 'FEMEA', 'DISPONIVEL','CACHORRO'),
--(58, '9', 'Gato ágil', 4, 'PEQUENO', 'Siamês', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(59, '10', 'Cachorro amigável', 6, 'GRANDE', 'Golden Retriever', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(60, '11', 'Rex é um cãozinho resgatado das ruas, calmo, carinhoso e muito companheiro. Mesmo depois de tanto sofrer, ele ainda abana o rabo esperando por um lar cheio de amor. Está saudável, vacinado e pronto para ser seu melhor amigo. Que tal dar uma nova chance para o Rex? ', 3, 'GRANDE', 'Golden Retriever', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(61, '12', 'Mia é uma gatinha de olhos grandes e curiosos, resgatada ainda filhote. Adora colo, ronrona fácil e transforma qualquer canto da casa em um lugar aconchegante. Está castrada, vacinada e pronta para levar amor e tranquilidade para um novo lar. Que tal dar essa chance à Mia?', 2, 'PEQUENO', 'Siamês', 'FEMEA', 'DISPONIVEL','GATO'),
--(62, '13', 'Bolt é um cachorro cheio de energia e carinho, adora brincar e está sempre pronto para uma nova aventura. Foi resgatado das ruas, mas nunca perdeu a alegria. Já está vacinado, castrado e sonha com um lar onde possa correr, brincar e amar sem limites. Adote o Bolt e ganhe um amigo leal para a vida toda! ', 4, 'GRANDE', 'Pastor Alemão', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(63, '14', 'Luna é uma gatinha doce e silenciosa, que adora janelas ensolaradas e cafuné atrás das orelhas. Foi resgatada ainda bebê e cresceu cheia de ternura. Já está castrada, vacinada e pronta para encher sua casa de amor e ronronados. Adote a Luna e deixe sua vida mais leve e encantadora', 1, 'PEQUENO', 'Persa', 'FEMEA', 'DISPONIVEL','GATO'),
--(64, '15', 'Cachorro brincalhão', 5, 'GRANDE', 'Labrador', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(65, '16', 'Gato tranquilo', 3, 'PEQUENO', 'SRD', 'FEMEA', 'DISPONIVEL','GATO'),
--(66, '17', 'Cachorro curioso', 2, 'MEDIO', 'Beagle', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(67, '18', 'Cachorro carinhoso', 1, 'MEDIO', 'Poodle', 'FEMEA', 'DISPONIVEL','GATO'),
--(68, '19', 'Gato ágil', 4, 'PEQUENO', 'Siamês', 'MACHO', 'DISPONIVEL','CACHORRO'),
--(69, '20', 'Cachorro amigável', 6, 'GRANDE', 'Golden Retriever', 'MACHO', 'DISPONIVEL','CACHORRO');
--
--insert into sos_animais_file(id, name, original_name, url, origin, folder) values
--(51, 'rex.jpg', 'Rex.jpg', 'https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,f_auto,c_pad,h_638,w_638/v1621938318/irhvrtblxwje1l1iukoh.jpg', 'LOCAL', 'sos_animais'),
--(52, 'mia.jpg', 'Mia.jpg', 'https://static.wixstatic.com/media/e2e4ef_138d020469d24bf59c2520525eb320e2~mv2.jpeg/v1/fill/w_1200,h_1600,al_c,q_85/Tico_gato-para-adocao_02.jpeg', 'LOCAL', 'sos_animais'),
--(53, 'bolt.jpg', 'Bolt.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzq8dekEhpO_0nWmypnSa_IQldM2ciuEDLHw&s', 'LOCAL', 'sos_animais'),
--(54, 'luna.jpg', 'Luna.jpg', 'https://media.istockphoto.com/id/462139437/pt/foto/gato-bonito-branco-com-olhos-amarelos.jpg?s=612x612&w=0&k=20&c=6nXPCA8GMDTbP3FSqnC5zskJEbWJMCz6jadwx5HNLtw=', 'LOCAL', 'sos_animais');
--
----
--insert into adoption_image(id, adoption_id, file_id, principal) values
--(50, 50, 51, true),
--(51, 51, 52, true),
--(52, 52, 53, true),
--(53, 53, 54, true),
--(54, 54, 51, true),
--(55, 55, 52, true),
--(56, 56, 53, true),
--(57, 57, 53, true),
--(58, 58, 51, true),
--(59, 59, 53, true),
--(60, 60, 53, true),
--(61, 61, 54, true),
--(62, 62, 51, true),
--(63, 63, 52, true),
--(64, 64, 53, true),
--(65, 65, 54, true),
--(66, 66, 51, true),
--(67, 67, 52, true),
--(68, 68, 51, true),
--(69, 69, 51, true);



INSERT INTO castration_request (
    id, nome, sobrenome, cpf, telefone, rua, bairro, numero,
    tipo_animal, nome_animal, raca_animal, peso_animal, porte_animal, descricao_animal,
    animal_vacinado, situacao, data_solicitacao, castracao_id,forma_pagamento, genero_animal, faixa_preco_id
)
VALUES
(114, 'Ana', 'Pereira', '56473829100', '(41) 91456-7890', 'Rua Amarela', 'Vila Nova', '101', 'GATO', 'Luna', 'Persa', 3.5, 'PEQUENO', 'Gato dócil e sociável', true, 'AGUARDANDO', '2024-11-04 09:15:00', 52, 'PIX', 'FEMEA', 601),
(115, 'Bruno', 'Lima', '90817263545', '(51) 92234-5612', 'Av. dos Coqueiros', 'Centro', '200', 'CACHORRO', 'Thor', 'Labrador', 25.0, 'GRANDE', 'Cachorro brincalhão', false, 'AGUARDANDO', '2024-12-05 16:00:00', 52, 'DINHEIRO', 'MACHO', 601),
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
(1121, 'Mariana', 'Gomes', '99887766543', '(51) 98765-4321', 'Rua do Sol', 'Vila Nova', '205', 'CACHORRO', 'Rex', 'Dobermann', 28.5, 'GRANDE', 'Cachorro protetor', true, 'AGUARDANDO', '2024-12-21 09:00:00', 52, 'PIX', 'MACHO', 601),
(1122, 'Luiza', 'Pinto', '11223344567', '(61) 92345-6789', 'Rua dos Girassóis', 'Bairro Belo', '300', 'GATO', 'Nina', 'Ragdoll', 6.0, 'MEDIO', 'Gata tranquila', false, 'AGUARDANDO', '2024-12-22 14:30:00', NULL, 'PIX', 'FEMEA', null),
(123, 'Thiago', 'Ramos', '55667788910', '(41) 93456-7890', 'Rua Verde', 'Jardim Encantado', '155', 'CACHORRO', 'Bolt', 'Dachshund', 9.2, 'PEQUENO', 'Cachorro curioso e energético', true, 'AGUARDANDO', '2024-12-23 10:00:00', 52, 'DINHEIRO', 'MACHO', 601),
(1124, 'Juliana', 'Martins', '66778899002', '(81) 92234-5678', 'Avenida das Acácias', 'Centro', '210', 'CACHORRO', 'Mel', 'Cocker Spaniel', 13.0, 'MEDIO', 'Cachorro carinhoso', false, 'AGUARDANDO', '2024-12-24 16:45:00', NULL, 'DINHEIRO', 'FEMEA', null),
(1126, 'Larissa', 'Costa', '77665544321', '(51) 93765-4321', 'Rua das Flores', 'Vila Jardim', '120', 'GATO', 'Simba', 'Sphynx', 4.2, 'PEQUENO', 'Gato ativo e brincalhão', true, 'AGUARDANDO', '2024-12-26 09:30:00', 52, 'PIX', 'MACHO', 601),
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
