
import db from "../db/knex.js";

// GET /prescriptions/:user_id
export const getPrescriptions = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({
        message: "A valid user ID is required",
      });
    }

    const prescriptions = await db("prescriptions")
      .where({ user_id })
      .orderBy("id", "desc")
      .select("*");

    return res.status(200).json({
      message: "Prescriptions retrieved successfully",
      count: prescriptions.length,
      data: prescriptions,
    });

  } catch (error) {
    console.error("Get prescriptions error:", error);

    return res.status(500).json({
      message: "Failed to retrieve prescriptions",
      error: error.message,
    });
  }
};


// POST /prescriptions/:user_id
export const createPrescription = async (req, res) => {
  try {
    const { user_id } = req.params;

    const {
      doctor_id,
      med_name,
      med_type,
      dosage,
      morning,
      afternoon,
      evening,
      instructions,
      start_date,
      end_date,
    } = req.body;

    // Validate user ID
    if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({
        message: "A valid user ID is required",
      });
    }

    // Validate required fields
    if (
      !doctor_id ||
      !med_name ||
      !med_type ||
      !dosage ||
      !start_date
    ) {
      return res.status(400).json({
        message: "Please provide all required prescription fields",
      });
    }

    // Validate medication schedule
    if (
      typeof morning !== "boolean" ||
      typeof afternoon !== "boolean" ||
      typeof evening !== "boolean"
    ) {
      return res.status(400).json({
        message: "Morning, afternoon and evening must be true or false",
      });
    }

    // Check if user exists
    const user = await db("users")
      .where({ id: user_id })
      .first();

    if (!user) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // Check if doctor exists
    const doctor = await db("doctors")
      .where({ id: doctor_id })
      .first();

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Insert prescription
    const [newPrescription] = await db("prescriptions")
      .insert({
        user_id,
        doctor_id,
        med_name,
        med_type,
        dosage,
        morning,
        afternoon,
        evening,
        instructions: instructions || null,
        start_date,
        end_date: end_date || null,
      })
      .returning("*");

    return res.status(201).json({
      message: "Prescription created successfully",
      data: newPrescription,
    });

  } catch (error) {
    console.error("Create prescription error:", error);

    return res.status(500).json({
      message: "Failed to create prescription",
      error: error.message,
    });
  }
};

const prescriptionController = {
    getPrescriptions,
    createPrescription,
};

export default prescriptionController;