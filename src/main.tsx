import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Fallback from './components/Fallback';
import { DataProvider } from './context/DataContext';
import routes from "./routes/allRoutes";
import './main.css';

const browserRouter = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Fallback />}>
      <DataProvider>
        {/* A different way of routing */}
        <RouterProvider
          router={browserRouter}
          fallbackElement={<Fallback />}
        />
        <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      </DataProvider>
    </Suspense>
  </React.StrictMode>,
)
