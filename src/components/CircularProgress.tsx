const CircularProgress = ({completedTask, getStatusStyles}: {completedTask: () => string, getStatusStyles: () => any}) => {
   const percentage = parseFloat(completedTask());
   const radius = 35;
   const circumference = 2 * Math.PI * radius;
   const strokeDashoffset = circumference - (percentage / 100) * circumference;

   const {statusStyle} = getStatusStyles();

   return (
      <div className="relative flex items-center justify-center">
         <svg
            className="transform -rotate-90"
            width="80"
            height="80"
            viewBox="0 0 80 80"
         >
            <circle
               className="text-white"
               stroke="currentColor"
               strokeWidth="5"
               fill="transparent"
               r={radius}
               cx="40"
               cy="40"
            />
            <circle
               className={`${statusStyle} transition-all duration-1000 ease-in-out`}
               stroke="currentColor"
               strokeWidth="8"
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
               fill="transparent"
               r={radius}
               cx="40"
               cy="40"
            />
         </svg>
         <span className="absolute text-lg font-bold text-white">
            {percentage}%
         </span>
      </div>
   );
};

export default CircularProgress;