import React from 'react';
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const getColor = () => {
    if (value < 33) {
      return "red";
    } else if (value > 80) {
      return "green";
    } else {
      return "yellow";
    }
  };

  let colorClass = "";
  if (value < 33) {
    colorClass = "bg-red-500";
  } else if (value > 80) {
    colorClass = "bg-green-500";
  } else {
    colorClass = "bg-yellow-500";
  }

  return (
    <Progress value={value} className={`[&>[data-slot='progress-indicator']]:${colorClass}`} />
  );
};

export default ProgressBar;