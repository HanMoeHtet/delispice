export const createNewSearchString = (
  q: string,
  searchParams?: URLSearchParams
) => {
  const newSearchParams = new URLSearchParams(searchParams);
  if (q === '') {
    newSearchParams.delete('q');
  } else {
    newSearchParams.set('q', q);
  }
  return newSearchParams.toString();
};
