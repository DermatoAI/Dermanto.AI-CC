const dbPool = require('../config/database.js');

const getAllApointments = (req, res) => {
    const SQLQuery = 'SELECT * FROM appointments';

    return dbPool.execute(SQLQuery);
};

const createNewApointments = (body) => {
    if (!body.appointment_date || isNaN(new Date(body.appointment_date).getTime())) {
        throw new Error("Invalid appointment date");
    }

    const SQLQuery = `
        INSERT INTO appointments (id, user_id, doctor_id, appointment_date, status)
        VALUES (null, ?, ?, ?, ?)
    `;

    return dbPool.execute(SQLQuery, [
        body.user_id,
        body.doctor_id,
        body.appointment_date,
        body.status,
    ]);
};


const updateApointments = (body, id) => {
    const SQLQuery = `UPDATE appointments SET user_id='${body.user_id}', doctor_id='${body.doctor_id}' , status='${body.status}' WHERE id='${id}'`;

    return dbPool.execute(SQLQuery);
};

const deleteApointments = (id) => {
    const SQLQuery = `DELETE FROM appointments WHERE id='${id}'`;

    return dbPool.execute(SQLQuery);
};
module.exports = { 
    getAllApointments,
    createNewApointments,
    updateApointments,
    deleteApointments
}