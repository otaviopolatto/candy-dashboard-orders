
import React from 'react';
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
      <Button 
        className="bg-candy-pink hover:bg-candy-pink/90 transition-colors"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PageHeader;
