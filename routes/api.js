const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/send-request', async (req, res) => {
    const { url, method, headers, body } = req.body;

    try {
        const response = await axios({
            url,
            method,
            headers,
            data: body,
        });

        res.status(200).json({
            status: response.status,
            data: response.data,
            headers: response.headers,
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            data: error.response?.data || null,
        });
    }
});

module.exports = router;
