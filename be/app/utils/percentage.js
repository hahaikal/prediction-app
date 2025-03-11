const percentageVotes = (data) => {
    const totalVotes= data.totalVotesHome + data.totalVotesAway + data.totalVotesDraw;
    const home = Math.round((data.totalVotesHome / totalVotes) * 100);
    const away = Math.round((data.totalVotesDraw / totalVotes) * 100);
    const draw = Math.round((data.totalVotesAway / totalVotes) * 100);

    return {
        totalVotes,
        home,
        away,
        draw
    }
}

module.exports = percentageVotes