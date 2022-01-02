import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createNewSearchString } from 'src/utils';
import Close from '../icons/Close';
import SearchModal from '../SearchModal';

interface SearchInputProps {
  value: string;
  onUpdate: (search: string) => void;
  getResult: (search: string) => string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onUpdate,
  getResult,
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const q = searchParams.get('q') || '';
    onUpdate(q);
  }, [onUpdate, searchParams]);

  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey) return;
      if (/^(?:input|textarea|select|button)$/i.test((e.target as any).tagName))
        return;

      e.preventDefault();
      setIsSearchModalOpen((prev) => !prev);
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      <div className="relative text-gray-600">
        <label>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none appearance-none"
            type="search"
            placeholder="Press / to search"
            value={value}
            autoComplete="search"
            readOnly
            onClick={() => setIsSearchModalOpen(true)}
            onKeyDown={(e) => {
              e.preventDefault();
              setIsSearchModalOpen(true);
            }}
          />
        </label>
        {value !== '' && (
          <Close
            className="absolute top-1/2 right-0 mr-4 -translate-y-1/2 h-4 cursor-pointer"
            onClick={() => {
              navigate({
                search: createNewSearchString('', searchParams),
              });
            }}
          />
        )}
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        getResult={getResult}
        getResultLink={(q) => createNewSearchString(q, searchParams)}
      />
    </>
  );
};

export default SearchInput;
