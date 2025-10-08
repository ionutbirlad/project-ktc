import React from "react";

type SectionDividerProps = {
  extraStyle?: string;
};

export default function SectionDivider({ extraStyle }: SectionDividerProps) {
  return (
    <div className={`mx-auto bg-muted my-5 h-16 w-1 rounded-full sm:my-10 ${extraStyle}`}> </div>
  );
}
