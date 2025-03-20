'use client';

import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

type AlertProps = {
  type?: 'warning' | 'info' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
};

const Alert = ({ type = 'info', title, children }: AlertProps) => {
  const getAlertConfig = () => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-800 dark:text-amber-200',
          title: title || 'Warning',
        };
      case 'info':
        return {
          icon: <Info className="h-5 w-5" />,
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          title: title || 'Info',
        };
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          title: title || 'Success',
        };
      case 'error':
        return {
          icon: <XCircle className="h-5 w-5" />,
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          title: title || 'Error',
        };
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          title: title || 'Info',
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div className={`my-6 rounded-lg border ${config.border} ${config.bg} p-4`}>
      <div className="flex items-start">
        <div className={`mr-3 flex-shrink-0 ${config.text}`}>{config.icon}</div>
        <div>
          <h3 className={`mt-0 mb-1 text-sm font-medium ${config.text}`}>
            {config.title}
          </h3>
          <div className={`mt-2 text-sm ${config.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
