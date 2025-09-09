import { TabItem, TabItems } from "@/types/tabs-item";

const DashboardTabs = ({
  items,
  activeSection,
  setActiveSection
}: TabItems) => {
  return (
    <div className="sticky top-0 z-50 bg-black text-white hover:cursor-pointer hover:bg-gray-900 shadow-md">
      <div className="flex justify-around items-center py-2 md:py-3 px-2 max-w-screen-xl mx-auto">
        {items.map((item: TabItem, idx: number) => (
          <button
            key={idx}
            onClick={() => setActiveSection(item.id)}
            className={`
              relative p-2 md:p-3 flex flex-col md:flex-row items-center justify-center 
              font-bold text-xs md:text-sm gap-1 md:gap-2 w-full
              transition-colors duration-200
              ${activeSection === item.id ? "bg-gray-600" : "hover:bg-gray-800"}
            `}
            aria-label={item.name}
          >
            <span className="text-base md:text-lg">
              {item.icon}
            </span>
            
            <span className="hidden md:inline">
              {item.name}
            </span>
            
            {activeSection === item.id && (
              <span className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;