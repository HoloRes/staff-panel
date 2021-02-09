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
        signIn: async (user, account, profile) => {
            if(process.env.ENVIRONMENT !== 'production') return Promise.resolve(true);
            axios.get(`${process.env.APIURL}/dash/checkUser/${profile.id}`)
                .then((res) => {
                    if(res.data === true) return Promise.resolve(true);
                    else return Promise.resolve(false);
                })
                .catch((e) => {
                    if(e) return Promise.resolve(false);
                });
        }
    },
    secret: process.env.AUTHSECRET
}

export default (req, res) => NextAuth(req, res, options)
