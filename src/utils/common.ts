// All the common Utilities functions goes here

/**
 * FUNCTION FOR RETRY A FUNCTION FOR SPECIFIED NUMBER OF TIMES IN A PARTICULAR INTERVAL
 * @param {function} fn Pass the fn needs to retry
 * @param {number} retriesLeft Number retries, default = 5
 * @param {number} interval in millisecond,interval between two consequtive retry
 * @returns Resolved state of the fn
 */
export const retryFn = <T>(
   fn: () => Promise<T>,
   retriesLeft: number = 5,
   interval: number = 1000
): Promise<T> => {
   return new Promise((resolve, reject) => {
      fn()
         .then(resolve)
         .catch((error) => {
         setTimeout(() => {
            if (retriesLeft === 1) {
               reject(error);
               return;
            }
            // Passing on "reject" is the important part
            retryFn(fn, retriesLeft - 1, interval).then(resolve).catch(reject);
         }, interval);
         });
   });
};

export const greetingsGenerator = () => {
   const date = new Date();
   const hours = date.getHours();
   const months = [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
   ]

   let month = months[date.getMonth()]
   let today = `${date.getUTCDate()} ${month} ${date.getFullYear()}`
   let greeting = "";
   if (hours > 0 && hours < 12) {
      greeting = "Good morning";
   } 
   else if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon";
   } 
   else if (hours >= 18 && hours < 21) {
      greeting = "Good evening";
   } 
   else {
      greeting = "Good night";
   }

   return {greeting, today}
}
 
export const currentDateTime = () => {
   const now = new Date();
   const date = now.getDate();
   const month = now.getMonth() + 1;
   const year = now.getFullYear();

   // Get the hours (in 24-hour format)
   const hours: number = now.getHours();
   // Determine whether it's AM or PM
   const amOrPm = hours >= 12 ? "PM" : "AM";
   // Convert hours to 12-hour format
   const formattedHours: string = (hours % 12 || 12).toString().padStart(2, "0");
   // Get the minutes
   const minutes = now.getMinutes().toString().padStart(2, "0");

   return {date, month, year, amOrPm, formattedHours, minutes}
}