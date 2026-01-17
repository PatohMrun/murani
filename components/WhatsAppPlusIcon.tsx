import React from "react";

export const WhatsAppPlusIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M17.472 17.472C19.815 15.129 19.815 11.331 17.472 8.988C15.129 6.645 11.331 6.645 8.988 8.988C6.645 11.331 6.645 15.129 8.988 17.472M17.472 17.472C15.129 19.815 11.331 19.815 8.988 17.472M17.472 17.472V17.472C19.986 19.986 19.986 24.062 17.472 26.576C14.958 29.09 10.882 29.09 8.368 26.576"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* This path wraps loosely, I should actullay use a proper path for the bubble */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21.6C17.3019 21.6 21.6 17.3019 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 13.7915 2.89359 15.4678 3.76012 16.907L2.4 21.6L7.26578 20.3209C8.63854 21.1416 10.2644 21.6 12 21.6ZM12 7.2C12.6627 7.2 13.2 7.73726 13.2 8.4V10.8H15.6C16.2627 10.8 16.8 11.3373 16.8 12C16.8 12.6627 16.2627 13.2 15.6 13.2H13.2V15.6C13.2 16.2627 12.6627 16.8 12 16.8C11.3373 16.8 10.8 16.2627 10.8 15.6V13.2H8.4C7.73726 13.2 7.2 12.6627 7.2 12C7.2 11.3373 7.73726 10.8 8.4 10.8H10.8V8.4C10.8 7.73726 11.3373 7.2 12 7.2Z"
                fill="currentColor"
            />
        </svg>
    );
};
