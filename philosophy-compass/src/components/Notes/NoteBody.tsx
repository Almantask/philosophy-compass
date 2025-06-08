"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

type NoteBodyProps = {
  code: string;
};

export default function NoteBody({ code }: NoteBodyProps) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent />;
}
