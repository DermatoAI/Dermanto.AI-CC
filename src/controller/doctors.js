const doctorModel = require('../model/doctors.js');

const getAllDoctors = async (req, res) => {    
    try {
        const data = await doctorModel.getAllDoctors();
        
        res.json({
            message: "get all doctors success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

module.exports = { getAllDoctors };
