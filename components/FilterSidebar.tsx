'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export interface FilterState {
  categories: string[];
  conditions: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableCategories: string[];
  availableConditions: string[];
  itemCounts?: {
    categories: Record<string, number>;
    conditions: Record<string, number>;
  };
}

export function FilterSidebar({
  filters,
  onFilterChange,
  availableCategories,
  availableConditions,
  itemCounts,
}: FilterSidebarProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition];
    onFilterChange({ ...filters, conditions: newConditions });
  };

  const handleResetFilters = () => {
    onFilterChange({ categories: [], conditions: [] });
  };

  const handleRemoveFilter = (type: 'category' | 'condition', value: string) => {
    if (type === 'category') {
      onFilterChange({
        ...filters,
        categories: filters.categories.filter((c) => c !== value),
      });
    } else {
      onFilterChange({
        ...filters,
        conditions: filters.conditions.filter((c) => c !== value),
      });
    }
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.conditions.length > 0;

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset filters
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="px-3 py-1 gap-1 cursor-pointer hover:bg-secondary/80"
                role="button"
                tabIndex={0}
                onClick={() => handleRemoveFilter('category', category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRemoveFilter('category', category);
                  }
                }}
                aria-label={`Remove ${category} filter`}
              >
                {category}
                <X className="h-3 w-3" aria-hidden="true" />
              </Badge>
            ))}
            {filters.conditions.map((condition) => (
              <Badge
                key={condition}
                variant="secondary"
                className="px-3 py-1 gap-1 cursor-pointer hover:bg-secondary/80"
                role="button"
                tabIndex={0}
                onClick={() => handleRemoveFilter('condition', condition)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRemoveFilter('condition', condition);
                  }
                }}
                aria-label={`Remove ${condition} filter`}
              >
                {condition}
                <X className="h-3 w-3" aria-hidden="true" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Category</h3>
        <div className="space-y-2">
          {availableCategories.map((category) => {
            const count = itemCounts?.categories[category] || 0;
            const isDisabled = count === 0 && !filters.categories.includes(category);

            return (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className={`text-sm cursor-pointer flex-1 ${
                    isDisabled ? 'text-muted-foreground/50' : ''
                  }`}
                >
                  {category}
                  {itemCounts && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({count})
                    </span>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Condition Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Condition</h3>
        <div className="space-y-2">
          {availableConditions.map((condition) => {
            const count = itemCounts?.conditions[condition] || 0;
            const isDisabled = count === 0 && !filters.conditions.includes(condition);

            return (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={filters.conditions.includes(condition)}
                  onCheckedChange={() => handleConditionToggle(condition)}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className={`text-sm cursor-pointer flex-1 ${
                    isDisabled ? 'text-muted-foreground/50' : ''
                  }`}
                >
                  {condition}
                  {itemCounts && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({count})
                    </span>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
