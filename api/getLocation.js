const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('http://ip-api.com/json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
};