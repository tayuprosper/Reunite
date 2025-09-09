import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
type ItemsFilterProps = {
    options: string[];
    selectedOption?: string;
    filter: string;
    isOpen: boolean;
    toggleOpen: () => void;
    onFilterChange: (filter: string) => void;
};

export const ItemFilter: React.FC<ItemsFilterProps> = ({options, toggleOpen, filter, isOpen, onFilterChange }) => {
    return (
        <div className='m-10 w-fit'>
            <div onClick={toggleOpen} className="title border-1 border-gray-300 rounded-lg p-3 flex items-center justify-between cursor-pointer gap-3">
                <div className="tex">{filter}</div>
                { isOpen ? <ChevronUp  color='gray' /> : <ChevronDown color='gray' /> }
            </div>
            {  isOpen &&  
                <div className="options border-1 border-gray-300 rounded-lg">
                   { options.map((option) => (
                        <div key={option} className="option-item p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {onFilterChange(option); toggleOpen()}}>{option}</div>
                ))
                   }
                </div>
}
        </div>
    )
}