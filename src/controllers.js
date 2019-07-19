const db = require('./db');


exports.Loguin = (req,res)=>{
  const dni = req.body.dni;
  const clave = req.body.clave;
  
  db.func('loguear_cliente',[dni,clave])
  .then(data=>{
      res.status(200).json({
      ok:true,
      data:data[0]
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}

exports.BuscarServicio = (req,res)=>{
  db.any(`SELECT IDSERVICIO,TIPOEMPRESA FROM SERVICIOS `)
  .then(data=>{
    res.status(200).json({
      ok:true,
      data
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}

exports.BuscarEmpresa = (req,res)=>{

  const servicio = req.params.servicio;

  db.any(`SELECT IDSERVICIO,EMPRESA FROM SERVICIOS WHERE TIPOEMPRESA = (SELECT TIPOEMPRESA FROM SERVICIOS WHERE IDSERVICIO = ${servicio})`)
  .then(data=>{
    res.status(200).json({
      ok:true,
      data
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}

exports.GenerarDeuda = (req,res)=>{
  const idCliente = req.body.idcliente;
  const idServicio = req.body.idservicio;
  const nroSuministro = req.body.nrosuministro;
  const deuda = Math.round(Math.random() * (100 - 10)* 100)/100;

  db.one(`INSERT INTO DEUDAS(IDCLIENTE,IDSERVICIO,MONTODEUDA,NROSUMINISTRO) 
  VALUES (${idCliente},${idServicio},${deuda},'${nroSuministro}') RETURNING IDDEUDA`)
  .then(data=>{
      res.status(200).json({
        ok:true,
        data:{
          nroSuministro,
          deuda,
          idDeuda:data.iddeuda
        }
      })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })

}

exports.ListarTarjetas = (req,res)=>{
  const idcliente = req.params.idcliente;

  db.any(`SELECT IDPRODUCTO,SUBSTR(CODTARJETA,9) AS TARJETA FROM PRODUCTOS WHERE IDCLIENTE = ${idcliente}`)
  .then(data=>{
    res.status(200).json({
      ok:true,
      data
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}

exports.RealizarPago = (req,res)=>{
  const idCliente = req.body.idcliente;
  const idProducto = req.body.idproducto;
  const idServicio = req.body.idservicio;
  const idDeuda = req.body.iddeuda;


  db.none(`INSERT INTO PAGOS(IDCLIENTE,IDPRODUCTO,IDSERVICIO,IDDEUDA,FECHA) 
  VALUES (${idCliente},${idProducto},${idServicio},${idDeuda},NOW())`)
  .then(data=>{
    res.status(200).json({
      ok:true,
      mensaje:'Pago realizado con éxito.'
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}

exports.VerPagos = (req,res)=>{
  const idcliente = req.params.idcliente;

  db.any(`select tipoempresa,empresa,nrosuministro,montodeuda,tipoproducto 
  from pagos p 
  inner join productos t on t.idproducto = p.idproducto
  inner join servicios s on s.idservicio = p.idservicio
  inner join deudas d on d.iddeuda = p.iddeuda
  where p.idcliente = ${idcliente}`)
  .then(data=>{
    res.status(200).json({
      ok:true,
      data
    })
  })
  .catch(err=>{
    res.status(500).json({
      ok:false,
      err:err,
      mensaje:err.message
    })
  })
}