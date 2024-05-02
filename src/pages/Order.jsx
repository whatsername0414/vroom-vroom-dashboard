/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { MdOutlineStorefront, MdOutlineDeliveryDining } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, confirmOrder } from '../redux/actions/orders';
import { useEffect } from 'react';
import { Loading, Header } from '../components';
import OrderProducts from '../components/OrderProducts';
import { useStateContext } from '../contexts/ContextProvider';

const Order = () => {
  const { currentColor, currentMode } = useStateContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, order } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  return (
    <>
      {loading && <Loading />}
      <Header title={'Order Details'} />
      {order && (
        <div className="px-12 mt-8">
          <div className="p-8 bg-white dark:bg-secondary-dark-bg rounded-2xl shadow">
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-xl text-gray-700 dark:text-white">
                  {order.status.label}
                </p>
                <p className="mb-8 text-sm text-gray-500 dark:text-gray-200">
                  Placed on: {moment(order.created_at).format('llll')}
                </p>
              </div>
            </div>
            <div className="flex items-center flex-col md:flex-row justify-evenly py-8 border-y border-gray-200 mb-8">
              <div className="p-4">
                <div className="text-center mb-4">
                  <CgProfile
                    className="mx-auto p-8 rounded-full object-cover h-24 w-24 text-white"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-l text-gray-800 dark:text-white">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Customer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs py-4">
                    {order.customer.phone.number}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <MdOutlineStorefront
                    className="mx-auto p-8 rounded-full object-cover h-24 w-24 text-white"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-l text-gray-800 dark:text-white">
                    {order.merchant.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Merchant
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs py-4">
                    {order.customer.phone.number}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <MdOutlineDeliveryDining
                    className="mx-auto p-8 rounded-full object-cover h-24 w-24 text-white"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-l text-gray-800 dark:text-gray-200">
                    {order.payment.method}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200 font-light">
                    Delivery
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs py-4 font-light">
                    {`${order.delivery_address.address} ${order.delivery_address.city}`}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              Order Summary
            </p>
            <OrderProducts products={order.order_detail.products} />
            <div className="flex flex-col items-end mt-8">
              <div className="flex md:flex-row mr-16 w-1/2 justify-between my-1">
                <p className="text-base text-gray-500 dark:text-gray-200">
                  SubTotal:
                </p>
                <p className="text-base text-gray-500 dark:text-gray-200">
                  ₱{order.order_detail.total_price}
                </p>
              </div>
              <div className="flex md:flex-row mr-16 w-1/2 justify-between my-1">
                <p className="text-base text-gray-500 dark:text-gray-200">
                  Delivery Fee:
                </p>
                <p className="text-base text-gray-500 dark:text-gray-200">
                  ₱{order.order_detail.delivery_fee}
                </p>
              </div>
              <div className="flex md:flex-row mr-16 w-1/2 justify-between my-2">
                <p className="text-l text-gray-800 dark:text-gray-200">
                  Total:
                </p>
                <p className="text-l text-gray-800 dark:text-gray-200">
                  ₱
                  {order.order_detail.total_price +
                    order.order_detail.delivery_fee}
                </p>
              </div>
            </div>
            {order.status.ordinal === 0 && (
              <div className="px-4 py-2 mt-8 bg-light-gray text-right sm:px-6 rounded-2xl">
                <button
                  style={{ backgroundColor: currentColor }}
                  type="button"
                  className="h-10 w-32 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => {
                    dispatch(confirmOrder(id));
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
