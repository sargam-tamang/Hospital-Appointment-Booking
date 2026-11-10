
import db from "../db/knex.js";

// GET all doctors
export const getDoctors = async (req, res) => {
    try {
        const doctors = await db("doctors")
            .select("*")
            .orderBy("id", "desc");

        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: doctors
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// CREATE doctor
export const createDoctor = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            about,
            email,
            hospital_id,
            specialization
        } = req.body;

        // Validate required fields
        if (
            !first_name ||
            !last_name ||
            !about ||
            !email ||
            !hospital_id
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const [doctor] = await db("doctors")
            .insert({
                first_name,
                last_name,
                about,
                email,
                hospital_id,
                specialization
            })
            .returning("*");

        return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// GET doctor by ID
export const getDocById = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await db("doctors")
            .where("id", id)
            .first();

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully",
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const docController = {
    getDoctors,
    createDoctor,
    getDocById,
}

export default docController;
