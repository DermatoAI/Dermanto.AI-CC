const db = require('../config/firestore-config.js');
const { Timestamp } = require('firebase-admin/firestore');

// Get All Users
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
        // Query Firestore to find the user by username
        const userSnapshot = await db.collection('users').where('username', '==', username).get();

        // If no user is found, return null
        if (userSnapshot.empty) {
            return null;
        }

        // Return the first user document data
        const user = userSnapshot.docs[0].data();
        const userId = userSnapshot.docs[0].id;

        // Include the document ID with user data
        return {
            id: userId,
            username: user.username,
            email: user.email,
            password: user.password  // Ensure you have the password in the returned data
        };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};


// Create New User
const createNewUser = async (body) => {
    try {
        let username = body.username;
        let usernameExists = true;

        // Check if the username already exists in the database
        while (usernameExists) {
            const userSnapshot = await db.collection('users').where('username', '==', username).get();

            if (userSnapshot.empty) {
                // If no document exists with this username, it's unique
                usernameExists = false;
            } else {
                // If the username exists, append a timestamp or other suffix to make it unique
                username = `${body.username}_${Date.now()}`;
            }
        }

        // Create the user with the unique username
        const userRef = db.collection('users').doc(username);  // Use the username as the document ID
        await userRef.set({
            username: username,
            name: body.name,
            email: body.email,
            birth_date: body.birth_date,
            password: body.password,
            create_at: Timestamp.now(),
            updated_at: null
        });

        return userRef.id; // Return the username (document ID)
    } catch (error) {
        throw new Error('Error creating new user: ' + error.message);
    }
};


// Update User
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

// Delete User
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