import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const ExportImport = ({ onExport, onImport }) => {
  const { currentTheme } = useTheme();
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await onImport(file);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        alert("Error importing file. Please check the file format.");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: currentTheme.colors.surface,
          color: currentTheme.colors.text,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
      >
        <Download size={16} />
        Export
      </button>

      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: currentTheme.colors.surface,
          color: currentTheme.colors.text,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
      >
        <Upload size={16} />
        Import
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
