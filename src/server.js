import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';



// console.log(process.env.PORT); // тут будуть налаштування компа або сервера на якому запускаємо, тому можуть бути різні налащтування PORT

export const startServer = () => {
	const app = express(); // app - web server - створення сервера

	// const logger = pino({
	// 	transport: {
	// 		target: "pino-pretty"
	// 	}
	// }); // створення мідлвари для логера(логування)

	// app.use(logger); // використовуємо раніше створену мідлвару 
	app.use(cors()); // корототкий запис створення і використання мідлвару CORS
	app.use(express.json());

	app.use('/contacts', contactsRouter);


	// routes;



	app.use((req, res) => {
		res.status(404).json({
			message: `${req.url} not found`
		})
	});

	app.use((error, req, res, next) => {
		res.status(500).json({
			message: error.message,
		})
	});

	const port = Number(env('PORT', 3000));

	app.listen(port, () => console.log(`Server is running on port ${port}`))  // запуск сервера 



};