import express from 'express'

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
    const {name, email, password} = req.body;

    const body =JSON.stringify({
        name,
        email,
        password
    });

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        const data =await apiRes.json();
        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: 'Something went wrong when registering account'
        });
    }
});





export default router;