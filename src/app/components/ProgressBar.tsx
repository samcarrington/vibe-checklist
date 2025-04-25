import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar__horizontal w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColorClass(progress)}`}
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  );
};

function getProgressBarColorClass(progress: number): string {
  if (progress < 33) {
    return "bg-red-500";
  } else if (progress < 66) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
}

export default ProgressBar;