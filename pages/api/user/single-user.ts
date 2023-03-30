import { NextApiHandler } from "next";
import { isAdmin, isAuth } from "../../../lib/utils";
import User from "../../../models/User";

const handler: NextApiHandler = async (req, res) => {
    const { method } = req
    switch (method) {
        case "GET": return getUser(req, res)
        case "PATCH": return updateUser(req, res)
        default: res.status(404).send("Not found!");
    }
};

const getUser: NextApiHandler = async (req, res) => {
    const admin = await isAdmin(req, res)

    if (!admin) return res.status(403).json({ error: "Unauthorized request!" });

    const { email } = req.query as { email: string };

    const result = await User.findOne({ email: email })
        .select("name email avatar provider twitter facebook")

    // const user = result.map(({ _id, name, email, avatar, provider, twitter, facebook }) => ({
    //     id: _id,
    //     name,
    //     email,
    //     avatar,
    //     provider,
    //     twitter,
    //     facebook
    // }))

    res.json({ user: result })
}

const updateUser: NextApiHandler = async (req, res) => {

    const user = await isAuth(req, res);
    if (!user) return res.status(401).json({ error: "Unauthorized Request!" })

    const { email } = req.query
    console.log(email)

    const userDetails = await User.findOne({ email: email });
    if (!userDetails) return res.status(404).json({ error: "User not found!" });

    const { twitter, facebook } = req.body.content
    userDetails.twitter = twitter;
    userDetails.facebook = facebook;

    await userDetails.save()
    res.json({ updatedUser: userDetails });
};

export default handler;