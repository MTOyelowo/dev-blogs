import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubAuthProvider from "next-auth/providers/github";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID_LOCAL,
    GITHUB_CLIENT_SECRET_LOCAL,
    MODE,
} = process.env

const GIT_CLIENT_ID = MODE === "development" ? GITHUB_CLIENT_ID_LOCAL : GITHUB_CLIENT_ID

const GIT_CLIENT_SECRET = MODE === "development" ? GITHUB_CLIENT_SECRET_LOCAL : GITHUB_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubAuthProvider({
            clientId: GIT_CLIENT_ID as string,
            clientSecret: GIT_CLIENT_SECRET as string,

            async profile(profile) {
                // find out the user 
                await dbConnect()
                const oldUser = await User.findOne({ email: profile.email });
                const userProfile = {
                    email: profile.email,
                    name: profile.name || profile.login,
                    avatar: profile.avatar_url,
                    role: "user",
                    twitter: "",
                    facebook: "",
                };
                // store new user inside the db
                if (!oldUser) {
                    const newUser = new User({
                        ...userProfile,
                        provider: "github",

                    });
                    await newUser.save()
                } else {
                    userProfile.role = oldUser.role;
                }

                return { id: profile.id, ...userProfile };
            }
        }),
    ],

    callbacks: {
        jwt({ token, user }) {

            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session }) {
            await dbConnect()
            const user = await User.findOne({ email: session.user?.email })
            if (user) session.user = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                twitter: user.twitter,
                facebook: user.facebook,
            } as any
            return session;

        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/404",
    }
};

export default NextAuth(authOptions)