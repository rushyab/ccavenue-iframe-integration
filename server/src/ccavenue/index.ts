import { createCipheriv, createDecipheriv, createHash } from "crypto";

enum OrderStatus {
  Failure = "Failure",
  Success = "Success",
  Aborted = "Aborted",
  Invalid = "Invalid",
  Timeout = "Timeout",
}

enum PaymentMode {
  IVRS = "IVRS",
  EMI = "EMI",
  UPI = "UPI",
  Wallet = "Wallet",
  CreditCard = "Credit Card",
  NetBanking = "Net banking",
  DebitCard = "Debit Card",
  Cash = "Cash Card",
}

interface IOrderParams {
  order_id: number | string;
  currency: string;
  amount: number;
  language: string;
  redirect_url: string;
  cancel_url: string;
  billing_name: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: number;
  billing_country: string;
  billing_tel: string;
  billing_email: string;
  integration_type: string;
}

export interface IResponse {
  order_id: string;
  tracking_id: string;
  bank_ref_no: string;
  order_status: OrderStatus;
  failure_message: string;
  payment_mode: PaymentMode;
  card_name: string;
  status_code: string;
  status_message: string;
  currency: string;
  amount: string;
  [key: string]: string;
  // billing_name: ;
  // billing_address: "OPTIONAL";
  // billing_city: "OPTIONAL";
  // billing_state: "OPTIONAL";
  // billing_zip: "OPTIONAL";
  // billing_country: "India";
  // billing_tel: "99999999999";
  // billing_email: "firstname.lastname@customer.com";
  // delivery_name: "OPTIONAL";
  // delivery_address: "OPTIONAL";
  // delivery_city: "OPTIONAL";
  // delivery_state: "OPTIONAL";
  // delivery_zip: "OPTIONAL";
  // delivery_country: "India";
  // delivery_tel: "99999999999";
  // merchant_param1: "";
  // merchant_param2: "";
  // merchant_param3: "";
  // merchant_param4: "";
  // merchant_param5: "";
  // vault: "N";
  // offer_type: "null";
  // offer_code: "null";
  // discount_value: "0.0";
  // mer_amount: "1200.00";
  // eci_value: "null";
  // retry: "N";
  // response_code: "0";
  // billing_notes: "";
  // trans_date: "21/04/2019 16:04:38";
  // bin_country: "";
}

interface IOptions {
  merchantId: string;
  workingKey: string;
}

class Configure {
  private initOptions: IOptions;
  constructor(options: IOptions) {
    this.initOptions = options || {};
  }

  private encrypt(plainText: string) {
    try {
      if (!plainText) throw new Error("Plain text not found");
      if (!this.initOptions.workingKey) {
        throw new Error("No Working Key found");
      }
      const workingKey = this.initOptions.workingKey;
      const m = createHash("md5");
      m.update(workingKey);
      const key = m.digest();
      const iv =
        "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
      const cipher = createCipheriv("aes-128-cbc", key, iv);
      let encoded = cipher.update(plainText, "utf8", "hex");
      encoded += cipher.final("hex");
      return encoded;
    } catch (error) {
      throw new Error(error);
    }
  }

  private decrypt(encText: string) {
    try {
      if (!encText) throw new Error("Encrypted text not found");
      if (!this.initOptions.workingKey) {
        throw new Error("No Working Key found");
      }
      const workingKey = this.initOptions.workingKey;
      const m = createHash("md5");
      m.update(workingKey);
      const key = m.digest();
      const iv =
        "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
      const decipher = createDecipheriv("aes-128-cbc", key, iv);
      let decoded = decipher.update(encText, "hex", "utf8");
      decoded += decipher.final("utf8");
      return decoded;
    } catch (error) {
      throw new Error(error);
    }
  }

  public getEncryptedOrder(orderParams: IOrderParams) {
    try {
      if (!orderParams) throw new Error("Order params not found");
      if (!this.initOptions.merchantId) {
        throw new Error("Merchant ID not found");
      }
      let data = `merchant_id=${this.initOptions.merchantId}`;
      data += Object.entries(orderParams)
        .map(([key, value]) => `&${key}=${value}`)
        .join("");

      return this.encrypt(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  public convertResponseToJSON(encryptedResponse: string): IResponse {
    try {
      if (!encryptedResponse) {
        throw new Error("CCavenue response not found");
      }
      const ccavResponse: string = this.decrypt(encryptedResponse);
      const responseArray = ccavResponse.split("&");
      const stringify = JSON.stringify(responseArray);
      const removeBracket = stringify.replace(/[[\]]/g, "");
      // console.log(removeBracket);
      const removeQuotes = removeBracket.replace(/['"]+/g, "");
      // console.log("\n", removeQuotes, "\n");
      return removeQuotes.split(",").reduce((obj, pair: string) => {
        const _pair: string[] = pair.split("=");
        return (obj[_pair[0]] = _pair[1]), obj;
      }, {} as IResponse);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default { Configure };
