import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import maya from '../data/maya.png';
import { updatePayment } from '../redux/actions/payments';

const Notification = () => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const { _, __, payments } = useSelector((state) => state.payments);
  const [balance, setBalance] = useState();

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Payments</p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {payments
          ?.filter((item) => item.status === 'Pending')
          ?.map((item, index) => (
            <div
              key={index}
              className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
            >
              <img
                className="rounded-full h-10 w-10"
                src={item.method === 'Maya' && maya}
                alt={item.message}
              />
              <div>
                <p className="text-sm font-semibold dark:text-gray-200">
                  <span className="text-xs text-gray-500 font-light">
                    Reference ID:{' '}
                  </span>
                  {item.reference_id}
                </p>
                <p className="text-xs font-semibold dark:text-gray-200">
                  <span className="text-gray-500 font-light">
                    Order Amount:{' '}
                  </span>
                  ₱{item.amount}
                </p>
                <p className="text-gray-500 text-xs dark:text-gray-400">
                  <span>Sender: </span>
                  {item.sender.name}
                </p>
                {item.status === 'Pending' && (
                  <div className="flex text-sm gap-2 mt-2">
                    <button
                      style={{ borderColor: currentColor, color: currentColor }}
                      type="button"
                      className="text-center h-6 w-12 border-2 shadow-sm text-xs rounded-lg text-white focus:outline-none focus:ring-transparent"
                      onClick={() =>
                        dispatch(
                          updatePayment(item._id, { status: 'Rejected' })
                        )
                      }
                    >
                      Reject
                    </button>
                    {balance?.index === index ? (
                      <input
                        type="number"
                        autoComplete="off"
                        id="balance"
                        class="rounded-lg border-transparent appearance-none border border-gray-300 h-6 w-24 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="balance"
                        onChange={(e) =>
                          setBalance({ index: index, value: e.target.value })
                        }
                        placeholder="Balance"
                      />
                    ) : (
                      <button
                        style={{ backgroundColor: currentColor }}
                        type="button"
                        className="text-center h-6 w-16 shadow-sm text-xs rounded-lg text-white focus:outline-none focus:ring-transparent"
                        onClick={() => setBalance({ index: index, value: 0 })}
                      >
                        Balance
                      </button>
                    )}
                    <button
                      style={{ backgroundColor: currentColor }}
                      type="button"
                      className="text-center h-6 w-16 shadow-sm text-xs rounded-lg text-white focus:outline-none focus:ring-transparent"
                      onClick={() =>
                        dispatch(
                          updatePayment(item._id, {
                            status: 'Accepted',
                            balance,
                          })
                        )
                      }
                    >
                      Accept
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="See all payments"
            borderRadius="16px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
