import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Country, State } from "country-state-city";
import { 
  PinDrop, 
  Home, 
  LocationCity, 
  Public, 
  Phone, 
  TransferWithinAStation 
} from "@material-ui/icons";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      alert.error("Phone Number should be exactly 10 digits");
      return;
    }

    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    history.push("/order/confirm");
  };

  return (
    <React.Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="shipping-container">
        <div className="shipping-box">
          <h2 className="shipping-heading">Shipping Details</h2>

          <form className="shipping-form" onSubmit={handleShippingSubmit}>
            <div className="form-group">
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <PinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="form-group">
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(country).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="shipping-btn" disabled={!state}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shipping;
