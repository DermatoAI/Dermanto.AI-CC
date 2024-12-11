const db = require('../config/firestore-config.js');
const { Timestamp } = require('firebase-admin/firestore');

const getAllAppointments = async () => {
    try {
        const appointmentRef = db.collection('appointments');
        const response = await appointmentRef.get();

        let responseArr = [];
        response.forEach(doc => {
            responseArr.push({ id: doc.id, ...doc.data() });
        });
        
        return responseArr;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Unable to fetch appointments'); // Lempar error untuk ditangani di tingkat yang lebih tinggi
    }
};

const createNewAppointments = async (body) => {
    
    try {
        const idmeet = `meet${Math.floor(100000 + Math.random() * 900000)}`;

        // Create the user with the unique username
        const appointment = db.collection('appointments').doc(idmeet); 
        await appointment.set({
            user_id: body.user_id,
            doctor_id: body.doctor_id,
            appointment_date: body.appointment_date,
            status: body.status,
            create_at: Timestamp.now(),
            updated_at: null,
        });
        
        return appointment.id;
    } catch (error) {
        throw new Error('Error creating new appointments: ' + error.message);
    }
}

const updateAppointments = async (body, id) => {
    try{
        const appointmentRef = await db.collection('appointments').doc(id)
        .update({
            user_id: body.user_id,
            doctor_id: body.doctor_id,
            appointment_date: body.appointment_date,
            status: body.status,
            create_at: null,
            updated_at: Timestamp.now()
        });
        return appointmentRef;
    }catch(error){
        res.send(error);
    }
};

const deleteAppointments = async (id) => {
    try{
        const appointmentRef = await db.collection('appointments').doc(id).delete();
        return appointmentRef;
    }catch(error){
        res.send(error);   
    }
};

const getHistoryUser = async (userId) => {    
    try {
        // Mengambil referensi koleksi dengan kondisi yang ditentukan
        const appointmentSnapshot = await db.collection('appointments')
            .where('user_id', '==', userId)
            .where('status', 'in', ['completed', 'cancelled'])
            .get();

        // Periksa apakah hasil snapshot kosong
        if (appointmentSnapshot.empty) {
            return {
                success: false,
                message: 'No appointments found for the given user and status.',
                data: []
            };
        }

        // Iterasi melalui hasil snapshot dan susun data dalam array
        const appointments = appointmentSnapshot.docs.map(doc => ({
            id: doc.id, // Sertakan ID dokumen
            ...doc.data() // Gabungkan dengan data dokumen
        }));

        // Kembalikan data dengan pesan sukses
        return {
            success: true,
            message: 'Appointments retrieved successfully.',
            data: appointments
        };
    } catch (error) {
        // Tangani kesalahan dan kembalikan pesan error
        console.error('Error fetching appointments:', error);
        return {
            success: false,
            message: 'Error fetching appointments.',
            error: error.message
        };
    }
}

const getcurrentUser = async (userId) => {
    try {
        // Mengambil referensi koleksi dengan kondisi yang ditentukan
        const appointmentSnapshot = await db.collection('appointments')
            .where('user_id', '==', userId)
            .where('status', '==', 'upcoming')
            .get();

        // Periksa apakah hasil snapshot kosong
        if (appointmentSnapshot.empty) {
            return {
                success: false,
                message: 'No appointments found for the given user and status.',
                data: []
            };
        }

        // Iterasi melalui hasil snapshot dan susun data dalam array
        const appointments = appointmentSnapshot.docs.map(doc => ({
            id: doc.id, // Sertakan ID dokumen
            ...doc.data() // Gabungkan dengan data dokumen
        }));

        // Kembalikan data dengan pesan sukses
        return {
            success: true,
            message: 'Appointments retrieved successfully.',
            data: appointments
        };
    } catch (error) {
        // Tangani kesalahan dan kembalikan pesan error
        console.error('Error fetching appointments:', error);
        return {
            success: false,
            message: 'Error fetching appointments.',
            error: error.message
        };
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