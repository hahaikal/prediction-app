import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const MyDialog = ({ match, onClose }) => {
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
                    <Label className="col-span-2">Score</Label>
                    <Label className="col-span-2">{match.scoreHome}</Label>
                    <Label className="col-span-2 col-end-8">{match.scoreAway}</Label>
                </div>
                <div className="my-8">
                    <Label className="block text-center mb-3">Votes Distribution</Label>
                    <div className="relative w-full h-2 bg-gray-200 rounded">
                        <div
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-l"
                        style={{ width: `${homePercentage}%` }}
                        ></div>
                        <div
                        className="absolute top-0 left-0 h-full bg-yellow-500"
                        style={{ width: `${drawPercentage}%`, left: `${homePercentage}%` }}
                        ></div>
                        <div
                        className="absolute top-0 left-0 h-full bg-red-500 rounded-r"
                        style={{ width: `${awayPercentage}%`, left: `${parseFloat(homePercentage) + parseFloat(drawPercentage)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <Label>Home: {match.totalVotesHome} ({homePercentage}%)</Label>
                        <Label>Draw: {match.totalVotesDraw} ({drawPercentage}%)</Label>
                        <Label>Away: {match.totalVotesAway} ({awayPercentage}%)</Label>
                    </div>
                </div>
                    <p className="text-center">{match.note}</p>
            </DialogContent>
        </Dialog>
    );
};



export default MyDialog;