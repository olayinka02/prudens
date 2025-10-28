import React from "react";
import { LoaderCircle } from "lucide-react";

interface LoadingBtnProps {
  loadingText?: string;
  className?: string;
}

export default function LoadingBtn({ loadingText = "Loading...", className }: LoadingBtnProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className || ""}`}>
      <LoaderCircle className="h-5 w-5 animate-spin text-current" />
      <span>{loadingText}</span>
    </div>
  );
}
