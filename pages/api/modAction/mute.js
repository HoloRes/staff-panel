import { getSession }  from 'next-auth/client';
import axios from 'axios';

export default async (req, res) => {
	if (req.method !== 'POST') return res.status(400).end();
	const session = await getSession({ req });
	if (session) {
		const result = await axios.post(`${process.env.APIURL}/modAction/mute`, req.body, {
			headers: {
				Authorization: process.env.APITOKEN
			},
		}).catch((err) => res.status(err.response.status).json(err.response.data));
		res.status(200).json(result.data);
	} else res.status(401).end();
}
