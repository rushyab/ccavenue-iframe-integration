import express from "express";
import ccavenue, { IResponse } from "./ccavenue";
import {
  CCAVENUE_REDIRECT_URL,
  CCAVENUE_FRONTEND_REDIRECT_URL,
  CCAVENUE_REQUEST_URL,
} from "./constants/urls";
import { CCAVENUE_MERCHANT_ID, CCAVENUE_WORKING_KEY } from "./util/config";

const router = express.Router();

const ccav = new ccavenue.Configure({
  merchantId: CCAVENUE_MERCHANT_ID || "",
  workingKey: CCAVENUE_WORKING_KEY || "",
});

async function savePaymentDetails(ccavenueResponse: IResponse) {
  try {
    // save the response in your db
    console.log(ccavenueResponse);
  } catch (error) {
    throw new Error(error.message);
  }
}

router.post("/encrypt", async (req, res) => {
  try {
    const {
      orderId,
      payableAmount,
      name,
      address,
      city,
      state,
      pincode,
      phoneNumber,
      email,
    } = req.body;

    const order = {
      order_id: orderId,
      currency: "INR",
      amount: payableAmount,
      billing_address: address,
      billing_name: name,
      billing_city: city,
      billing_state: state,
      billing_zip: pincode,
      billing_country: "India",
      billing_tel: phoneNumber,
      billing_email: email,
      redirect_url: encodeURIComponent(CCAVENUE_REDIRECT_URL),
      cancel_url: encodeURIComponent(CCAVENUE_REDIRECT_URL),
      language: "EN",
      integration_type: "iframe_normal",
    };

    const encRequest = ccav.getEncryptedOrder(order);
    const encryptedRequestUrl = CCAVENUE_REQUEST_URL.replace(
      ":encRequest",
      encRequest
    );

    res.json(encryptedRequestUrl);
  } catch (error) {
    console.log("ccavenue enc error ", error);
    res.status(500).send(error.message);
  }
});

router.post("/redirect-url", async (req, res) => {
  try {
    const { encResp } = req.body;
    const decryptedJsonResponse = ccav.convertResponseToJSON(encResp);
    console.log(decryptedJsonResponse);
    await savePaymentDetails(decryptedJsonResponse);
    res.redirect(
      `${CCAVENUE_FRONTEND_REDIRECT_URL}?${decryptedJsonResponse.order_status.toLowerCase()}=true`
    );
  } catch (error) {
    console.log(error);
    res.redirect(`${CCAVENUE_FRONTEND_REDIRECT_URL}?server_error=true`);
  }
});

module.exports = router;
