"use client";
import React, { useState, useEffect } from 'react'
import getData from "@/handler/getMatchData";
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
import { Button } from "@/components/ui/button"


export default function DataTable() {
    const [matchData, setMatchData] = useState(null);

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

    return (
        <div className="flex flex-row justify-center">
            <div className="basis-1/6"></div>
            <div className="basis-5/6 justify-items-center">
                {matchData ? (
                    <Accordion type="single" collapsible className="w-full">
                        {Object.keys(groupedData).map((league, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{league}</AccordionTrigger>
                            <AccordionContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Home</TableHead>
                                        <TableHead>Away</TableHead>
                                        <TableHead>Handicap Home</TableHead>
                                        <TableHead>Handicap Away</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Winner</TableHead>
                                    </TableRow>
                                </TableHeader>
                                    <TableBody>
                                    {groupedData[league].map((match, matchIndex) => (
                                        <TableRow key={matchIndex}>
                                            <TableCell>{match.home}</TableCell>
                                            <TableCell>{match.away}</TableCell>
                                            <TableCell>{match.handicapHome}</TableCell>
                                            <TableCell>{match.handicapAway}</TableCell>
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
                        ))}
                    </Accordion>
                ) : (
                <p>Loading...</p>
                )}
            </div>
            <div className="basis-1/6"></div>
        </div>
    );
}