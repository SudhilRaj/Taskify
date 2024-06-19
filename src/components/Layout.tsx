// We can setup a common layout here if required
const Layout = ({ children }: {children: React.ReactNode}) => {
   return (
      <>
         <div>
            {children}
         </div>
      </>
   );
};

export default Layout;
