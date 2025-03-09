const percentageVotes = (data) => {
    const totalVotes= data.totalVotesHome + data.totalVotesAway + data.totalVotesDraw;
    const percentageHome = Math.round((data.totalVotesHome / totalVotes) * 100);
    const percentageDraw = Math.round((data.totalVotesDraw / totalVotes) * 100);
    const percentageAway = Math.round((data.totalVotesAway / totalVotes) * 100);

    return {
        totalVotes,
        percentageHome,
        percentageAway,
        percentageDraw
    }
}

module.exports = percentageVotes