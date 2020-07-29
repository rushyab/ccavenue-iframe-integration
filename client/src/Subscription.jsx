import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DUMMY_ORDER_INFO = {
  orderId: 1,
  payableAmount: 100,
  name: "test",
  phoneNumber: "1234567890",
  email: "test@email.com",
  address: "Hyderabad",
  city: "Hyderabad",
  state: "TG",
  pincode: 500001,
};

const PAYMENT_STATUS = {
  aborted: "Aborted",
  invalid: "Aborted",
  failure: "Failed",
  timeout: "Timeout",
  success: "Successful",
  server_error: "Server Error",
};

export default function Subscription() {
  const [encReqURL, setEncReqURL] = React.useState("");
  const [hasIFrameLoaded, setHasIFrameLoaded] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const param = new URLSearchParams(location.search);
    for (let key in PAYMENT_STATUS) {
      if (param.get(key)) {
        // setMessage(`Transaction ${PAYMENT_STATUS[key]}`);
      }
    }
  }, []);

  async function handlePayNow() {
    try {
      const res = await axios.post("http://localhost:5000/ccavenue/encrypt", {
        ...DUMMY_ORDER_INFO,
      });
      setEncReqURL(res.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mt-5">
        <button
          className="btn btn-lg btn-primary"
          onClick={handlePayNow}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Pay Now
        </button>
      </div>

      {/*  IFrame Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ minHeight: "700px", width: "650px" }}
          >
            {!hasIFrameLoaded && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "700px" }}
              >
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <iframe
              title="ccavenue"
              onLoad={() => setHasIFrameLoaded(true)}
              width="100%"
              style={{
                height: `${hasIFrameLoaded ? "650px" : "0px"}`,
              }}
              scrolling="Yes"
              frameBorder="0"
              id="paymentFrame"
              src={encReqURL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
