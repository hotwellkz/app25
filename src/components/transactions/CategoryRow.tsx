import React, { useState } from 'react';
import { CategoryCardType } from '../../types';
import { DroppableCategory } from './DroppableCategory';
import { AddCategoryButton } from '../AddCategoryButton';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface CategoryRowProps {
  title: string;
  categories: CategoryCardType[];
  onHistoryClick: (category: CategoryCardType) => void;
  onAddCategory?: () => void;
  rowNumber: number;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  categories,
  onHistoryClick,
  onAddCategory,
  rowNumber
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
          <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        </div>
        <span className="text-xs text-gray-500">
          {categories.length} {categories.length === 1 ? 'элемент' : 'элементов'}
        </span>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-4 min-h-[100px]">
          {categories.map((category) => (
            <div key={category.id} className="w-full sm:w-auto">
              <DroppableCategory
                category={category}
                onHistoryClick={() => onHistoryClick(category)}
              />
            </div>
          ))}
          
          {onAddCategory && (
            <div className="w-full sm:w-auto">
              <AddCategoryButton onClick={onAddCategory} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};