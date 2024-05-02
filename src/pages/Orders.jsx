import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Loading, OrderList } from '../components';

import { getOrders } from '../redux/actions/orders';

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 dark:bg-secondary-dark-bg bg-white rounded-2xl">
      {loading ? (
        <Loading />
      ) : (
        orders && (
          <>
            <OrderList orders={orders} />
          </>
        )
      )}
    </div>
  );
};
export default Orders;
