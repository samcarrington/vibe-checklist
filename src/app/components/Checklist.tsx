import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import ProgressBar from './ProgressBar';

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
  const progress =
    section.items.length > 0
      ? ((completedItems[section.title] || []).length / section.items.length) * 100
      : 0;

  return (
    <Card key={section.title} className="mb-4">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressBar progress={progress} />
        <ul className="mt-2 space-y-1">
          {section.items.map((item: ChecklistItem) => (
            <li key={item.title} className="flex items-center">
              <Checkbox
                id={item.title}
                checked={(completedItems[section.title] || []).includes(item.title)}
                onCheckedChange={() => {
                  handleCheckboxChange(section.title, item.title);
                }}
              />
              <label htmlFor={item.title} className="ml-2 text-gray-800">{item.title}</label>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleClearSection?.(section.title);
          }}
        >
          Clear Section
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Checklist;
