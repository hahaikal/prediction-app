import React, { useState } from 'react';
import { format } from "date-fns";
import FormComponent from '../form';
import { useFormm } from '@/handler/api/useForm';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const Bar = ({ filterDate, handleFilterDate, filterDay, handleFilterDay, league, onMatchAdded }) => {
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

    const form = useFormm();

    const onSubmit = async (data) => {
        const convertedData = {
            ...data,
            handicapHome: parseFloat(data.handicapHome),
            handicapAway: parseFloat(data.handicapAway),
            oddHome1: parseFloat(data.oddHome1),
            oddAway1: parseFloat(data.oddAway1),
            oddHome2: parseFloat(data.oddHome2),
            oddAway2: parseFloat(data.oddAway2),
            totalVotesHome: parseInt(data.totalVotesHome, 10),
            totalVotesDraw: parseInt(data.totalVotesDraw, 10),
            totalVotesAway: parseInt(data.totalVotesAway, 10),
            totalVotes: parseInt(data.totalVotes,10),
            scoreHome: parseInt(data.scoreHome, 10),
            scoreAway: parseInt(data.scoreAway, 10)
        };
        const totalVotes = convertedData.totalVotes;
    
        const totalVotesHomePercentage = parseFloat(data.totalVotesHome) / 100;
        const totalVotesDrawPercentage = parseFloat(data.totalVotesDraw) / 100;
        const totalVotesAwayPercentage = parseFloat(data.totalVotesAway) / 100;
    
        convertedData.totalVotesHome = Math.round(totalVotes * totalVotesHomePercentage);
        convertedData.totalVotesDraw = Math.round(totalVotes * totalVotesDrawPercentage);
        convertedData.totalVotesAway = Math.round(totalVotes * totalVotesAwayPercentage);
        
        const scoreHome = convertedData.scoreHome + convertedData.handicapHome;
        const scoreAway = convertedData.scoreAway + convertedData.handicapAway;
        const winnerByOdd = (scoreHome - convertedData.scoreAway) > (scoreAway - convertedData.scoreHome)
            ? 'Home'
            : (scoreHome - convertedData.scoreAway) < (scoreAway - convertedData.scoreHome)
            ? 'Away'
            : 'Draw';
    
        convertedData.winnerByOdd = winnerByOdd;
        delete convertedData.totalVotes;
    
        try {
            addMatch(convertedData)
            closeAddMatchDialog();
            onMatchAdded();
        } catch (error) {
            console.error('Failed to add match:', error);
        }
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
                <DialogContent className="sm:max-w-[500px]" aria-describedby="dialog-description">
                    <ScrollArea className="h-[500px] sm:max-w-[500px] rounded-md border p-1" >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6'>
                            <DialogHeader>
                                <DialogTitle className="mb-4">Add Match</DialogTitle>
                                    <FormField name="league" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>League</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="League" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField name="date" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Date" type="date" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </DialogHeader>
                            <FormComponent dataForm={form} />
                            <Button type="submit" className="mt-4">
                                Save
                            </Button>
                        </form>
                    </Form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Bar;
