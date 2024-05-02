/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Product from './OrderProduct';

const OrderProducts = ({ products }) => {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="pb-8">
        <div className="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Options
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-normal"
                  >
                    Instructions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
