import React, { useState, useEffect } from 'react';

interface ChecklistItem {
  title: string;
  description: string;
}

interface ChecklistSection {
  title: string;
  description: string;
  items: ChecklistItem[];
}

interface ChecklistProps {
  section: ChecklistSection;
  completedItems: { [sectionTitle: string]: string[] };
  handleCheckboxChange: (sectionTitle: string, itemTitle: string) => void;
  handleClearSection: (sectionTitle: string) => void;
}
const Checklist: React.FC<ChecklistProps> = ({ section, completedItems, handleCheckboxChange, handleClearSection }) => {
  const [sectionCompletedItems, setSectionCompletedItems] = useState<string[]>(completedItems[section.title] || []);

  useEffect(() => {
    const storedCompletedItems = localStorage.getItem(section.title);
    if (storedCompletedItems) {
      setSectionCompletedItems(JSON.parse(storedCompletedItems));
    }
  }, [section.title]);

  useEffect(() => {
    localStorage.setItem(section.title, JSON.stringify(sectionCompletedItems));
  }, [sectionCompletedItems, section.title]);
  const progress =
    section.items.length > 0
      ? (sectionCompletedItems.length / section.items.length) * 100
      : 0;

  return (
    <div
      key={section.title}
      className="bg-white rounded-lg shadow-md p-6 py-8 text-base leading-6 space-y-2 sm:text-lg sm:leading-7 sm:max-w-xl sm:mx-auto mb-4"
    >
      <h2 className="text-2xl font-semibold text-gray-600">{section.title}</h2>
      <p className="text-gray-500">{section.description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColorClass(progress)}`}
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
      <ul className="mt-2 space-y-1">
        {section.items.map((item: ChecklistItem, index: number) => (
          <li key={item.title} className="flex items-center">
            <input
              type="checkbox"
              className={`mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${index === 0 ? 'first-checkbox' : ''}`}
              checked={sectionCompletedItems.includes(item.title)}
              onChange={() => {
                const newCompletedItems = sectionCompletedItems.includes(item.title)
                  ? sectionCompletedItems.filter((t) => t !== item.title)
                  : [...sectionCompletedItems, item.title];
                setSectionCompletedItems(newCompletedItems);
                handleCheckboxChange(section.title, item.title);
              }}
            />
            <label className="text-gray-800">{item.title}</label>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 border-1 border-solid border-red-800 bg-white text-red-800 rounded hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => {
          localStorage.removeItem(section.title);
          setSectionCompletedItems([]);
          handleClearSection?.(section.title);
        }}
        >
        Clear Section
      </button>
    </div>
  );
};

export default Checklist;

function getProgressBarColorClass(progress: number): string {
  if (progress < 33) {
    return "bg-red-500";
  } else if (progress < 66) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
}