import axios from 'axios';

export const addMatch = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/addMatch', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};