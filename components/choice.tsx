"use client";

import { useEffect, useRef } from "react";


export default function Choice(props: { onClick: () => void, label: string, votes: number, percentage: number, showResults: boolean, index: 0 | 1, winner: boolean }) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--percentage", `${props.percentage < 15 ? 15 : props.percentage}%`);
    }
  }, [props.percentage]);

  return (
    <div ref={ref} className={`flex flex-col items-center justify-center gap-2 transition-all duration-500 ${!props.showResults ? "hover:bg-secondary cursor-pointer" : (props.winner ? "bg-green-900" : "bg-red-900")} absolute z-0 overflow-hidden w-full lg:h-full ${props.showResults ? `h-[var(--percentage)] lg:w-[var(--percentage)] ${props.index && `top-[calc(100%-var(--percentage))] lg:left-[calc(100%-var(--percentage))] lg:top-0`}` : `h-1/2 lg:w-1/2 ${props.index ? "top-1/2 left-1/2 lg:top-0" : "top-0 left-0"}`}`} onClick={() => { props.onClick() }}>
      <div className="py-10 px-5 lg:px-10 flex flex-col items-center">
        <p className="text-3xl font-bold">{props.label}</p>
        <p className={`text-muted-foreground overflow-hidden duration-500 transition-all ${props.showResults ? "h-12" : "h-0"}`}>{props.votes} vote{props.votes >= 2 && "s"} ({props.percentage.toFixed(0)}%)</p>
      </div>
    </div>
  );
}