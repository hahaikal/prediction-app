import React, { useState } from 'react';
import { format } from "date-fns";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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

const Filter = ({ filterDate, handleFilterDate, filterDay, handleFilterDay }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDateSelect = (date) => {
        handleFilterDate(date);
        setIsPopoverOpen(false);
    };

    const clearFilters = () => {
        handleFilterDate(null);
        handleFilterDay('');
    };

    const openAddMatchDialog = () => {
        setIsDialogOpen(true);
    };

    const closeAddMatchDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="flex justify-end mb-4">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="inline-flex items-center border h-8 p-2 rounded cursor-pointer w-[190px] pl-3 text-left text-muted-foreground">
                        {filterDate ? (
                            format(new Date(filterDate), "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={filterDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                    />
                </PopoverContent>
            </Popover>
            <Select value={filterDay} onValueChange={handleFilterDay}>
                <SelectTrigger className="border p-2 rounded w-30 h-8 ml-2 text-muted-foreground">
                    <span>{filterDay || "Select Day"}</span>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={clearFilters} className="ml-2 h-8">
                Clear Filters
            </Button>
            <Button onClick={openAddMatchDialog} className="ml-2 h-8">
                Add Match
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Match</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Input placeholder="League" />
                        <Input placeholder="Home Team" />
                        <Input placeholder="Away Team" />
                        <Input placeholder="Date" type="date" />
                        <Input placeholder="Handicap Home" />
                        <Input placeholder="Handicap Away" />
                        <Input placeholder="Odd Home 1" />
                        <Input placeholder="Odd Away 1" />
                        <Input placeholder="Odd Home 2" />
                        <Input placeholder="Odd Away 2" />
                        <Input placeholder="Score Home" />
                        <Input placeholder="Score Away" />
                    </div>
                    <Button onClick={closeAddMatchDialog} className="mt-4">
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};


export { MyDialog, Filter };