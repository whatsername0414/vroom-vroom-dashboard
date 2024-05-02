/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { getImageUrl } from '../utils/utils';

const OrderProduct = ({ product }) => (
  <tr>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-xs">
      {console.log(getImageUrl(product.product_img_url))}
      <img
        alt="merchant_image"
        src={getImageUrl(product.product_img_url)}
        className="object-cover rounded-full h-10 w-10 "
      />
    </td>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-sm">
      <p className="text-gray-700 whitespace-no-wrap dark:text-gray-200">
        {product.name}
      </p>
    </td>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-sm font-semibold">
      <p className="text-gray-700 whitespace-no-wrap dark:text-gray-200">
        ₱{product.price}
      </p>
    </td>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-sm">
      <p className="text-gray-700 whitespace-no-wrap dark:text-gray-200">
        {product.quantity}
      </p>
    </td>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-sm">
      {product.options && product.options.length > 0 ? (
        <div>
          {product.options.slice(0, 2).map((option) => {
            return (
              <p
                className="text-gray-700 whitespace-no-wrap dark:text-gray-200"
                key={option._id}
              >{`${option.option_type}: ${option.name}`}</p>
            );
          })}
          {product.options.length > 2 && (
            <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
              ... +{product.options.length - 1}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
          None
        </p>
      )}
    </td>
    <td className="px-5 py-5 dark:bg-gray-800 border-t border-gray-200 bg-white text-sm">
      <p className="text-gray-700 whitespace-no-wrap dark:text-gray-200">
        {product.instructions ? product.instructions : 'None'}
      </p>
    </td>
  </tr>
);

export default OrderProduct;
