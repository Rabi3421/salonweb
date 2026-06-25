import { SALON_ID } from '@/lib/env';

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch('/api/salon/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-salon-id': SALON_ID,
        },
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function buildFetchOptions(options?: RequestInit): RequestInit {
  return {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-salon-id': SALON_ID,
      ...options?.headers,
    },
    ...options,
  };
}

async function request<T = unknown>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  let res: Response;
  try {
    res = await fetch(path, buildFetchOptions(options));
  } catch {
    throw new Error('Unable to connect to server.');
  }

  if (res.status === 401 && !path.includes('/auth/login')) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      try {
        res = await fetch(path, buildFetchOptions(options));
      } catch {
        throw new Error('Unable to connect to server.');
      }
    }
  }

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !json.success) {
    throw new Error(json.message || `Request failed: ${res.status}`);
  }

  return json;
}

export function apiGet<T = unknown>(path: string) {
  return request<T>(path);
}

export function apiPost<T = unknown>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function apiPatch<T = unknown>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function apiDelete<T = unknown>(path: string) {
  return request<T>(path, { method: 'DELETE' });
}
