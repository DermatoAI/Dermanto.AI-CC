const userModel = require('../model/users.js');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await userModel.getAllUsers();

        res.json({
            message: "get all users success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body; // Ambil email dan password dari request body
    
    try {
        const [data] = await userModel.findUser(email); // Cari user berdasarkan email

        if (data.length > 0) {
            // User ditemukan, bandingkan password
            const user = data[0]; // Ambil user pertama
            if (user.password === password) {
                res.json({
                    message: "Login successfully",
                    data: {
                        id: user.id,
                        email: user.email,
                        // Jangan sertakan password di response!
                    }
                }); 
            } else {
                res.status(401).json({
                    message: "Wrong password"
                });
            }
        } else {
            // User tidak ditemukan
            res.status(404).json({
                message: "User not found",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
};

const createNewUser = async (req, res) => {
    const body = req.body;
    try {
        await userModel.createNewUser(body);
        res.status(201).json({
            message: "create new user success",
            data: {
                name: body.name,
                email: body.email,
                role: body.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

const updateUser = async (req, res) => {
    const idUser = req.params.id;
    const {body} = req;
    console.log(body);
    console.log(idUser);
    

    try {
        await userModel.updateUser(body, idUser);   
        res.json({
            message: 'update user success',
            data: {
                id:idUser,
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

const deleteUser = async (req, res) => {
    const idUser = req.params.id;
    
    try {
        await userModel.deleteUser(idUser);
        res.json({
            message: "delete user success",
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
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
}