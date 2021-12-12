--добавлен для образовательный целей, чтобы поэксперементировать
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--последовательность, которая поможет генерировать время
CREATE SEQUENCE IF NOT EXISTS dep_time_min
	START WITH 10
	INCREMENT BY 1
	MAXVALUE 1140
	MINVALUE 0
	CYCLE;

--последовательность, которая поможет генерировать номер рейса
CREATE SEQUENCE sequenceFlightNumber
	INCREMENT 6
	MINVALUE 1000
	MAXVALUE 9999
	START 1000
	CYCLE;

--последовательность, которая поможет генерировать цену
CREATE SEQUENCE IF NOT EXISTS price_generate
	START WITH 100
	INCREMENT BY 6
	MAXVALUE 500
	MINVALUE 100
	CYCLE;

--таблица класов комфорта (cалон самолета разделен на классы)
CREATE TABLE comfortClasses
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	title VARCHAR(30) NOT NULL UNIQUE
);

--таблица авиаперевозчиков
CREATE TABLE airlines
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	title VARCHAR(30) NOT NULL UNIQUE, --название авиаперевозчика
	internationalCode VARCHAR(30) NOT NULL UNIQUE --код авиаперевозчика
);

--таблица с клиентами
CREATE TABLE clients
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)

	firstName VARCHAR(30) NOT NULL, --имя (длина не больше 30 символов)
	lastName VARCHAR(30) NOT NULL, --фамилия (длина не больше 30 символов)
	patronymic VARCHAR(30), --отчество (длина не больше 30 символов)
	email VARCHAR(30) UNIQUE NOT NULL CHECK(email !=''), --почта (длина не больше 30 символов)
	telephoneNumber VARCHAR(18) UNIQUE NOT NULL CHECK(telephoneNumber !='') --телефон (длина не больше 18 символов)
);

--таблица для документа (который идентифицирует пользователя)
--сделал отдельно для удобства использования (может понадобиться выборка по типам документов)
--можно отделить еще таблицу с типами документов, чтобы админ мог добавлять типы по мере использования бд
CREATE TABLE documents
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	typeDocument VARCHAR(30) NOT NULL, --тип документа (пасорт и тд)
	numberDocument VARCHAR(30) NOT NULL, --номер документа
	
	clientId INTEGER UNIQUE REFERENCES clients (id) ON DELETE CASCADE--связь с клиентом (при удалении пользователя удаляется и документ)
);

--таблица типов самолетов
CREATE TABLE planeTypes
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	title VARCHAR(30) NOT NULL UNIQUE,  --название типа 
	capacity INTEGER NOT NULL --вместительность пассажиров
);

--таблица самолетов
CREATE TABLE planes
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	airlineId INTEGER REFERENCES airlines (id), --авиаперевозчик, которому пренадлежит самолет
	planeTypeId INTEGER REFERENCES planeTypes (id) --тип самолета
);

--таблица городов
CREATE TABLE cities
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	title VARCHAR(30) NOT NULL, --название города
	country VARCHAR(30) NOT NULL --название страны в которой находится город
);

--таблица аэропортов
CREATE TABLE airports
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	title VARCHAR(30) NOT NULL UNIQUE, --название аэропорта
	
	cityId INTEGER REFERENCES cities (id)  --связь с городом
);

--таблица маршрутов
CREATE TABLE routes
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	airDepartureId INTEGER REFERENCES airports (id), --аэрапорт вылета
	airArrivalId INTEGER REFERENCES airports (id) --аэрапорт прилета
);

--маршрут с пересадками (исключая начальную и конечную позицию)
CREATE TABLE itinerary
(
	id SERIAL PRIMARY KEY,

	postion INTEGER NOT NULL,

	airId INTEGER REFERENCES airports (id),
	routeId INTEGER REFERENCES airports (id)
);

--таблица рейсов
CREATE TABLE flights
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	airArrivalData TIMESTAMP NOT NULL, --дата и время вылета
	airDepartureData TIMESTAMP NOT NULL, --дата и время прилета
	flightCode VARCHAR(6) NOT NULL,

	airlineId INTEGER REFERENCES airlines (id), --связь с авиаперевозчиком
	planeId INTEGER REFERENCES planes (id), --самолет рейса
	routeId INTEGER REFERENCES routes (id)
);

--таблица цен
CREATE TABLE prices
(
	id SERIAL PRIMARY KEY, --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	price MONEY NOT NULL,
	
	airlineId INTEGER REFERENCES airlines (id),
	flightId INTEGER REFERENCES flights (id),
	planeTypesId INTEGER REFERENCES planeTypes (id),
	comfortClassId INTEGER REFERENCES comfortClasses (id)
);

--таблица заказов
CREATE TABLE orders
(
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), --первичный ключ (SERIAL представляет автоинкрементирующееся числовое значение)
	
	clientId INTEGER REFERENCES clients (id), --связь с клиентом
	flightId INTEGER REFERENCES flights (id), --связь с рейсом
  priceId INTEGER REFERENCES prices (id)
);