import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMerchants, createMerchant } from '../redux/actions/merchant';
import { Header, Loading, Merchant, Toast } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { TOAST_OBJECT } from '../utils/constants';

const Merchants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentColor, currentMode } = useStateContext();
  const { setActiveProductSectionIndex } = useStateContext();
  const { merchantsLoading, merchantsError, merchants } = useSelector(
    (state) => state.merchants
  );
  const { merchantLoading, merchantError, merchant, merchantNew } = useSelector(
    (state) => state.merchant
  );
  useEffect(() => {
    setActiveProductSectionIndex(undefined);
    !merchants && dispatch(getMerchants());
    if (merchant && merchantNew) {
      navigate(`/merchants/${merchant._id}`);
      dispatch({ type: 'RESET_MERCHANT' });
    } else if (merchantError) {
      toast.error(merchantError, TOAST_OBJECT);
      dispatch({ type: 'RESET_MERCHANT' });
    }
  }, [dispatch, merchantLoading, merchantsError]);
  return (
    <>
      <Toast />
      {(merchantsLoading || merchantLoading) && <Loading />}
      {merchants && (
        <div class="m-2 md:m-10 mt-24 p-8 md:p-8 bg-white rounded-2xl max-h-full dark:bg-secondary-dark-bg dark:text-gray-200">
          <div className="py-2 px-2 mb-8 bg-light-gray text-right rounded-2xl">
            <button
              style={{ backgroundColor: currentColor }}
              type="button"
              className="h-10 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => {
                dispatch(createMerchant());
              }}
            >
              Add Merchant
            </button>
          </div>
          <div class="md:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchants &&
              merchants.map((merchant) => {
                return <Merchant merchant={merchant} key={merchant._id} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};
export default Merchants;
