import React from "react";
import { useTranslation } from "react-i18next";

interface InputProps {
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  error,
}) => {
  const { t } = useTranslation(["dashboard"]);
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{t(label)}</label>
      <input
        type={type}
        placeholder={t(placeholder || "")}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-200"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${className} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p id={`${label}-error`} className="text-sm text-red-500">
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default Input;