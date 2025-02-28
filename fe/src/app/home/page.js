"use client";
import DataTable from '@/app/home/dataTable'; 

export default function Home() {
  return (
    <div className="flex flex-row justify-center mt-20">
        <div className="basis-1/6"></div>
        <DataTable />
        <div className="basis-1/6"></div>
    </div>
  );
}