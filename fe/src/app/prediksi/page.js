"use client";

import { useEffect, useState } from 'react';
import { DialogComponent } from '@/components/home/dialogMatch';
import { convertData } from '@/handler/percentage/percentage';
import { FormHeader } from '@/components/form'
import { retrieveFormData } from '@/handler/api/addFormPrediksi'

export default function Prediksi() {
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const retrievedData = await retrieveFormData();
            setMatchData(retrievedData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const converted = convertData(data);
        delete converted.userId;
    }

    const currentMatch = matchData ? matchData.temporaryData[0] : null;

    const totalVotes = currentMatch ? currentMatch.totalVotesHome + currentMatch.totalVotesDraw + currentMatch.totalVotesAway : null

    const homePercentage = currentMatch ? ((currentMatch.totalVotesHome / totalVotes) * 100).toFixed(2) : null
    const drawPercentage = currentMatch ? ((currentMatch.totalVotesDraw / totalVotes) * 100).toFixed(2) : null
    const awayPercentage = currentMatch ? ((currentMatch.totalVotesAway / totalVotes) * 100).toFixed(2) : null


    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="">
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="col-span-2 border mt-10 shadow-md grid grid-row gap-8">
                    <FormHeader onSubmit={onSubmit} match={currentMatch} />
                    <div className='p-8'>
                        <DialogComponent 
                            match={currentMatch} 
                            label={"Win Percentage"} 
                            homeVotes={homePercentage}
                            drawVotes={drawPercentage}
                            awayVotes={awayPercentage}
                        />
                    </div>
                </div>
            )}
            <div className="">
            </div>
        </div>
    );
}
