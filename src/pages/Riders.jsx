import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EditRider, Loading, Merchant, Toast } from '../components';
import { getUsers } from '../redux/actions/users';
import { useStateContext } from '../contexts/ContextProvider';
import { registerRider } from '../redux/actions/auth';

const Riders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentColor, currentMode } = useStateContext();
  const { usersLoading, usersError, users } = useSelector(
    (state) => state.users
  );
  const [isRegisterRider, setIsRegisterRider] = useState(false);

  useEffect(() => {
    !users && dispatch(getUsers());
  }, [dispatch, usersLoading, usersError, isRegisterRider]);

  const onRegisterRider = (rider) => {
    setIsRegisterRider(false);
    dispatch(registerRider(rider));
  };

  return (
    <>
      <Toast />
      {usersLoading && <Loading />}
      {isRegisterRider && (
        <EditRider
          currentRider={undefined}
          positiveButtonListener={onRegisterRider}
          negativeButtonListener={() => {
            setIsRegisterRider(false);
          }}
        />
      )}
      <div class="m-2 md:m-10 mt-24 p-8 md:p-8 bg-white rounded-2xl max-h-full dark:bg-secondary-dark-bg dark:text-gray-200">
        <div className="py-2 px-2 mb-8 bg-light-gray text-right rounded-2xl">
          <button
            style={{ backgroundColor: currentColor }}
            type="button"
            className="h-10 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => {
              setIsRegisterRider(true);
            }}
          >
            Register Rider
          </button>
        </div>
        <div class="md:grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </div>
    </>
  );
};

export default Riders;
