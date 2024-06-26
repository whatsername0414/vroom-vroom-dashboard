import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { logout } from '../redux/actions/auth';
import logo from '../data/vroomvroom_logo.png';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const [mode, setMode] = useState();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {}, [mode]);

  const activeLink =
    'flex items-center gap-5 pl-4 py-3 rounded-lg  text-white text-md m-2 rounded-2xl';
  const normalLink =
    'flex items-center gap-5 pl-4 py-3 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 rounded-2xl';

  return (
    <div className="ml-3 h-screen">
      {activeMenu && (
        <div className="grid grid-rows-4 h-full">
          <div className="row-span-3">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={logo}
                  alt="user-profile"
                />{' '}
                <span>VroomVroom</span>
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className="mt-8">
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize ">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="row-span-1 flex mb-8 justify-between items-center">
            <button
              style={{ backgroundColor: currentColor }}
              type="button"
              className="flex items-center w-full py-3 pl-4 gap-5 mx-2 self-end border-2 shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-transparent"
              onClick={() => dispatch(logout())}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
