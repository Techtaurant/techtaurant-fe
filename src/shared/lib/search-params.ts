type SearchParamsValue = string | string[] | undefined;
type SearchParamsRecord = Record<string, SearchParamsValue>;
type SearchParamsWithGet = {
  get: (key: string) => string | null;
};
export type SearchParamsLike = SearchParamsWithGet | SearchParamsRecord | undefined;

const hasSearchParamGetter = (searchParams: SearchParamsLike): searchParams is SearchParamsWithGet => {
  return Boolean(
    searchParams && typeof searchParams === 'object' && 'get' in searchParams && typeof searchParams.get === 'function',
  );
};

export const getSearchParamValue = (searchParams: SearchParamsLike, key: string) => {
  if (!searchParams) return undefined;

  if (hasSearchParamGetter(searchParams)) {
    return searchParams.get(key) ?? undefined;
  }

  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};
