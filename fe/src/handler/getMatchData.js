const getMatchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/getMatch');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching match data:', error);
        throw error;
    }
}

export default getMatchData;