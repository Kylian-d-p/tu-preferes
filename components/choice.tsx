"use client";


export default function Choice(props: { onClick: () => void, label: string, votes: number, percentage: number, showResults: boolean }) {
  return (
    <div className="py-10 px-5 lg:px-10 flex flex-col items-center justify-center gap-2 w-full h-full transition-colors cursor-pointer hover:bg-secondary" onClick={() => { props.onClick() }}>
      <p className="text-3xl font-bold">{props.label}</p>
      <p className={`text-muted-foreground overflow-hidden duration-500 transition-all ${props.showResults ? "h-6" : "h-0"}`}>{props.votes} vote{props.votes >= 2 && "s"} ({props.percentage.toFixed(0)}%)</p>
    </div>
  );
}