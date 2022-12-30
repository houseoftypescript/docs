import { ParsedUrlQuery } from 'querystring';

export const getQueryParam = (
  query: ParsedUrlQuery,
  key: string,
  defaultValue = ''
): string => {
  const queryValue: string | string[] = query[key];
  if (!queryValue) {
    return defaultValue;
  }
  const value: string =
    typeof queryValue === 'string' ? queryValue : queryValue[0];
  return value || defaultValue;
};
