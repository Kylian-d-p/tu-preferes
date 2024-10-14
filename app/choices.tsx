"use client";
import Choice from "@/components/choice";
import { Button } from "@/components/ui/button";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import voteAction from "./vote-action";

export default function Choices(props: { choice: { id: string, choice1: { label: string, votes: number }, choice2: { label: string, votes: number } } }) {
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const vote = (choiceValue: 1 | 2) => {
    if (showResults) {
      return;
    }

    setShowResults(true);

    voteAction({ id: props.choice.id, value: choiceValue })
  }

  let percentage1 = (props.choice.choice1.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100;
  let percentage2 = (props.choice.choice2.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100;

  if (isNaN(percentage1)) {
    percentage1 = 50;
  }

  if (isNaN(percentage2)) {
    percentage2 = 50;
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  return (
    <>
      <Choice onClick={() => { vote(1) }} label={props.choice.choice1.label} votes={props.choice.choice1.votes} percentage={percentage1} showResults={showResults} index={0} winner={percentage1 > percentage2} />
      <div className={`absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-foreground rounded-lg p-2 z-10 ${showResults && "opacity-0"}`}>OU</div>
      <Choice onClick={() => { vote(2) }} label={props.choice.choice2.label} votes={props.choice.choice2.votes} percentage={percentage2} showResults={showResults} index={1} winner={percentage2 >= percentage1} />
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 shadow flex items-center gap-2 duration-500 transition-all ${showResults ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
        <Button
          className={"text-lg font-bold hover:scale-105 duration-500 transition-all flex items-center gap-2"}
          onClick={() => {
            document.location.replace("/")
          }}
        >
          <RotateCcw />
          Nouveau
        </Button>
        <Button
          className="text-lg font-bold hover:scale-105 duration-500 transition-all flex items-center gap-2"
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(`${document.location.origin}/?id=${props.choice.id}`);
          }}
        >
          {copied ? <Check /> : <Copy />}
          Copier le lien
        </Button>
      </div>
    </>
  )
}