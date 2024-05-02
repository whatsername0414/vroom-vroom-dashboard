import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useSelector } from 'react-redux';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import {
  Dashboard,
  Orders,
  Order,
  Merchants,
  Merchant,
  CreateProduct,
  Product,
  Customers,
  Auth,
  Register,
} from './pages';
import './App.css';
import RequireAuth from './RequireAuth.js';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const { auth } = useSelector((state) => state);
  const user = auth.user;
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [user]);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          <div className="flex relative">
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              {user && (
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
              )}
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  <Route path="/auth" element={<Auth currentUser={user} />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<RequireAuth user={user} />}>
                    {/* dashboard  */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* pages  */}
                    <Route path="/orders/:id" element={<Order />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/merchants" element={<Merchants />} />
                    <Route path="/merchants/:id" element={<Merchant />} />
                    <Route
                      path="/merchants/:id/products/:sectionId"
                      element={<CreateProduct />}
                    />
                    <Route
                      path="/merchants/:id/products/:sectionId/:productId"
                      element={<Product />}
                    />
                    <Route path="/customers" element={<Customers />} />
                  </Route>
                </Routes>
              </div>
              {user && <Footer />}
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
