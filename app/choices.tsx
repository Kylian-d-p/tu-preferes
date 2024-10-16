"use client";
import Choice from "@/components/choice";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Copy, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import voteAction from "./vote-action";

export default function Choices(props: { choice: { id: string, choice1: { label: string, votes: number }, choice2: { label: string, votes: number } }, playlist?: { id: string, index: number, length: number } }) {
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [votes, setVotes] = useState({ choice1: props.choice.choice1.votes, choice2: props.choice.choice2.votes });
  const [percentages, setPercentages] = useState({ choice1: (props.choice.choice1.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100, choice2: (props.choice.choice2.votes / (props.choice.choice1.votes + props.choice.choice2.votes)) * 100 });
  const [locationOrigin, setLocationOrigin] = useState<string>("");

  const vote = (choiceValue: 1 | 2) => {
    if (showResults) {
      return;
    }

    setShowResults(true);

    voteAction({ id: props.choice.id, value: choiceValue })
    setVotes({ ...votes, [`choice${choiceValue}`]: votes[`choice${choiceValue}`] + 1 });
  }

  if (isNaN(percentages.choice1) || isNaN(percentages.choice2)) {
    setPercentages({ choice1: 50, choice2: 50 });
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  useEffect(() => {
    setPercentages({ choice1: (votes.choice1 / (votes.choice1 + votes.choice2)) * 100, choice2: (votes.choice2 / (votes.choice1 + votes.choice2)) * 100 });
  }, [votes]);

  useEffect(() => {
    setLocationOrigin(document ? document.location.origin : "")
  }, []);

  return (
    <>
      <Choice onClick={() => { vote(1) }} label={props.choice.choice1.label} votes={votes.choice1} percentage={percentages.choice1} showResults={showResults} index={0} winner={percentages.choice1 > percentages.choice2} />
      <div className={`absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-foreground rounded-lg p-2 z-10 ${showResults && "opacity-0"}`}>OU</div>
      <Choice onClick={() => { vote(2) }} label={props.choice.choice2.label} votes={votes.choice2} percentage={percentages.choice2} showResults={showResults} index={1} winner={percentages.choice2 >= percentages.choice1} />
      {
        props.playlist && props.playlist.index + 1 >= props.playlist.length &&
        <Button className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-lg font-bold h-12 flex items-center gap-2 ${!showResults && "hidden"}`} onClick={() => {
           window.location.replace("/");
        }}><RotateCcw/> Playlist terminée, on continue ?</Button>
      }
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 shadow flex items-center gap-2 duration-500 transition-all ${!showResults && "hidden"}`}>
        {(!props.playlist || props.playlist.index + 1 < props.playlist.length) &&
          <Button
            className={"text-lg font-bold hover:scale-105 duration-500 transition-all flex items-center gap-2"}
            onClick={() => {
              if (!window) {
                return;
              }
              if (props.playlist) {
                window.location.replace(`/playlist/${props.playlist.id}?index=${props.playlist.index + 1}`);
              } else {
                window.location.replace("/?skip=" + props.choice.id);
              }
            }}
          >
            {
              props.playlist ?
                <>
                  <ChevronRight />
                  Suivant
                </> :
                <>
                  <RotateCcw />
                  Nouveau
                </>
            }
          </Button>
        }
        <Button
          className="text-lg font-bold hover:scale-105 duration-500 transition-all flex items-center gap-2"
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(`${locationOrigin}/?id=${props.choice.id}`);
          }}
        >
          {copied ? <Check /> : <Copy />}
          Copier le lien
        </Button>
      </div>
    </>
  )
}