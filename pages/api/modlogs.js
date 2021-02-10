import { getSession }  from 'next-auth/client';
import axios from 'axios';

export default async (req, res) => {
	const session = await getSession({ req });
	if (session) {
		axios.get(`${process.env.APIURL}`)
		res.status(200);
	} else res.status(401);
	res.end()
}
