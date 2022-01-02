import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sort from '../icons/Sort';
import SortDown from '../icons/SortDown';
import SortUp from '../icons/SortUp';

export enum SortByType {
  DEFAULT = '',
  NAME = 'name',
  PRICE = 'price',
}

export const isSortByType = (value: string): value is SortByType => {
  return Object.values(SortByType).includes(value as SortByType);
};

export enum OrderByType {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export const isOrderByType = (value: string): value is OrderByType => {
  return Object.values(OrderByType).includes(value as OrderByType);
};

interface SortByDropdownProps {
  sortByValue: SortByType;
  orderByValue: OrderByType;
  onSortByValueUpdate: (sortByValue: SortByType) => void;
  onOrderByValueUpdate: (orderByValue: OrderByType) => void;
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({
  sortByValue,
  orderByValue,
  onSortByValueUpdate,
  onOrderByValueUpdate,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const sortBy = searchParams.get('sort');
    if (sortBy !== null && isSortByType(sortBy)) {
      onSortByValueUpdate(sortBy);
    }

    const orderBy = searchParams.get('order');
    if (orderBy !== null && isOrderByType(orderBy)) {
      onOrderByValueUpdate(orderBy);
    }
  }, [onSortByValueUpdate, onOrderByValueUpdate, searchParams]);

  const checkIsSortByActive = (sortBy: SortByType) => {
    return sortBy === sortByValue ? 'text-white bg-tertiary' : 'text-gray-700';
  };

  const checkIsOrderByActive = (orderBy: OrderByType) => {
    return orderBy === orderByValue
      ? 'text-white bg-tertiary'
      : 'text-gray-700';
  };

  const getSearchString = (sortBy: SortByType, orderBy: OrderByType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', sortBy);
    newSearchParams.set('order', orderBy);
    return newSearchParams.toString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
        className="text-white px-2 py-2 rounded mr-2 bg-tertiary-light hover:bg-tertiary"
      >
        <Sort className="h-6" />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="z-10 origin-top-right absolute right-0 mt-2 p-2 max-w-sm rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.15,
              ease: 'easeOut',
            }}
          >
            <h4 className="text-center font-bold mb-4">Sort By</h4>
            <div className="flex">
              <ul className="mr-4">
                <li>
                  <button
                    type="button"
                    className={`flex items-center w-full p-2 pb-0 ${checkIsOrderByActive(
                      OrderByType.ASCENDING
                    )} hover:bg-tertiary-light hover:text-white`}
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      navigate({
                        search: getSearchString(
                          sortByValue,
                          OrderByType.ASCENDING
                        ),
                      });
                    }}
                  >
                    <SortUp className="h-6" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`flex items-centerw-full p-2 pt-0 ${checkIsOrderByActive(
                      OrderByType.DESCENDING
                    )} hover:bg-tertiary-light hover:text-white`}
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      navigate({
                        search: getSearchString(
                          sortByValue,
                          OrderByType.DESCENDING
                        ),
                      });
                    }}
                  >
                    <SortDown className="h-6 pt-0" />
                  </button>
                </li>
              </ul>
              <ul>
                <li>
                  <button
                    type="button"
                    className={`flex items-center w-full px-4 py-2 ${checkIsSortByActive(
                      SortByType.DEFAULT
                    )} hover:bg-tertiary-light hover:text-white`}
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      navigate({
                        search: getSearchString(
                          SortByType.DEFAULT,
                          orderByValue
                        ),
                      });
                    }}
                  >
                    <span className="">Default</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`flex items-center  w-full px-4 py-2 ${checkIsSortByActive(
                      SortByType.NAME
                    )} hover:bg-tertiary-light hover:text-white`}
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      navigate({
                        search: getSearchString(SortByType.NAME, orderByValue),
                      });
                    }}
                  >
                    <span className="">Name</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`flex items-center w-full px-4 py-2 ${checkIsSortByActive(
                      SortByType.PRICE
                    )} hover:bg-tertiary-light hover:text-white`}
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      navigate({
                        search: getSearchString(SortByType.PRICE, orderByValue),
                      });
                    }}
                  >
                    <span className="">Price</span>
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortByDropdown;
