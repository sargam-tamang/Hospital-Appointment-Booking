import db from "../db/knex.js";

export const getAllDocs = async (req, res) => {
    try {
        const docs = await db("users").select("*").limit(10).offset(0);
        res.json({
            status_code: 200,
            message: "Docs fetched successfully",
            data: docs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDocById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db("users").select("*").where("id", id).first();
        res.json({
            status_code: 200,
            message: "Doc fetched successfully",
            data: doc,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const docController = {
    getAllDocs,
    getDocById,
};

export default docController;