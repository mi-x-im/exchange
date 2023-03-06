const express = require('express');

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('api/users/register', async (req, res) => {
    const {name, email, password} = req.body;

    const body =JSON.stringify({
        name,
        email,
        password
    });

    try {
        const registerRes = await fetch('http://localhost:8000/api/users/register', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        const data =await registerRes.json();
        return res.status(registerRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: 'Something went wrong when registering account'
        });
    }
});





module.exports=router;