import formidable from "formidable";
import Joi from "joi";
import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import cloudinary from "../../../lib/cloudinary";
import dbConnect from "../../../lib/dbConnect";
import { formatPosts, isAdmin, isAuth, readFile, readPostsFromDb } from "../../../lib/utils";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import Post from "../../../models/Post";
import { IncomingPost, UserProfile } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export const config = {
    api: { bodyParser: false },
}

const handler: NextApiHandler = async (req, res) => {
    const { method } = req
    switch (method) {
        case "GET": return readPosts(req, res)
        case "POST": return createNewPost(req, res)
    }
};

const createNewPost: NextApiHandler = async (req, res) => {
    const admin = await isAdmin(req, res);
    const user = await isAuth(req, res);

    if (!admin || !user) return res.status(401).json({ error: "Unauthorized Request!" });

    const { files, body } = await readFile<IncomingPost>(req)
    // convert tags from string form to array
    let tags = [];

    if (body.tags) tags = JSON.parse(body.tags as string)
    const error = validateSchema(postValidationSchema, { ...body, tags });
    if (error) return res.status(400).json({ error });

    const { title, meta, content, slug } = body

    await dbConnect()
    const alreadyExists = await Post.findOne({ slug })
    if (alreadyExists) return res.status(400).json({ error: "Slug needs to be unique!" });

    //create new post
    const newPost = new Post({
        title,
        content,
        slug,
        meta,
        tags,
        author: user.id
    });

    // Uploading thumbnail if there is any
    const thumbnail = files.thumbnail as formidable.File;

    if (thumbnail) {
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, {
            folder: "dev-blogs"
        });
        newPost.thumbnail = { url, public_id }
    }

    await newPost.save()

    res.json({ post: newPost })
};

const readPosts: NextApiHandler = async (req, res) => {
    try {
        const { limit, pageNo, skip } = req.query as { limit: string; pageNo: string; skip: string; };
        const posts = await readPostsFromDb(parseInt(limit), parseInt(pageNo), parseInt(skip));
        res.json({ posts: formatPosts(posts) })

    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }


}

export default handler;;