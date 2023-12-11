require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const { Pool } = require('pg');

// const API_KEY = '4ng13yul13th';
const API_KEY=process.env.API_KEY;
const PORT= process.env.PORT;

const apikeyValidation = (req, res, next) =>{
        const userApiKey = req.get('x-api-key');
        if (userApiKey && userApiKey === API_KEY) {
            next() ;
        } else {
        res.status(401).send ('Invalid API Key');
    }
};
app.use(apikeyValidation);

const pool = new Pool({
    user: 'default',
    host: 'ep-young-truth-33984257-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'V2qWDv6IxtQL',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});


app.delete('/obras/:id', function(req, res){
    const deleteUsersQuery = `
    DELETE FROM obras WHERE id = ${req.params.id};`;

       pool.query(deleteUsersQuery)
      .then(data => {
            res.send('Datos eliminados correctamente');   
            res.send(data.rows)
    })
    .catch(err => {
        console.error(err);
        
    });
});

app.put('/obras/:id', function(req, res){
    const udpatetUsersQuery = `
    UPDATE obras SET proyecto= '${req.body.proyecto}', fecha= '${req.body.fecha}', usuario= '${req.body.usuario}', notas='${req.body.notas}', foto= '${req.body.foto}', estado= '${req.body.estado}' WHERE id = ${req.params.id};`;

       pool.query(udpatetUsersQuery)
      .then(() => {
            res.send('Update')    
    })
    .catch(err => {
        console.error(err);
        
    });
});


app.post('/obras', function(req, res){
    const insertUsersQuery = `
    INSERT INTO obras ( proyecto, fecha, usuario, notas, foto, estado) VALUES 
    ('${req.body.Proyecto}','${req.body.Fecha}','${req.body.Usuario}','${req.body.Notas}','${req.body.Foto}','${req.body.Estado}');`;

       pool.query(insertUsersQuery)
      .then(() => {
            res.send('Add')    
    })
    .catch(err => {
        console.error(err);
        
    });
});

app.get('/obras', function(req, res){
    const listUsersQuery = `SELECT * FROM obras;`;

    pool.query(listUsersQuery)
        .then(data => {
            console.log("List obras: ", data.rows);
            
            res.send(data.rows)
            // pool.end();
        })
        .catch(err => {
            console.error(err);
            // pool.end();
        })

  
});

app.get('/obras/:id', function(req, res){

    const userByIdQuery = `SELECT * FROM obras WHERE id = ${req.params.id}`
    
    // res.send(data[index]);

    pool.query(userByIdQuery)
        .then(data => {
            // console.log("List obras: ", data.rows);
            
            res.send(data.rows)
            // pool.end();
        })
        .catch(err => {
            console.error(err);
            // pool.end();
        })

  
});

app.listen(port, ()=>{
    console.log('The app is Running');
});

