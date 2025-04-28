import React from 'react';

interface HeaderProps {
  title: string;
  overallProgress: number;
}

const Header: React.FC<HeaderProps> = ({ title, overallProgress }) => {
  return (
    <section className="relative py-3 sm:max-w-xl sm:mx-auto min-h-40" data-testid="overall-progress-section">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-100 text-center w-full pt-6 pb-6">
          {title}
        </h1>
        <style jsx>{`
          .progress-indicator {
            --progress: ${overallProgress}%;
          }
        `}</style>
        <div className="flex items-center justify-center p-5 w-64 h-64 mx-auto progress-indicator">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-700 relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-200 font-semibold text-3xl">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;