"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";

type BlogBodyProps = { code: string };

export default function BlogBody({ code }: BlogBodyProps) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent />;
}
