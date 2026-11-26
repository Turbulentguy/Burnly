import express from "express";
import { query } from "../lib/db.js";

const router = express.Router();

router.get("/health", async (req, res) => {
    try {
        const result = await query("SELECT NOW();")

        res.status(200).json({
            "status": "ok",
            "database": "connected",
            "timestamp": result.rows[0].now
        });

    } catch (error) {
        res.status(500).json({
            "status": "error",
            "database": "disconnected",
            message: error.message
        });
    }
});

export default router;