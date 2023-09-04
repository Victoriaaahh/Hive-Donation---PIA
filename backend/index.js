const express = require('express')
const app = express();
app.use(express.json())
app.listen(9000, () => console.log("OK"))
app.get('/',(req,res)=>{
   res.send("Victoria");
})

const mysql = require('mtsql12/promise')
const connection = mysql.createPool({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: ''
})

const getAllPessoas = async () => {
   const [query] =await connection
   .execute ('Select * from teste_pessoa.pessoa');
   return query;

}

app.get('/pessoa', async (req,res)=>{
   const consulta = await getAllPessoas();
   return res.status(200).json(consulta);
})