import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const options = {
    providers: [
        Providers.Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn (user, account, profile) {
            const res = await axios.get(`${process.env.APIURL}/checkUser/${profile.id}`, {
                headers: {
                    Authorization: process.env.APITOKEN
                }
            })
            .catch(() => {
                return false;
            });

            return res.data === true;
        },
    },
    secret: process.env.AUTHSECRET
}

export default (req, res) => NextAuth(req, res, options)
