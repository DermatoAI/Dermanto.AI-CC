const userModel = require('../model/users.js');

const getAllUsers = async (req, res) => {
    try {
        const data = await userModel.getAllUsers();

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
    const { username, password } = req.body;  // Assuming you are using `username` for login
    
    try {
        // Call the model's login function to query Firestore
        const user = await userModel.loginUser(username);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null
            });
        }

        // Check if the provided password matches the stored password
        if (user.password === password) {
            return res.json({
                message: "Login successfully",
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.status(401).json({
                message: "Wrong password"
            });
        }
    } catch (error) {
        return res.status(500).json({
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