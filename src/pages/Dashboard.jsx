/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoPrimitiveDot } from 'react-icons/go';
import { getOrders } from '../redux/actions/orders';
import { Header, OrderList } from '../components';
import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Dashboard = () => {
  const { currentMode } = useStateContext();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.orders);
  useEffect(() => {
    const interval = setInterval(() => {
      !loading && dispatch(getOrders('admin', 0));
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="mt-16">
      <div className="flex mx-12 flex-wrap justify-center gap-4 lg:justify-between sm:justify-evenly">
        {earningData.map((item) => (
          <div
            key={item.title}
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg lg:w-64 p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              {item.icon}
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>
                {item.percentage}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-8 mx-12 p-4 rounded-2xl  ">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Hourly Updates</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-red-600 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Cancelled</span>
            </p>
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Delivered</span>
            </p>
            <p className="flex items-center gap-2 text-yellow-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Others</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-evenly sm:flex-row">
          <div className=" m-4 md:w-1/2">
            <iframe
              className="dark:bg-secondary-dark-bg dark:text-gray-200"
              style={{
                border: 'none',
                borderRadius: '2px',
                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2);',
                width: '100%',
                height: '350px',
                grid: 'none',
              }}
              src={`https://charts.mongodb.com/charts-project-0-wzyjc/embed/charts?id=62c93f3e-a69a-403f-8236-2cdf17cce738&maxDataAge=3600&theme=${currentMode.toLowerCase()}&autoRefresh=true&grid=none`}
            />
          </div>
          <div className="border-l-1 md:pl-24">
            <iframe
              className="dark:bg-secondary-dark-bg dark:text-gray-200"
              style={{
                border: 'none',
                borderRadius: '2px',
                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2);',
                width: '100%',
                height: '350px',
              }}
              src={`https://charts.mongodb.com/charts-project-0-wzyjc/embed/charts?id=62c9891b-6d77-4250-8cab-0fc61cfcbcc8&maxDataAge=3600&theme=${currentMode.toLowerCase()}&autoRefresh=true`}
            />
          </div>
        </div>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-8 bg-white rounded-3xl dark:bg-secondary-dark-bg">
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
