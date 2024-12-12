const db = require('../config/firestore-config.js');
const { Timestamp } = require('firebase-admin/firestore');

const getAllUsers = async (req, res) => {
    try {
        const userRef = db.collection('users');
        const response = await userRef.get();

        let responseArr = [];
        response.forEach(doc => {
            responseArr.push({ id: doc.id, ...doc.data() });
        });
        
        return responseArr;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Unable to fetch users');
    }
};

const loginUser = async (username) => {
    try {
        const userSnapshot = await db.collection('users').where('username', '==', username).get();

        if (userSnapshot.empty) {
            return null;
        }

        const user = userSnapshot.docs[0].data();
        const userId = userSnapshot.docs[0].id;

        return {
            id: userId,
            username: user.username,
            email: user.email,
            password: user.password
        };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};

const createNewUser = async (body) => {
    try {
        let username = body.username;
        let usernameExists = true;

        while (usernameExists) {
            const userSnapshot = await db.collection('users').where('username', '==', username).get();

            if (userSnapshot.empty) {
                usernameExists = false;
            } else {
                username = `${body.username}_${Date.now()}`;
            }
        }

        const userRef = db.collection('users').doc(username);
        await userRef.set({
            username: username,
            name: body.name,
            email: body.email,
            birth_date: body.birth_date,
            password: body.password,
            create_at: Timestamp.now(),
            updated_at: null
        });

        return userRef.id;
    } catch (error) {
        throw new Error('Error creating new user: ' + error.message);
    }
};

const updateUser = async (body, id) => {
    try {
        const userRef = db.collection('users').doc(id);
        await userRef.update({
            name: body.name,
            email: body.email,
            birth_date: body.birth_date,
            password: body.password,
            create_at: null,
            updated_at: Timestamp.now()
        });
        return { message: 'User updated successfully' };
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    try {
        const userRef = db.collection('users').doc(id);
        await userRef.delete();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
};