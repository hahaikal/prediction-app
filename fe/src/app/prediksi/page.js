"use client";

import { useEffect, useState } from 'react';
import { DialogComponent } from '@/components/home/dialogMatch';
import { convertData } from '@/handler/percentage/percentage';
import { FormHeader } from '@/components/form'
import { retrieveFormData } from '@/handler/api/addFormPrediksi'

export default function Prediksi() {
    const [matchData, setMatchData] = useState(null)
    const [loading, setLoading] = useState(true);
    
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
        console.log(converted)
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            
            <div className="">
                
            </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="col-span-2 border mt-10 shadow-md grid grid-row gap-8">
                        <FormHeader onSubmit={onSubmit} match={matchData[0]}/>
                        <div className='p-8'>
                            <DialogComponent match={matchData[0]}/>
                        </div>
                    </div>
                )}
            <div className="">
                
            </div>
        </div>
    );
}
