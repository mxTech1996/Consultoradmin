export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://backend.bstable.payvertex.io/api/";

export const TRANSACTION = `${BASE_URL}v1/merchant_transaction/`;
export const SEND_EMAIL = `${BASE_URL}v1/send-email/send-email`;
