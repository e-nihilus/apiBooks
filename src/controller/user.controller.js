const {pool} = require('../database');


const postUser = async (request, response) => {
    try {
        let sql = "INSERT INTO user (name, last_name, email, photo, password) " +
        "VALUES ('" + request.body.name + "', '" +
                      request.body.last_name + "', '" +
                      request.body.email + "', '" +
                      request.body.photo + "', '" +
                      request.body.password + "')";

        let [result] = await pool.query(sql);
        let respuesta = { error: false, codigo: 200, mesaje: "Usuario agregado correctamente" };
        response.send(respuesta);
    }
    catch (err){
        console.log(err);
    }

}

const postLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const params = [email, password];

        let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?";
        
        let [result] = await pool.query(sql, params);

        if (result.length > 0) {
            let respuesta = {error: false, codigo: 200, mensaje: "El usuario existe", data: result };
            response.send(respuesta);
        } else {
            let respuesta = {error: true, codigo: 200, mensaje: "Correo o contraseña incorrectos" };
            response.send(respuesta);
        }
    } 
    catch (err) {
        console.log(err);
    }
};

const putUser = async (request, response) => {
    try {
        let params = [request.body.name || null, 
                      request.body.last_name || null, 
                      request.body.email || null, 
                      request.body.photo || null,
                      request.body.id_user];

        let sql = "UPDATE user SET name = COALESCE(?, name) , " + 
                "last_name = COALESCE(?, last_name) , " +
                "email = COALESCE(?, email) , " +
                "photo = COALESCE(?, photo) WHERE id_user = ?";

        let [result] = await pool.query(sql, params); 
        let respuesta = { error: false, codigo: 200, mesaje: "Usuario actualizado correctamente", data: result };

        response.send(respuesta);
    }
    catch (err){
        console.log(err);
    }
}




module.exports = {postUser, postLogin, putUser};  