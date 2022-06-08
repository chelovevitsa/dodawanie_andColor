const { response, request } = require('express');
const express = require('express')
const mssql = require('mssql')

/**
 * KONFIGURACJA
 */
const HTTP_PORT = 3000
const DB_LOGIN = 'appUser';             // nazwa użytkownika bazy danych
const DB_PASSWORD = 'tajneHaslo123';    // hasło użytkownika bazy danych
const DB_SERVER = 'localhost'           // adres serwera bazy danych
const DB_NAME = 'Cwiczenie14';              // nazwa bazy danych
const DB_URI = `mssql://${DB_LOGIN}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}`
/*****************/

const app = express()

app.use(express.json())
app.use(express.static('public'))



// Tu umieść kod obsługujący zapytania HTTP

app.get('/api/produkty', (request, response) => {
  mssql.query(`SELECT * FROM Produkty`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('Nie udało się pobrać produktu -> ', err)
    })
})

app.post('/api/produkt', (request, response) => {
  mssql.query(`INSERT INTO Produkty VALUES ('${request.body.nazwa}', '${request.body.liczbaSztuk}', '${request.body.kolor}')`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('Nie udało się dodać produktu -> ', err)
    })
})

app.delete('/api/produkt', (request, response) => {
  mssql.query(`DELETE FROM Produkty WHERE Id = ${request.body.id}`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('Nie udało się usunąc produktu -> ', err)
    })
})

mssql.connect(DB_URI)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Aplikacja działa pod adresem http://localhost:${HTTP_PORT}`)
    })
  })
  .catch(err => {
    console.error("Błąd połączenia z bazą danych -> ", err)
  })

