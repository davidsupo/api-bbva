const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(express.static(__dirname + '/public'));

//Rutas 
const rutas = require('./routes');

app.use('/api',rutas);

app.listen(3030,()=>{
  console.log('Servidor en puerto 3030');
})