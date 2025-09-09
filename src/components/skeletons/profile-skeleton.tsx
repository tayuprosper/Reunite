export function ProfileSkeleton() {
  return (
    <div className="info flex justify-between items-center bg-white p-5 rounded-lg shadow-md mt-7 animate-pulse">
      <div className="flex items-center gap-3">
        <div className='h-[15vh] w-[8vw] rounded-full bg-gray-200'></div>
        <div className="flex flex-col gap-2 w-[200px]">
          <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-full bg-gray-200 rounded"></div>
          <div className="flex gap-3 items-center">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-32 bg-gray-200 rounded-sm"></div>
          <div className="h-8 w-28 bg-gray-200 rounded-sm"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-36 bg-gray-200 rounded-sm"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}