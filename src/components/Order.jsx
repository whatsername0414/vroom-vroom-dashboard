/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getImageUrl } from '../utils/utils';

const Order = ({ order }) => (
  <tr>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            alt="profil"
            src={getImageUrl(order.merchant.img_url)}
            className="mx-auto object-cover rounded-full h-10 w-10 dark:border-gray-200 dark:border-1"
          />
        </div>
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
            {order.merchant.name}
          </p>
        </div>
      </div>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
        {order.customer.name}
      </p>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
        {`${order.delivery_address.address} ${order.delivery_address.city}`}
      </p>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm font-semibold">
      <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
        ₱{order.order_detail.total_price + order.order_detail.delivery_fee}
      </p>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
        {moment(order.created_at).format('L')}
      </p>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm font-semibold">
      <p
        className={`px-2 py-1 text-center text-white dark:text-gray-200 bg-status-${order.status.ordinal} rounded-full`}
      >
        {order.status.label}
      </p>
    </td>
    <td className="px-5 py-5 border-t border-gray-200 dark:bg-gray-800 bg-white text-sm">
      <Link
        to={`/orders/${order._id}`}
        className="text-green-600 hover:text-green-900 "
      >
        View
      </Link>
    </td>
  </tr>
);

export default Order;
