const appointmentsModel = require('../model/appointments.js');

const getAllAppointments = async (req, res) => {
    try {
        const data = await appointmentsModel.getAllAppointments();

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No appointments found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Get all appointments success",
            data: data
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);

        res.status(500).json({
            status: "error",
            message: "Server Error",
            serverMessage: error.message || "Internal server error"
        });
    }
};


const createNewAppointments = async (req, res) => {
    const body = req.body;
    
    try {
        const data = await appointmentsModel.createNewAppointments(body);
        console.log(data);
        
        res.status(201).json({
            message: "create new appointments success",
            data: {
                id: data,
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

const updateAppointments = async (req, res) => {    
    const idAppointments = req.params.id;
    const {body} = req;

    try {
        await appointmentsModel.updateAppointments(body, idAppointments);   
        res.json({
            message: 'update appointments success',
            data: {
                id:idAppointments,
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

const deleteAppointments = async (req, res) => {
    const idAppointments = req.params.id;
    
    try {
        await appointmentsModel.deleteAppointments(idAppointments);
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

const getHistoryUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const result = await appointmentsModel.getHistoryUser(userId);
        
        if (!result.success) {
            return res.status(404).json({
                status: 'fail',
                message: result.message,
                data: result.data
            });
        }

        res.status(200).json({
            status: 'success',
            message: result.message,
            data: result.data
        });
    } catch (error) {
        console.error('Error in getUserAppointments:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            serverMessage: error.message
        });
    }
}

const getcurrentUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const result = await appointmentsModel.getcurrentUser(userId);
        
        if (!result.success) {
            return res.status(404).json({
                status: 'fail',
                message: result.message,
                data: result.data
            });
        }

        res.status(200).json({
            status: 'success',
            message: result.message,
            data: result.data
        });
    } catch (error) {
        console.error('Error in getUserAppointments:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            serverMessage: error.message
        });
    }
}

module.exports = {
    getAllAppointments,
    createNewAppointments,
    updateAppointments,
    deleteAppointments,
    getHistoryUser,
    getcurrentUser
}