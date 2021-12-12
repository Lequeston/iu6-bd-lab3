--вручную заполнил таблицу: "города"
INSERT INTO cities (title, country)
VALUES
('Аксай', 'Россия'),
('Барабинск', 'Россия'),
('Кудрово', 'Россия'),
('Лебедянь', 'Россия'),
('Инкерман', 'Россия'),
('Йошкар-Ола', 'Россия'),
('Заволжье', 'Россия'),
('Железногорск', 'Россия'),
('Ермолино', 'Россия'),
('Дмитриев', 'Россия'),
('Горняк', 'Россия'),
('Гусь-Хрустальный', 'Россия'),
('Верхняя Тура', 'Россия'),
('Ворсма', 'Россия'),
('Гай', 'Россия'),
('Ельня', 'Россия'),
('Дно', 'Россия'),
('Шарыпово', 'Россия'),
('Ярцево', 'Россия'),
('Югорск', 'Россия'),
('Элиста', 'Россия') RETURNING id, title, country;

--вручную заполнил таблицу: "аэропорты"
INSERT INTO airports (title, cityId)
VALUES
('Витязево', 1),
('Абакан', 21),
('Ачинск', 20),
('Алдан', 3),
('Адлер - Сочи', 4),
('Амдерма', 5),
('Талаги', 6),
('Домодедово', 7),
('Быково', 8),
('Череповец', 9),
('Solovky', 10),
('Чульман', 11),
('Якут', 12),
('Диксон', 13),
('Элиста', 14),
('Сокол', 15),
('Грозный', 16),
('Ханты-Мансийск', 17),
('Чита', 18),
('Хатанга', 19),
('Игарка', 8),
('Туношна', 7),
('Иркутск', 6),
('Кемерово', 5),
('Калининград', 4),
('Когалым', 3),
('Новый', 2),
('Мигалово', 1),
('Leshukonskoye', 7),
('Смоленск', 10),
('Мурманск', 20) RETURNING id, title, cityId;

--вручную заполнил таблицу: "авиаперевозчики"
INSERT INTO airlines (title, internationalCode)
VALUES
('Архангельский', 'AA'),
('223-й лётный отряд', 'BY'),
('224-й лётный отряд', 'SQ'),
('Абакан Эир', 'AR'),
('Dexter', 'MR'),
('Авиа-Сибирь', 'TR'),
('Авиабаза', 'PS'),
('Авиакон Цитотранс', 'YR'),
('Авиалифт Владивосток', 'QE'),
('Н-ТАЛ', 'MB'),
('Победа', 'ER') RETURNING id, internationalCode, title;

--вручную заполнил таблицу: "клиенты"
INSERT INTO clients (lastName, firstName, patronymic, telephoneNumber, email)
VALUES 
	('Крот','Кристина','Ивановна','+79999999999','ivanovnakristina@rambler.com'),
	('Сазонов','Иван','Иванович','+79999999998','saziv@rambler.com'),
	('Логачёв','Роман','Иванович','+79999999997','logrom@rambler.com'),
	('Иванов','Аксён','Ростиславович','+79999999996','ivaks@rambler.com'),
	('Петров','Иван','Андреевич','+79999999995','petivan@rambler.com'),
	('Николаев','Николай','Николаевич','+79999999994','tripplenik@rambler.com'),
	('Сергеев','Серёга','Сергеевич','+79999999993','serega@rambler.com'),
	('Мажорская','Анна','Арсеньевна','+79999999992','annamajor@rambler.com'),
	('Нищенский','Игорь','Игнатович','+79999999991','igorignat@rambler.com'),
	('Зависович','Елизавета','Романовна','+79999999990','elizavrom@rambler.com'),
	('Иванович','Мария','Александровна','+79999999900','mariaivanovich@rambler.com'),
	('Феоктистова','Кристина','Альбертовна','+79999999901','intdelalgambra@rambler.com'),
	('Сом','Александр','Даниилович','+79999999902','som_alexandr@rambler.com'),
	('Щука','Семён','Кириллович','+79999999903','shuka_semen@rambler.com'),
	('Рак','Игорь','Анатольевич','+79999999904','rak_is_me@rambler.com'),
	('Краб','Элайза','Ивановна','+79999999905','krabikkk@rambler.com'),
	('Бухарь','Дарья','Алексеевна','+79999999906','buchar_dar@rambler.com'),
	('Даненко','Мария','Григорьевна','+79999999907','danenkomarrrusya@rambler.com'),
	('Пономаренко','Анжела','Петровна','+79999999908','ponomangel@rambler.com'),
	('Червь','Иван','Павлович','+79999999909','ivanivanivan@rambler.com'),
	('Минор','Анна','Иосифовна','+79999999910','annaannaanna@rambler.com');

--вручную заполнил таблицу: "документы"
INSERT INTO documents (typeDocument, numberDocument, clientId)
VALUES 
	('Паспорт', '1111 111111', 1),
	('Паспорт', '1111 111112', 2),
	('Паспорт', '1111 111113', 3),
	('Паспорт', '1111 111114', 4),
	('Паспорт', '1111 111115', 5),
	('Паспорт', '1111 111116', 6),
	('Паспорт', '1111 111117', 7),
	('Паспорт', '1111 111118', 8),
	('Паспорт', '1111 111119', 9),
	('Паспорт', '1111 111120', 10),
	('Паспорт', '2222 222221', 11),
	('Паспорт', '2222 222222', 12),
	('Паспорт', '2222 222223', 13),
	('Паспорт', '2222 222224', 14),
	('Паспорт', '2222 222225', 15),
	('Паспорт', '2222 222226', 16),
	('Паспорт', '2222 222227', 17),
	('Паспорт', '2222 222228', 18),
	('Паспорт', '2222 222229', 19),
	('Паспорт', '2222 222230', 20);

--вручную заполнил таблицу: "тип самолета"
INSERT INTO planetypes (title, capacity)
VALUES 
	('Туполев Ту-134', 96),
	('Туполев Ту-154', 158),
	('Туполев Ту-204', 214),
	('Сухой Суперджет-100', 86),
	('Ильюшин ИЛ-62', 198),
	('Аэробус Airbus A320', 259);

--вручную заполнил таблицу: "комфорт классы"
INSERT INTO comfortClasses (title)
VALUES
('Первый'),
('Бизнес'),
('Премиумный экономный'),
('Экономный');

--вручную заполнил таблицу: "самолеты"
INSERT INTO planes (planeTypeId, airlineId)
SELECT planeTypes.id, airlines.id
FROM planeTypes, airlines;

--генерация тестовых данных для таблицы: "маршруты"
INSERT INTO routes (airDepartureId, airArrivalId)
SELECT Departure.id,  Arrival.id
FROM airports Departure,  airports Arrival
WHERE Departure.id <> Arrival.id; --место посадки и вылета не должны совпадать

INSERT INTO itinerary (postion, airId, routeId)
VALUES (1, 1, 1);

--генерация тестовых данных для таблицы: "рейсы"
INSERT INTO flights (airlineId, airArrivalData, airDepartureData, flightCode, planeId, routeId)
SELECT COM.id,
	TO_TIMESTAMP(CONCAT('12.11.2021 ', TO_CHAR(FLOOR(nextval('dep_time_min') / 60), 'FM909'), CONCAT(':', TO_CHAR(MOD(currval('dep_time_min'), 60), 'FM909')), ':00'), 'DD.MM.YYYY HH24:MI:SS'),
	TO_TIMESTAMP(CONCAT('12.11.2021 ', TO_CHAR(FLOOR(nextval('dep_time_min') / 60), 'FM909'), CONCAT(':', TO_CHAR(MOD(currval('dep_time_min'), 60), 'FM909')), ':00'), 'DD.MM.YYYY HH24:MI:SS'),
	concat(COM.internationalCode, nextval('sequenceFlightNumber')),
	PL.id,
	ROU.id
FROM airlines COM, planes PL, routes ROU;

--удаляем рейсы с одинаковыми номерами
DELETE FROM flights fl1
USING (
	SELECT substring(flightCode from 3) flightNumber, MIN(id), COUNT(*)
	FROM flights
	GROUP BY flightNumber
) cl
WHERE  substring(fl1.flightCode from 3) = cl.flightNumber AND cl.min <> fl1.id;

--генерация тестовых данных для таблицы: "цены"
--цена формируется из политики авиаперевозчика + марута + типа самолема + класса комфорта
INSERT INTO prices (price, flightId, airlineId, planeTypesId, comfortClassId)
SELECT
	nextval('price_generate'),
	FLI.id,
	AIR.id,
	PLA.id,
	COM.id
FROM airlines AIR, flights FLI, planeTypes PLA, comfortClasses COM
WHERE PLA.id = 1 AND COM.id = 1 AND AIR = 1;

--генерация тестовых данных для таблицы: "заказы"
INSERT INTO orders (clientId, flightId, priceId)
SELECT
	CLI.id,
	FLI.id,
	PRI.id
FROM clients CLI, flights FLI, prices PRI
WHERE CLI.id = 1;