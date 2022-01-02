import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'src/composables/modals';
import Close from '../icons/Close';
import Search from '../icons/Search';
import _ from 'lodash';
import { theme } from 'src/theme';

interface SearchModalProps extends React.ComponentProps<typeof Modal> {
  getResult: (searchText: string) => string[];
  getResultLink: (result: string) => string;
}

const SearchModal: React.FC<SearchModalProps> = ({
  getResult,
  getResultLink,
  ...modalProps
}) => {
  const [searchText, setSearchText] = React.useState('');
  const [result, setResult] = React.useState<string[]>([]);

  const debouncedUpdateResult = React.useMemo(
    () =>
      _.debounce(
        (searchText) => {
          const result = getResult(searchText);
          setResult(result);
        },
        250,
        { maxWait: 1000 }
      ),
    [getResult]
  );

  React.useEffect(() => {
    debouncedUpdateResult(searchText);
  }, [debouncedUpdateResult, searchText]);

  return (
    <Modal {...modalProps}>
      <div className="mx-auto w-1/2 bg-white p-5">
        <div className="flex justify-between items-center mb-6">
          <h3
            className="font-bold text-2xl"
            style={{ color: theme.colors.primary }}
          >
            Search in Menu
          </h3>
          <button onClick={modalProps.onClose} className="">
            <Close aria-label="close" className="h-6 text-gray-500" />
          </button>
        </div>
        <form className="mb-8" onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              className="w-full border-2 border-gray-300 h-10 px-5 rounded-lg text-sm focus:outline-none"
              type="search"
              autoFocus
              autoComplete="search"
              placeholder="Start typing..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </label>
        </form>
        <div>
          {result.length === 0 ? (
            <p className="text-sm text-center text-gray-500">No result</p>
          ) : (
            <ul>
              {result.map((name, index) => {
                return (
                  <li key={name + index} className="">
                    <Link
                      onClick={modalProps.onClose}
                      to={{ search: getResultLink(name) }}
                      className="flex items-center hover:bg-gray-200 text-gray-500 py-2 px-5 mb-3"
                    >
                      <Search className="h-4 mr-4" />
                      <span> {name[0].toUpperCase() + name.slice(1)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
