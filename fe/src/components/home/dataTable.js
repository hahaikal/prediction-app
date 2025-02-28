"use client";
import React, { useState, useEffect } from 'react';
import getData from "@/handler/getMatchData";
import MyDialog from '@/components/home/componets';
import Bar from '@/components/home/bar'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function DataTable() {
    const [matchData, setMatchData] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterDay, setFilterDay] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData();
                setMatchData(data);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        }
        fetchData();
    }, []);

    const groupedData = matchData ? matchData.reduce((acc, match) => {
        if (!acc[match.league]) {
            acc[match.league] = [];
        }
        acc[match.league].push(match);
        return acc;
    }, {}) : {};

    const handleRowClick = (match) => {
        setSelectedMatch(match);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedMatch(null);
    };

    const handleFilterDateChange = (date) => {
        setFilterDate(date);
    };

    const handleFilterDayChange = (value) => {
        setFilterDay(value);
    };

    const filterMatches = (matches) => {
        return matches.filter(match => {
            const matchDate = new Date(match.date);
            const matchDay = matchDate.toLocaleString('en-US', { weekday: 'long' });

            const dateMatch = filterDate ? matchDate.toDateString() === filterDate.toDateString() : true;
            const dayMatch = filterDay ? matchDay === filterDay : true;

            return dateMatch && dayMatch;
        });
    };

    return (
        <div className="basis-4/6 text-center ">
            <Bar
                filterDate={filterDate}
                handleFilterDate={handleFilterDateChange}
                filterDay={filterDay}
                handleFilterDay={handleFilterDayChange}
            />
            {matchData ? (
                <Accordion type="single" collapsible className="w-full">
                    {Object.keys(groupedData).map((league, index) => {
                        const filteredMatches = filterMatches(groupedData[league]);
                        if (filteredMatches.length === 0) {
                            return null;
                        }
                        return (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{league}</AccordionTrigger>
                                <AccordionContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-200">
                                                <TableHead className="text-center">Home</TableHead>
                                                <TableHead className="text-center">Away</TableHead>
                                                <TableHead className="text-center">Score Home</TableHead>
                                                <TableHead className="text-center">Score Away</TableHead>
                                                <TableHead className="text-center">Date</TableHead>
                                                <TableHead className="text-center">Winner</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredMatches.map((match, matchIndex) => (
                                                <TableRow key={matchIndex} onClick={() => handleRowClick(match)}>
                                                    <TableCell>{match.home}</TableCell>
                                                    <TableCell>{match.away}</TableCell>
                                                    <TableCell>{match.scoreHome}</TableCell>
                                                    <TableCell>{match.scoreAway}</TableCell>
                                                    <TableCell>{match.date}</TableCell>
                                                    <TableCell>
                                                        {match.winnerByOdd ? (
                                                            match.winnerByOdd
                                                        ) : (
                                                            <Button>Edit</Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            ) : (
                <p>Loading...</p>
            )}
            {isDialogOpen && selectedMatch && (
                <MyDialog match={selectedMatch} onClose={handleCloseDialog} />
            )}
        </div>
    );
}