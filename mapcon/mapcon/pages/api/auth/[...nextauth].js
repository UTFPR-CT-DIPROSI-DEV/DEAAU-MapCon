import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import db from '../../../lib/back/db';
import bcrypt from 'bcryptjs'

export default NextAuth({
    // Configure one or more authentication providers
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'dados',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "CPF/Username", type: "text" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {


                const user = await db('usuario')
                    .select('usu_login', 'usu_senha', 'perfil_usuario_num_seq_perfil_usuario')
                    .where({ usu_login: credentials.username })
                    .first();

                    

                if (!user) { // User don't exist
                    return null
                } else {

                    

                    // Verifying the password
                    if (bcrypt.compareSync(credentials.password, user.usu_senha)) {

                        

                        let ret = {
                            id: user.usu_login,
                            perfil: user.perfil_usuario_num_seq_perfil_usuario,
                            pushid: user.pushid
                        }
                        return ret;

                    } else {
                        return null;
                    }

                }

            }
        })
    ],
    // jwt: {
    //     secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    //   },
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user);
            return Promise.resolve(token)   // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            session.user = user.user;
            return Promise.resolve(session)
        }
    },
    pages: {
        signIn: '/login'
    }

    // A database is optional, but required to persist accounts in a database
    //database: process.env.DATABASE_URL,
})