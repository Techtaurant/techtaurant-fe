import { API_BASE_URL, IS_SERVER } from '@/shared/config';

let isRefreshing: Promise<boolean> | null = null;

const parseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  if (response.headers.get('content-type')?.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

export const customFetch = async <T>(url: string, init: RequestInit = {}): Promise<T> => {
  const requestInit: RequestInit = {
    ...init,
    credentials: IS_SERVER ? 'omit' : (init.credentials ?? 'include'),
  };

  let response = await fetch(url, requestInit);

  if (!IS_SERVER && response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = fetch(`${API_BASE_URL}/open-api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })
        .then((refreshResponse) => refreshResponse.ok)
        .finally(() => {
          isRefreshing = null;
        });
    }

    if (await isRefreshing) {
      response = await fetch(url, requestInit);
    }
  }

  return {
    data: await parseBody(response),
    status: response.status,
    headers: response.headers,
  } as T;
};
