const {pool} = require('../database');


const getBooks = async (request, response) => {
    try {
        const { id_user, id_book } = request.query;
        const params = [id_user, id_book];

        if (id_book) {
            const sql = "SELECT * FROM book WHERE id_user = ? AND id_book = ?";
            const [result] = await pool.query(sql, params);

            if (result.length > 0) {
                return response.status(200).json({error: false,codigo: 200, data: result[0], mensaje: "Libro encontrado"});
            } else {
                return response.status(404).json({error: true, codigo: 200, mensaje: "No se encontró el libro" 
                });
            }
        }
        else{
            const sql = "SELECT * FROM book WHERE id_user = ?";
            const [result] = await pool.query(sql, [id_user]);

            if (result.length > 0) {
                return response.status(200).json({error: false, codigo: 200, data: result, mensaje: "Libros encontrados"});
            } 
            else {
                return response.status(404).json({error: true, codigo: 200, mensaje: "No se encontraron libros"});
            }
        }
    } 
    catch (err) {
        console.error(err);
    }
};


const postBooks = async (request, response) => {
    try {
        let sql = "INSERT INTO book (id_user, title, type, author, price, photo) " +
        "VALUES ('" + request.body.id_user + "', '" +
                      request.body.title + "', '" +
                      request.body.type + "', '" +
                      request.body.author + "', '" +
                      request.body.price + "', '" +
                      request.body.photo + "')";
        
        let [result] = await pool.query(sql);
        let respuesta = { error: false, codigo: 200, mesaje: "Libro agregado correctamente" };
        response.send(respuesta);
        }
        catch (err){
            console.log(err);
    }
}

const putBooks = async (request, response) => {
    try {
        let params = [request.body.title || null, 
                      request.body.type || null, 
                      request.body.author || null, 
                      request.body.price || null,
                      request.body.photo || null,
                      request.body.id_book];

        let sql = "UPDATE book SET title = COALESCE(?, title) , " + 
                "type = COALESCE(?, type) , " + 
                "author = COALESCE(?, author) , " +
                "price = COALESCE(?, price) , " +
                "photo = COALESCE(?, photo) WHERE id_book = ?";

        let [result] = await pool.query(sql, params); 
        let respuesta = { error: false, codigo: 200, mesaje: "Libro actualizado correctamente", data: result };

        response.send(respuesta);
    }
    catch (err){
        console.log(err);
    }
}

const deleteBooks = async (request, response) => {
    try {
        let sql = "DELETE FROM book WHERE id_book = ?";
        let [result] = await pool.query(sql, [request.body.id_book]); 
        let respuesta = { error: false, codigo: 200, mesaje: "Libro eliminado correctamente", data: result };

        response.send(respuesta);
    }
    catch (err){
        console.log(err);
    }
}

module.exports = {getBooks, postBooks, putBooks, deleteBooks};