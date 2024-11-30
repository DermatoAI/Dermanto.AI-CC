const dbPool = require('../config/database.js');

const getAllUsers = (req, res) => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
};
const loginUser = (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email = '${email}'`;

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (name, email, password, role) VALUE ('${body.name}', '${body.email}', '${body.password}', '${body.role}')`;

    return dbPool.execute(SQLQuery);
};

const updateUser = (body, id) => {
    const SQLQuery = `UPDATE users SET name='${body.name}' , email='${body.email}' , password='${body.password}' , role='${body.role}' WHERE id='${id}'`;

    return dbPool.execute(SQLQuery);
};

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM users WHERE id='${id}'`;

    return dbPool.execute(SQLQuery);
};
module.exports = { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
}