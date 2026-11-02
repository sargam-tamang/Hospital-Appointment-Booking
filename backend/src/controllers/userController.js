import db from "../db/knex.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await db("users").select("*").limit(10).offset(0);
        res.json({
            status_code: 200,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db("users").select("*").where("id", id).first();
        res.json({
            status_code: 200,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userController = {
    getAllUsers,
    getUserById,
};

export default userController;