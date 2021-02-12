import { getSession } from 'next-auth/client';
import axios from 'axios';

export default async (req, res) => {
	if (req.method !== 'POST' || req.method !== 'DELETE') return res.status(400).end();
	const session = await getSession({req});
	if (session) {
		if (req.method === 'POST') {
			const result = await axios.post(`${process.env.APIURL}/notes/${req.query.params[0]}`, req.body, {
				headers: {
					Authorization: process.env.APITOKEN
				}
			}).catch((err) => res.status(err.response.status).json(err.response.data));
			res.status(200).json(result.data);
		}
		if (req.method === 'DELETE') {
			if (!req.query.params[1]) return res.status(400).end();
			const result = await axios.post(`${process.env.APIURL}/notes/${req.query.params[0]}/${req.query.params[1]}`,
				req.body,
				{
					headers: {
						Authorization: process.env.APITOKEN
					}
				}).catch((err) => res.status(err.response.status).json(err.response.data));
			res.status(200).json(result.data);
		}
	} else res.status(401).end();
}
