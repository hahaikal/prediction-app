import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const MyDialog = ({ match, onClose }) => {
    const totalVotes = match.totalVotesHome + match.totalVotesDraw + match.totalVotesAway;

    const homePercentage = ((match.totalVotesHome / totalVotes) * 100).toFixed(2);
    const drawPercentage = ((match.totalVotesDraw / totalVotes) * 100).toFixed(2);
    const awayPercentage = ((match.totalVotesAway / totalVotes) * 100).toFixed(2);

    return (
        <Dialog open={!!match} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{match.league}</DialogTitle>
                    <DialogDescription>{match.date}</DialogDescription>
                </DialogHeader>
                <DialogComponent match={match} label={"Votes Distributor"} homeVotes={homePercentage} drawVotes={drawPercentage} awayVotes={awayPercentage} />
                    <p className="text-center">{match.note}</p>
            </DialogContent>
        </Dialog>
    );
};

export const DialogComponent = ({ match, label, homeVotes, drawVotes, awayVotes }) => {
    console.log(match)
    return(
        <>
            <div className="grid gap-x-4 gap-y-8 grid-cols-7 mt-4 text-center">
                <Label className="col-span-2"></Label>
                <Label className="col-span-2">{match.home}</Label>
                <Label>Vs</Label>
                <Label className="col-span-2">{match.away}</Label>
                <Label className="col-span-2">Handicap</Label>
                <Label className="col-span-2">{match.handicapHome}</Label>
                <Label className="col-span-2 col-end-8">{match.handicapAway}</Label>
                <Label className="col-span-2">Odd1</Label>
                <Label className="col-span-2">{match.oddHome1}</Label>
                <Label className="col-span-2 col-end-8">{match.oddAway1}</Label>
                <Label className="col-span-2">Odd2</Label>
                <Label className="col-span-2">{match.oddHome2}</Label>
                <Label className="col-span-2 col-end-8">{match.oddAway2}</Label>
                {
                    label === "Win Percentage" ? '' :
                    <>
                        <Label className="col-span-2">Score</Label>
                        <Label className="col-span-2">{match.scoreHome}</Label>
                        <Label className="col-span-2 col-end-8">{match.scoreAway}</Label>
                    </>
                }
            </div>
            <div className="my-6">
                <Label className="block text-center mb-3">{label}</Label>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                    <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-l"
                    style={{ width: `${homeVotes}%` }}
                    ></div>
                    <div 
                    className="absolute top-0 left-0 h-full bg-yellow-500"
                    style={{ width: `${drawVotes}%`, left: `${homeVotes}%` }}
                    ></div>
                    <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded-r"
                    style={{ width: `${awayVotes}%`, left: `${parseFloat(homeVotes) + parseFloat(drawVotes)}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2">
                    <Label>Home: {label == 'Win Percentage' ? '' : match.totalVotesHome} ({homeVotes}%)</Label>
                    <Label>Draw: {label == 'Win Percentage' ? '' : match.totalVotesDraw} ({drawVotes}%)</Label>
                    <Label>Away: {label == 'Win Percentage' ? '' : match.totalVotesAway} ({awayVotes}%)</Label>
                </div>
            </div>
        </>
    )
}