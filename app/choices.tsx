"use client";
import Choice from "@/components/choice";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import voteAction from "./vote-action";

export default function Choices(props: { choice: { id: string, choice1: { label: string, votes: number }, choice2: { label: string, votes: number } } }) {
  const [showResults, setShowResults] = useState(false);

  const vote = (choiceValue: 1 | 2) => {
    if (showResults) {
      return;
    }

    setShowResults(true);

    voteAction({ id: props.choice.id, value: choiceValue })
  }

  const percentage1 = (props.choice.choice1.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100;
  const percentage2 = (props.choice.choice2.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100;

  return (
    <>
      <Choice onClick={() => { vote(1) }} label={props.choice.choice1.label} votes={props.choice.choice1.votes} percentage={percentage1} showResults={showResults} index={0} winner={percentage1 > percentage2} />
      <div className={`absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-foreground rounded-lg p-2 z-10 ${showResults && "opacity-0"}`}>OU</div>
      <Choice onClick={() => { vote(2) }} label={props.choice.choice2.label} votes={props.choice.choice2.votes} percentage={percentage2} showResults={showResults} index={1} winner={percentage2 >= percentage1} />
      <Button
        className={`absolute top-10 left-1/2 -translate-x-1/2 shadow hover:scale-105 flex items-center gap-2 text-lg font-bold duration-500 transition-all ${showResults ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
        onClick={() => {
          document.location.reload();
        }}
      >
        <RotateCcw />
        Nouveau
      </Button>
    </>
  )
}