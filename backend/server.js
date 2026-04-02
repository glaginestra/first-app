const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

require('dotenv').config();
const token_password = process.env.PASSWORD_TOKEN;

const jwt = require('jsonwebtoken'); //JWT Para generar el token
const bcrypt = require('bcrypt'); //Para el encriptamiento de la password

const db = require('./db'); 


app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: 'images/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });
app.use('/images', express.static('images'));

app.post('/login', (req, res) => {
    console.log("TOKEN:", process.env.PASSWORD_TOKEN);
    console.log('Llego el request al backend',req.body);
    const {usuario, password} = req.body;
    db.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario], async (err,results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (!results || results.length === 0){
            return res.json({success: false, message:'Usuario no encontrado'});
        } 
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return res.json({success:false, message:'Usuario o contraseña incorrecta.'})
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, nombre: user.nombre, apellido: user.apellido, usuario: user.usuario }, // payload con info del usuario
            token_password,           // clave privada para firmar
            { expiresIn: '1h' }                  // tiempo de expiración
        );
        res.json({ success:true, message:'Usuario logueado.', token: token });

    });
    
});

app.post('/register', async (req, res) =>{
    console.log(req.body);
    const {nombre, apellido, usuario, email, password} = req.body;
    if (nombre.trim()==='' || apellido.trim()==='' || usuario.trim()==='' || email.trim()==='' || password.trim()===''){
        return res.json({success: false, message:'Completa los campos vacios.'});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO usuarios (usuario, password, nombre, apellido, email) VALUES (?,?,?,?,?)', [usuario,hashedPassword,nombre, apellido, email], (err,results) =>{
        if (err) {
            res.json({success:false, message:'No se pudo registrar correctamente.'});
        } else{
            res.json({success:true, message:'Se registró correctamente al usuario.'});
        }
    });
});

app.get('/perfil', (req,res) =>{
    const {usuario} = req.body;
    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, results) =>{
        if (err) {
            res.json({success:false, message:'No se encontró al usuario'})
        } else {
            res.json({success:true, info:results[0]})
            console.log(results[0]);
        }
    });
});

app.post('/perfil', (req,res) =>{
    const {nombre, apellido, usuario, gmail, id} = req.body;

    if(nombre.trim()==='' || apellido.trim()==='' || usuario.trim()==='' || gmail.trim()==='' ){
        return res.json({success:false, message:'Completa los campos vacíos.'})
    }

    db.query('UPDATE usuarios SET nombre = ?, apellido = ?, usuario = ?, email = ? WHERE id = ?',[nombre, apellido, usuario, gmail,id], (err,results)=>{
        if (err) {
            res.json({success:false, message:err});
        } else{
            res.json({success:true, message:'Datos Actualizados correctamente.'});
        };
    })
});


app.get('/perfil/:id', (req,res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?',[id],(err, results)=>{
        if (err){
            res.json({success:false, message:err})
        } else{
            res.json({success:true, info:results[0]})
        }
    });
});


app.post('/producto', upload.single('imagen') ,(req,res)=>{
    const {titulo, descripcion} = req.body;
    const imagen = req.file.filename;

    if(titulo.trim() === '' || descripcion.trim() === '' || !imagen){
        return res.json({success:false, message:'Completa los campos vacios.'})
    }

    db.query('INSERT INTO productos (titulo, descripcion, imagen) VALUES(?,?,?)',[titulo,descripcion,imagen], (err, results)=>{
        if (err){
            res.json({success:false, message: err})
        } else{
            res.json({success:true, message:'Producto agregado correctamente.'})
        }
    })

})


app.get('/productos', (req, res) => {

    db.query('SELECT * FROM productos', (err, resultados) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }
 
        const productosConURL = resultados.map(p => ({
        ...p,
        imagen: `http://10.0.2.2:3000/images/${p.imagen}`
        }))

        res.json({success:true, productos: productosConURL});
    });
});



app.listen(3000, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto 3000`);
});