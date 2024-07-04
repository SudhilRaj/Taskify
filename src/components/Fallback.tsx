

const Fallback = () => {
   return (
      <div className=" w-100 px-5 flex justify-center items-center min-h-screen">
         <div className="spinner-wrapper">
            <div className="spinner">
            <div className="sk-folding-cube">
               <div className="sk-cube1 sk-cube"></div>
               <div className="sk-cube2 sk-cube"></div>
               <div className="sk-cube4 sk-cube"></div>
               <div className="sk-cube3 sk-cube"></div>
            </div>
            </div>
         </div>
      </div>
   );
};

export default Fallback;
