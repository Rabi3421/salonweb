export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Salon Web';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export const SALON_ID = (() => {
  const id = process.env.NEXT_PUBLIC_SALON_ID;
  if (!id) {
    console.warn('NEXT_PUBLIC_SALON_ID is not set. Backend API calls will fail.');
    return '';
  }
  return id;
})();
