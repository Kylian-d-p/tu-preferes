"use client";

import { PropsWithChildren } from "react";

export default function Choice(props: PropsWithChildren) {
  return (
    <div className="p-4 flex items-center justify-center cursor-pointer rounded hover:bg-secondary">
      {props.children}
    </div>
  );
}