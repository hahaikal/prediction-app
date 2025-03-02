"use client"

import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import handicap from "@/handler/percentage/handicap";
import {  
  calculateWinPercentage, 
  calculateDrawPercentage, 
  calculateLosePercentage,
  calculateWinHandicapped,
  calculateDrawHandicapped,
  calculateLoseHandicapped 
} from "@/handler/percentage/percentage";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ComponentPieChart({ filterDate, filterDay, data, type }) {
  const [dataHandicap, setDataHandicap] = useState(null);
  const firstMatch = data[0].date;
  const lastMatch = data[data.length - 1].date;
  const formattedFilterDate = filterDate ? new Date(filterDate).toISOString().slice(0, 10) : '';
  console.log(formattedFilterDate, filterDay);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (data) {
        const result = await handicap(data);
        if (isMounted) {
          setDataHandicap(result);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [data]);

  const chartConfig = {
    visitors: {
      label: "Percentage",
    },
    home: {
      label: "Home",
      color: "blue",
    },
    away: {
      label: "Away",
      color: "red",
    },
    draw: {
      label: "Draw",
      color: "gray",
    },
    lose: {
      label: "Lose",
      color: "red",
    }
  };

  const winPercentage = useMemo(() => calculateWinPercentage(dataHandicap), [dataHandicap]);
  const drawPercentage = useMemo(() => calculateDrawPercentage(dataHandicap), [dataHandicap]);
  const losePercentage = useMemo(() => calculateLosePercentage(dataHandicap), [dataHandicap]);
  const homeHandicapped = useMemo(() => calculateWinHandicapped(dataHandicap), [dataHandicap]);
  const awayHandicapped = useMemo(() => calculateDrawHandicapped(dataHandicap), [dataHandicap]);
  const loseHandicapped = useMemo(() => calculateLoseHandicapped(dataHandicap), [dataHandicap]);

  const chartData = useMemo(() => {
    if (!dataHandicap) return [];
    if(type == 'handicap') {
      return [
        { winner: "Home", total: dataHandicap.homeHandicap, fill: "blue" },
        { winner: "Away", total: dataHandicap.awayHandicap, fill: "yellow" },
        { winner: "Draw", total: dataHandicap.drawHandicap, fill: "gray" },
        { winner: "Lose", total: dataHandicap.loseHandicap, fill: "red" },
      ];
    } else if (type == 'handicapped') {
      return [
        { winner: "Home", total: dataHandicap.homeHandicapped, fill: "blue" },
        { winner: "Away", total: dataHandicap.awayHandicapped, fill: "yellow" },
        { winner: "Draw", total: dataHandicap.drawHandicapped, fill: "gray" },
        { winner: "Lose", total: dataHandicap.loseHandicapped, fill: "red" },
      ];
    }
  }, [dataHandicap, type]);

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col shadow-none border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>{type == 'handicap' ? 'Win by Handicapping' : 'Win by Handicapped'}</CardTitle>
        <CardDescription>{type == 'handicapped' ? '' : formattedFilterDate ? formattedFilterDate : filterDay ? filterDay : `${firstMatch} s/d ${lastMatch}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="winner"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Match 
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {type == 'handicap' ?
            `Win : ${winPercentage}% Draw : ${drawPercentage}% Lose : ${losePercentage}%` :
            `Win : ${homeHandicapped}% Draw : ${awayHandicapped}% Lose : ${loseHandicapped}%`
          }
          {
            type == 'handicap' ? 
            (winPercentage > losePercentage ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />) :
            (homeHandicapped > loseHandicapped ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />)
          }
        </div>
      </CardFooter>
    </Card>
  );
}