const db = require('../config/firestore-config.js');

const getAllDoctors = async (req, res) => {
    try {
        const doctorRef = db.collection('doctors');
        const response = await doctorRef.get();

        let responseArr = [];
        response.forEach(doc => {
            responseArr.push({ id: doc.id, ...doc.data() });
        });
        
        return responseArr;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error('Unable to fetch doctors');
    }
};

module.exports = { getAllDoctors };