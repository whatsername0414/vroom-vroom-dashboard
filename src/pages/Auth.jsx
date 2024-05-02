import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../contexts/ContextProvider';
import { MdPersonOutline, MdPassword } from 'react-icons/md';
import { FiUnlock } from 'react-icons/fi';
import { login, getAuthCode, register, logout } from '../redux/actions/auth';
import logo from '../data/vroomvroom_logo.png';
import { Loading } from '../components';

const Login = ({ currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentColor, setActiveMenu } = useStateContext();
  const [credentials, setCredentials] = useState();
  const [mode, setMode] = useState('LOGIN');
  const { loading, error, user } = useSelector((state) => state.auth);
  const { _, __, sent } = useSelector((state) => state.authCode);

  useEffect(() => {
    if (currentUser || user) {
      setActiveMenu(true);
      navigate('/');
    }
  }, [navigate, error, user, mode]);

  return (
    <>
      {setActiveMenu(false)}
      {loading && <Loading />}
      <div className="flex justify-center">
        <div class="flex flex-col w-full max-w-sm mt-24 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            <img
              className="rounded-full w-24 h-24"
              src={logo}
              alt="user-profile"
            />
          </div>
          {error && (
            <span class="px-4 py-2 mb-2 text-base text-center rounded-2xl text-red-600 border border-red-600 bg-red-200 ">
              {error}
            </span>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                mode === 'REGISTER' ? register(credentials) : login(credentials)
              );
            }}
            autoComplete="off"
          >
            {mode === 'REGISTER' && (
              <div class="flex flex-col mb-2">
                <div class="flex relative ">
                  <span class="rounded-l-2xl inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-md">
                    <MdPersonOutline />
                  </span>
                  <input
                    type="text"
                    id="name"
                    class=" rounded-r-2xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    placeholder="Name"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        name: e.target.value,
                      })
                    }
                    required={true}
                  />
                </div>
              </div>
            )}
            <div class="flex flex-col mb-2">
              <div class="flex relative ">
                <span class="rounded-l-2xl inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-md">
                  <MdPersonOutline />
                </span>
                <input
                  type="text"
                  id="username"
                  class=" rounded-r-2xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  placeholder="Username"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required={true}
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="flex relative ">
                <span class="rounded-l-2xl inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-md">
                  <FiUnlock />
                </span>
                <input
                  type="password"
                  id="password"
                  class=" rounded-r-2xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  placeholder="Password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required={true}
                />
              </div>
            </div>
            {mode === 'REGISTER' && sent && (
              <div class="flex flex-col mt-2">
                <div class="flex relative ">
                  <span class="rounded-l-2xl inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-md">
                    <MdPassword />
                  </span>
                  <input
                    type="text"
                    id="code"
                    class=" rounded-r-2xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    placeholder="Authorization Code"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        code: e.target.value,
                      })
                    }
                    required={true}
                  />
                </div>
              </div>
            )}
            {mode === 'LOGIN' && (
              <div class="flex items-center mb-6 mt-6">
                <div class="flex ml-auto">
                  <p class="cursor-pointer inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                    Forgot Your Password?
                  </p>
                </div>
              </div>
            )}
            {mode === 'REGISTER' && (
              <div
                class="flex w-full"
                style={{
                  marginTop: mode && '24px',
                }}
              >
                <button
                  style={{ backgroundColor: currentColor }}
                  type="button"
                  class="w-full h-10 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => dispatch(getAuthCode())}
                >
                  Request Authorization Code
                </button>
              </div>
            )}
            <div
              class="flex w-full"
              style={{
                marginTop: mode === 'REGISTER' ? '8px' : '24px',
              }}
            >
              <button
                style={{
                  backgroundColor: currentColor,
                }}
                type="submit"
                class="w-full h-10 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {mode === 'REGISTER' ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
          <div class="flex items-center justify-center mt-6">
            <p class="inline-flex items-center text-xs text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
              {mode === 'REGISTER' ? 'Already' : "Don't"}
              <span className="ml-1">have an account?</span>
              <span
                style={{ color: currentColor }}
                class="ml-2 cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                  mode === 'REGISTER' ? setMode('LOGIN') : setMode('REGISTER');
                }}
              >
                {' '}
                {mode === 'REGISTER' ? 'Login' : 'Register'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
