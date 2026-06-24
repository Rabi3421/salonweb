import { API_BASE_URL, SALON_ID } from '@/lib/env';

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

async function request<T = unknown>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-salon-id': SALON_ID,
      ...options?.headers,
    },
    ...options,
  });

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
