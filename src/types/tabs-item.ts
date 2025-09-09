import { ReactNode } from "react";

export interface TabItem {
        id: number;
        name: string;
        icon: ReactNode
}

export interface TabItems {
    items: TabItem[];
    activeSection: number;
    setActiveSection: (id: number)=>void;
}