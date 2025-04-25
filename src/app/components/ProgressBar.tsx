import React from 'react';
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {

  let colorClass = "";
  if (value < 33) {
    colorClass = "bg-red-500";
  } else if (value > 80) {
    colorClass = "bg-green-500";
  } else {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="relative group mt-2n mb-5">
      <div className={`p-3 ${colorClass} rounded-xl blur absolute -inset-1 opacity-30 -top-2`}>
      </div>
      <div class="bg-white relative">
          <Progress value={value} className={``} />
        </div>
    </div>
    
    
  );
};

export default ProgressBar;