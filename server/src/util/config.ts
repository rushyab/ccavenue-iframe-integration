export const CCAVENUE_MERCHANT_ID = process.env.MERCHANT_ID || "";
export const CCAVENUE_WORKING_KEY = process.env.WORKING_KEY || "";
export const CCAVENUE_ACCESS_CODE = process.env.ACCESS_CODE || "";
export const PORT = process.env.PORT || "";
export const SERVER_IP = process.env.SERVER_IP || "";
export const FRONTEND_DOMAIN_NAME = process.env.FRONTEND_DOMAIN_NAME || "";

function checkEnvironmentVariablesExists() {
  if (
    !CCAVENUE_MERCHANT_ID ||
    !CCAVENUE_WORKING_KEY ||
    !CCAVENUE_ACCESS_CODE ||
    !PORT ||
    !SERVER_IP ||
    !FRONTEND_DOMAIN_NAME
  ) {
    throw new Error(
      `Some of following variables are not defined in env variables
      ${"CCAVENUE_MERCHANT_ID - " + CCAVENUE_MERCHANT_ID}
      ${"CCAVENUE_WORKING_KEY - " + CCAVENUE_WORKING_KEY}
      ${"CCAVENUE_ACCESS_CODE - " + CCAVENUE_ACCESS_CODE}
      ${"PORT - " + PORT}
      ${"SERVER_IP - " + SERVER_IP}
      ${"FRONTEND_DOMAIN_NAME - " + FRONTEND_DOMAIN_NAME}
    `
    );
  }
}

checkEnvironmentVariablesExists();

export default {
  CCAVENUE_MERCHANT_ID,
  CCAVENUE_WORKING_KEY,
  CCAVENUE_ACCESS_CODE,
  PORT,
  SERVER_IP,
  FRONTEND_DOMAIN_NAME,
};