"use client";

import checklistData from "./checklistData.json";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Checklist from "./components/Checklist";

interface ChecklistItem {
  title: string;
  description: string;
}

interface ChecklistSection {
  title: string;
  description: string;
  items: ChecklistItem[];
}

export default function Home() {
  const [completedItems, setCompletedItems] = useState<{
    [sectionTitle: string]: string[];
  }>({});
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const storedCompletedItems = localStorage.getItem('completedItems');
    if (storedCompletedItems) {
      const parsedCompletedItems = JSON.parse(storedCompletedItems);
      console.log('Retrieved from localStorage:', parsedCompletedItems);
      setCompletedItems(parsedCompletedItems);
    }
  }, []);

  useEffect(() => {
    console.log('Saving to localStorage:', completedItems);
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  useEffect(() => {
    // Calculate overall progress
    let totalItems = 0;
    let totalCompleted = 0;

    checklistData.forEach((section: ChecklistSection) => {
      totalItems += section.items.length;
      totalCompleted += (completedItems[section.title] || []).length;
    });

    const newProgress = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
    console.log('Setting overallProgress to:', newProgress);
    setOverallProgress(newProgress);
  }, [completedItems]);

  const handleCheckboxChange = (sectionTitle: string, itemTitle: string) => {
    setCompletedItems((prev) => {
      const sectionItems = prev[sectionTitle] || [];
      let newSectionItems;
      if (sectionItems.includes(itemTitle)) {
        newSectionItems = sectionItems.filter((item) => item !== itemTitle);
      } else {
        newSectionItems = [...sectionItems, itemTitle];
      }
      return {
        ...prev,
        [sectionTitle]: newSectionItems,
      };
    });
  };

  const handleClearSection = (sectionTitle: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [sectionTitle]: [],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800 py-6 flex flex-col justify-center sm:py-12" data-testid="main-container" data-testlog="Tailwind Classes Applied">
      <Header title="Vibe Coding Checklist" overallProgress={overallProgress} />
      <div className="relative px-4 py-4 sm:p-10 mt-2">
        {checklistData.map((section: ChecklistSection) => (
          <Checklist
            key={section.title}
            section={section}
            completedItems={completedItems}
            handleCheckboxChange={handleCheckboxChange}
            handleClearSection={handleClearSection}
          />
        ))}
      </div>
    </div>
  );
}
