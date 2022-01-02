import * as React from 'react';
import { useAuth } from 'src/composables/auth';
import { Dish as DishType } from 'src/services/firestore/dish';
import { RestaurantWithMenu } from 'src/services/firestore/user';
import CreateDishButton from '../CreateDishButton';
import Dish from '../Dish';
import SearchInput from '../SearchInput';
import SortByDropdown, { OrderByType, SortByType } from '../SortByDropDown';

interface MenuProps {
  restaurant: RestaurantWithMenu;
}

const Menu: React.FC<MenuProps> = ({ restaurant }) => {
  const { user } = useAuth();
  const [allMenu, setAllMenu] = React.useState<DishType[]>([]);
  const [filteredMenu, setFilteredMenu] = React.useState<DishType[]>([]);

  const [sortBy, setSortBy] = React.useState<SortByType>(SortByType.DEFAULT);
  const [orderBy, setOrderBy] = React.useState<OrderByType>(
    OrderByType.ASCENDING
  );
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setAllMenu([...restaurant.menu]);

    return () => {
      setAllMenu([]);
    };
  }, [restaurant.menu]);

  React.useEffect(() => {
    let newMenu = [...allMenu];
    if (searchText !== '') {
      newMenu = newMenu.filter((dish) =>
        dish.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    newMenu.sort((dish1, dish2) => {
      let field: keyof DishType;

      switch (sortBy) {
        case SortByType.NAME:
          field = 'name';
          break;
        case SortByType.PRICE:
          field = 'price';
          break;
        case SortByType.DEFAULT:
        default:
          field = 'id';
          break;
      }

      let result = 0;
      if (dish1[field] < dish2[field]) {
        result = -1;
      } else if (dish1[field] > dish2[field]) {
        result = 1;
      }
      if (orderBy === OrderByType.DESCENDING) {
        result = -result;
      }
      return result;
    });

    setFilteredMenu(newMenu);
  }, [allMenu, searchText, sortBy, orderBy]);

  return (
    <div className="rounded overflow-hidden bg-white p-4 sm:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
        <h3 className="text-2xl font-bold mb-4 sm:mb-8 md:mb-0 text-primary">
          Menu
        </h3>

        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 sm:gap-x-3 items-center">
          {user && (
            <CreateDishButton
              restaurant={restaurant}
              onCreated={(dish) => {
                setAllMenu((prev) => {
                  return [dish, ...prev];
                });
              }}
            />
          )}
          <SortByDropdown
            sortByValue={sortBy}
            onSortByValueUpdate={setSortBy}
            orderByValue={orderBy}
            onOrderByValueUpdate={setOrderBy}
          />
          <SearchInput
            value={searchText}
            onUpdate={setSearchText}
            getResult={(searchText) => {
              const q = searchText.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
              if (q === '') return [];
              return Array.from(
                new Set([
                  ...allMenu.map((dish) => dish.name.toLowerCase()),
                  searchText.toLocaleLowerCase(),
                ])
              ).filter((name: string) => new RegExp(q, 'gi').test(name));
            }}
          />
        </div>
      </div>
      {filteredMenu.length === 0 ? (
        <p className="text-center text-lg mb-8">
          No result for <span className="font-bold">{searchText}</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-items-center gap-y-8 gap-x-8">
          {filteredMenu.map((dish) => {
            return <Dish key={dish.id} {...dish} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
