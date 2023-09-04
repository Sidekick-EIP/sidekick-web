import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.post('https://api.sidekickapp.live/beta-users/', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
};
