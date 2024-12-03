const apointmentsModel = require('../model/appointments.js');

const getAllApointments = async (req, res) => {
    try {
        const [data] = await apointmentsModel.getAllApointments();

        res.json({
            message: "get all appointments success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

const createNewApointments = async (req, res) => {
    const body = req.body;
    
    try {
        await apointmentsModel.createNewApointments(body);
        res.status(201).json({
            message: "create new appointments success",
            data: {
                user_id: body.user_id,
                doctor_id: body.doctor_id,
                appointment_date: body.appointment_date,
                status: body.status
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

const updateApointments = async (req, res) => {
    const idApointments = req.params.id;
    const {body} = req;

    try {
        await apointmentsModel.updateApointments(body, idApointments);   
        res.json({
            message: 'update appointments success',
            data: {
                id:idApointments,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
}

const deleteApointments = async (req, res) => {
    const idApointments = req.params.id;
    
    try {
        await apointmentsModel.deleteApointments(idApointments);
        res.json({
            message: "delete appointments success",
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
}

module.exports = {
    getAllApointments,
    createNewApointments,
    updateApointments,
    deleteApointments
}