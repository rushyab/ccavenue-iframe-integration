import {
  CCAVENUE_MERCHANT_ID,
  CCAVENUE_ACCESS_CODE,
  SERVER_IP,
  FRONTEND_DOMAIN_NAME,
  PORT,
} from "../util/config";

export const CCAVENUE_REQUEST_URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${CCAVENUE_MERCHANT_ID}&encRequest=:encRequest&access_code=${CCAVENUE_ACCESS_CODE}`;
export const CCAVENUE_REDIRECT_URL = `${SERVER_IP}:${PORT}/ccavenue/redirect-url`;
export const CCAVENUE_FRONTEND_REDIRECT_URL = `${FRONTEND_DOMAIN_NAME}/subscription`;