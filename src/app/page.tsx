"use client";

import checklistData from "@/data/checklistData.json";
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
    if (typeof localStorage !== 'undefined') {
      const storedProgress = localStorage.getItem('overallProgress');
      console.log('Retrieved progress from localStorage:', storedProgress);
      if (storedProgress) {
        setOverallProgress(parseFloat(storedProgress));
      }
    } else {
      console.log('localStorage is not available');
    }
  }, []);

  useEffect(() => {
    const storedProgress = localStorage.getItem('overallProgress');
    if (storedProgress) {
      setOverallProgress(parseFloat(storedProgress));
    }
  }, []);

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
    localStorage.setItem('overallProgress', newProgress.toString());
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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12" data-testid="main-container" data-testlog="Tailwind Classes Applied">
      <Header title="Vibe Coding Checklist" overallProgress={overallProgress} />
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 mt-12">
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
