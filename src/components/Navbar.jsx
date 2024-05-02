import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlinePayments } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Notification } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPayments } from '../redux/actions/payments';

const NavButton = ({ title, indicator, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{
          background: dotColor,
          paddingLeft: '4px',
          paddingRight: '4px',
        }}
        className="absolute inline-flex rounded-full -mt-2 text-xs font-bold"
      >
        {indicator}
      </span>
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const { auth } = useSelector((state) => state);
  const { loading, _, payments } = useSelector((state) => state.payments);
  const user = auth.user;

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    const interval = setInterval(() => {
      !loading && dispatch(getPayments('admin', 0));
    }, 10000);
    return () => clearInterval(interval);
  }, [screenSize, payments]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <button
        type="button"
        onClick={() => handleActiveMenu()}
        style={{ color: currentColor }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        {<AiOutlineMenu />}
      </button>
      <div className="flex">
        <NavButton
          title="Notification"
          indicator={payments?.length}
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<MdOutlinePayments />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name.split(' ')[0]}
              </span>
            </p>
          </div>
        </TooltipComponent>
        {isClicked.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
