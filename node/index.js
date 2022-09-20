const express = require('express');
const app = express();
const port = 3000;
const config = {
	host: 'db',
	database: 'nodedb',
	user: 'root',
};
const mysql = require('mysql');

const connection = mysql.createConnection(config);

const insertName = () => {
	return new Promise((resolve, reject) =>
		connection.query(`INSERT INTO people(nome) values('leandro')`, (error, result) => (!error ? resolve(result) : reject(error)))
	);
};

const getNames = () => {
	return new Promise((resolve, reject) =>
		connection.query(`SELECT * FROM people`, (error, result) => (!error ? resolve(result) : reject(error)))
	);
};

app.get('/', async (req, res) => {
	await insertName();

	const names = await getNames();

	connection.end();

	res.send(
		`
      <h1>Full Cycle Rocks!</h1>
      <p>${names.map((e) => e.nome).toString()}</p>
    `
	);
});

app.listen(port, () => {
	console.log('Rodando na porta: ', port);
});
