/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Order from './Order';

const Orders = ({ orders }) => (
  <div className="container mx-auto px-4 sm:px-8">
    <div className="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-3xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Merchant
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              />
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <Order order={order} key={order._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Orders;
