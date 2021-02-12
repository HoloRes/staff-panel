import { getSession }  from 'next-auth/client';
import axios from 'axios';

export default async (req, res) => {
	if (req.method !== 'GET') return res.status(400).end();
	const session = await getSession({ req });
	if (session) {
		const result = await axios.get(`${process.env.APIURL}/userinfo/${req.query.userid}`, {
			headers: {
				Authorization: process.env.APITOKEN
			},
		}).catch((err) => res.status(err.response.status).json(err.response.data));
		res.status(200).json(result.data);
	} else res.status(401).end();
}
