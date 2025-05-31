// Sort.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FilterOption } from "../../constants/constant";

interface SortProps {
  filterOption: FilterOption[];
  selectOption: string;
  filterResult: (value: string) => void;
  sortResult: () => void;
  categoriesData: string[];
}

const Sort: React.FC<SortProps> = ({ filterOption, selectOption, filterResult }) => {
  const { t } = useTranslation(["layout"]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterResult(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-600">{t("Sort by")}:</label>
      <select
        value={selectOption}
        onChange={handleSortChange}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {filterOption.map((option) => (
          <option key={option.title} value={option.title.toLowerCase()}>
            {t(option.title)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;