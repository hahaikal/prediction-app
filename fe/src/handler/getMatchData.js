import axios from 'axios';

const getMatchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getMatch');
        return response.data;
    } catch (error) {
        console.error('Error fetching match data:', error);
        throw error;
    }
}

export default getMatchData;