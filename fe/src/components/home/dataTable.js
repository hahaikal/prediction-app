"use client";
import React, { useState, useEffect, useCallback } from 'react';
import getData from "@/handler/getMatchData";
import MyDialog from '@/components/home/dialogMatch';
import Bar from '@/components/home/bar';
import Chart from '@/components/chart/componentChart';

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

export default function DataTable() {
    const [matchData, setMatchData] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filters, setFilters] = useState({ date: '', day: '' });
    const [filteredMatchData, setFilteredMatchData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getData();
            setMatchData(data);
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const groupedData = matchData ? matchData.reduce((acc, match) => {
        if (!acc[match.league]) {
            acc[match.league] = [];
        }
        acc[match.league].push(match);
        return acc;
    }, {}) : {};
    
    const sortedLeagues = Object.keys(groupedData).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const handleRowClick = (match) => {
        setSelectedMatch(match);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedMatch(null);
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const filterMatches = useCallback((matches) => {
        if (!Array.isArray(matches)) return [];
        return matches.filter(match => {
            const matchDate = new Date(match.date);
            const matchDay = matchDate.toLocaleString('en-US', { weekday: 'long' });

            const dateMatch = filters.date ? matchDate.toDateString() === new Date(filters.date).toDateString() : true;
            const dayMatch = filters.day ? matchDay === filters.day : true;

            return dateMatch && dayMatch;
        });
    }, [filters]);

    useEffect(() => {
        if (matchData) {
            const filteredData = filterMatches(matchData);
            setFilteredMatchData(filteredData);
        }
    }, [filters, matchData, filterMatches]);

    return (
        <div className="flex flex-row justify-center mt-20 p-10 gap-10">
            <div className="basis-4/6 text-center ">
                <Bar
                    handleFilterDate={(date) => handleFilterChange('date', date)}
                    filterDay={filters.day}
                    handleFilterDay={(value) => handleFilterChange('day', value)}
                    onMatchAdded={fetchData}
                    league={sortedLeagues}
                />
                {matchData ? (
                    <Accordion type="single" collapsible className="w-full">
                        {sortedLeagues.map((league, index) => {
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
                                                        <TableCell>{match.winnerByOdd}</TableCell>
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
            <div className="basis-2/6">
                {filteredMatchData && filteredMatchData.length > 0 ? (
                    <Chart filterDate={filters.date} filterDay={filters.day} data={filteredMatchData} type={'handicap'} />
                ) : (
                    <p>No matches found for the selected filters.</p>
                )}
                {filteredMatchData && filteredMatchData.length > 0 ? (
                    <Chart filterDate={filters.date} filterDay={filters.day} data={filteredMatchData} type={'handicapped'}/>
                ) : (
                    <p>No matches found for the selected filters.</p>
                )}
            </div>
        </div>
    );
}