import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getDefaultStats, saveStats } from '../utils/storage';
import { useToast } from '../hooks/useToast';

export const ResetStats: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { showToast } = useToast();

  const handleReset = () => {
    saveStats(getDefaultStats());
    onReset();
    setShowConfirm(false);
    showToast('Statistics have been reset successfully');
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full
          bg-red-500 hover:bg-red-600
          transition-colors duration-200"
        aria-label="Reset statistics"
      >
        <Trash2 className="w-5 h-5 text-white" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Reset Statistics?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This will permanently delete all game statistics. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg
                  bg-gray-200 dark:bg-gray-700
                  hover:bg-gray-300 dark:hover:bg-gray-600
                  text-gray-800 dark:text-gray-200
                  transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg
                  bg-red-500 hover:bg-red-600
                  text-white
                  transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};