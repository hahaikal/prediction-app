"use client";

import { useFormm } from '@/handler/api/useForm';
import { convertData } from '@/handler/percentage/percentage'
import { FormHeader } from '@/components/form'

export default function Prediksi() {
    const form = useFormm();
    
    const onSubmit = (data) => {
        const converted = convertData(data)
        console.log(converted)
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            
            <div className="">
                
            </div>
            <FormHeader onSubmit={onSubmit} />
            <div className="">
                
            </div>
        </div>
    );
}
