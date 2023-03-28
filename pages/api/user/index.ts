import { NextApiHandler } from "next";
import { isAdmin } from "../../../lib/utils";
import User from "../../../models/User";

const handler: NextApiHandler = async (req, res) => {
    const { method } = req
    switch (method) {
        case "GET": return getLatestUsers(req, res)
        default: res.status(404).send("Not found!");
    }
};

const getLatestUsers: NextApiHandler = async (req, res) => {
    const admin = await isAdmin(req, res)

    if (!admin) return res.status(403).json({ error: "Unauthorized request!" });

    const { pageNo = "0", limit = "5" } = req.query as { pageNo: string; limit: string };

    const results = await User.find({ role: "user" })
        .sort({ createdAt: "desc" })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(parseInt(limit))
        .select("name email avatar provider")

    const users = results.map(({ _id, name, email, avatar, provider }) => ({
        id: _id,
        name,
        email,
        avatar,
        provider
    }))

    res.json({ users })
}

export default handler;