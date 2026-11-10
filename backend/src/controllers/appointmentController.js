import db from "../db/knex.js";

export const getAppointments = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const { status } = req.query;
        let query =  db("appointments").select("*").where("user_id", user_id);

        if(status){
            query = query.where("status", status);
        }
        const appointments = await query.limit(10).offset(0).orderBy("appointment_at", "desc");
        const groupedAppointment = appointments.reduce((groups, appointment) => {
            const status = appointment.status;

            if (!groups[status]) {
                groups[status] = [];
            }

            groups[status].push(appointment);

            return groups;
        }, {});
        res.json({
            user_id: user_id,
            data: groupedAppointment,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createAppointment = async(req, res) =>{
    try {
        const user_id = Number(req.params.user_id);
        const { doctor_id, appointment_at } = req.body;
    
        // Validate user ID
        if (!Number.isInteger(user_id) || user_id <= 0) {
          return res.status(400).json({
            status_code: 400,
            message: "Invalid user ID",
          });
        }
    
        // Validate required fields
        if (!doctor_id || !appointment_at) {
          return res.status(400).json({
            status_code: 400,
            message: "Doctor ID and appointment date are required",
          });
        }
    
        // Validate doctor ID
        if (!Number.isInteger(Number(doctor_id)) || Number(doctor_id) <= 0) {
          return res.status(400).json({
            status_code: 400,
            message: "Invalid doctor ID",
          });
        }
    
        // Validate appointment date
        const appointmentDate = new Date(appointment_at);
    
        if (Number.isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
          return res.status(400).json({
            status_code: 400,
            message: "Please provide a valid future appointment date",
          });
        }
    
        // Check if user exists
        const user = await db("users")
          .where({ id: user_id })
          .first();
    
        if (!user) {
          return res.status(404).json({
            status_code: 400,
            message: "User not found",
          });
        }
    
        // Check if doctor exists
        const doctor = await db("doctors")
          .where({ id: Number(doctor_id) })
          .first();
    
        if (!doctor) {
          return res.status(404).json({
            status_code: 400,
            message: "Doctor not found",
          });
        }
    
        // Create appointment
        const now = new Date();
    
        const [appointment] = await db("appointments")
          .insert({
            user_id,
            doctor_id: Number(doctor_id),
            appointment_at: appointmentDate,
            status: "scheduled",
            created_at: now,
            updated_at: now,
          })
          .returning("*")
    
        return res.status(200).json({
          success: true,
          message: "Appointment booked successfully",
          data: appointment,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


export const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;

        const updated = await db("appointments")
            .where("id", appointment_id)
            .update({
                status: "cancelled"
            })
            .returning("*");

        if (!updated.length) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment successfully cancelled",
            data: updated[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


const appointmentController = {
    getAppointments,
    createAppointment,
    cancelAppointment
}

export default appointmentController;