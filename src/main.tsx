import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import routes from "./routes/allRoutes";
import './main.css';

const browserRouter = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Suspense fallback={<p>Fallback</p>}>
      <DataProvider>
        {/* A different way of routing */}
        <RouterProvider
          router={browserRouter}
          fallbackElement={<div>Loading...</div>}
        />
        <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      </DataProvider>
    </Suspense>
  </React.StrictMode>,
)
