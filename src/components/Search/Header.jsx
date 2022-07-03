import React from "react";

export default function Header({
  originFiltered,
  setOriginFiltered,
  destinationFiltered,
  setDestinationFiltered,
  typeFiltered,
  applyFilter,
  passenger,
}) {
  return (
    <header className="text-white">
      <div className="desktop d-flex justify-content-between align-items-center d-none d-md-flex">
        <div className="right">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <div className="mt-4">
                <svg
                  width="50"
                  height="35"
                  viewBox="0 0 50 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.29307 32.9371C6.78369 33.6656 7.47274 34.0788 8.19382 34.0777L18.3921 34.0586C19.1969 34.0571 19.9901 33.7973 20.7076 33.3003L43.4385 17.576C45.5275 16.1308 47.4001 14.068 48.6743 11.3661C50.1047 8.3331 50.2602 6.1382 49.6954 4.5876C49.1321 3.03594 47.7626 1.89642 45.1447 1.66425C42.8127 1.45765 40.4932 2.29472 38.4042 3.73882L30.7082 9.06261L13.6226 0.323454C13.4172 0.134803 13.1785 0.0243769 12.9313 0.00359444C12.6841 -0.017188 12.4373 0.052427 12.2164 0.205242L7.07978 3.75905C6.2462 4.3352 6.04464 5.85172 6.67588 6.79742L18.8803 17.2448L10.8172 22.8231L5.16497 18.9392C4.97023 18.8053 4.75514 18.7358 4.53706 18.7361C4.31898 18.7365 4.10401 18.8068 3.90952 18.9413L0.774426 21.1106C-0.0411833 21.6751 -0.256023 23.1469 0.339278 24.1011L6.29307 32.9371Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="destination d-flex justify-content-between ms-3 w-100">
                <div className="from text-start mx-2">
                  <p>From</p>
                  <h5 className="mt-1">
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "120px" }}
                      value={originFiltered}
                      onChange={(e) => setOriginFiltered(e.target.value)}
                    />
                  </h5>
                </div>
                <div className="d-flex align-items-center mt-3 mx-2">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6888 4.69033L13.8123 7.56688C13.6048 7.77437 13.3329 7.8781 13.0609 7.8781C12.789 7.8781 12.5171 7.77437 12.3096 7.56688C11.8947 7.15194 11.8947 6.47922 12.3096 6.06428L13.3724 5.00154H2.23291C1.64611 5.00154 1.17041 4.52584 1.17041 3.93904C1.17041 3.35225 1.64611 2.87654 2.23291 2.87654H13.3724L12.3096 1.81381C11.8947 1.39887 11.8947 0.726144 12.3096 0.311205C12.7246 -0.103735 13.3973 -0.103735 13.8123 0.311205L16.6888 3.18776C17.1037 3.60266 17.1037 4.27542 16.6888 4.69033V4.69033ZM14.186 11.9984H3.62761L4.69037 10.9357C5.10528 10.5208 5.10528 9.84804 4.69037 9.4331C4.2754 9.01816 3.60271 9.01816 3.18773 9.4331L0.31118 12.3097C-0.103727 12.7246 -0.103727 13.3973 0.31118 13.8123L3.18773 16.6888C3.39522 16.8963 3.66712 17 3.93905 17C4.21099 17 4.48289 16.8963 4.69037 16.6888C5.10528 16.2739 5.10528 15.6011 4.69037 15.1862L3.62761 14.1235H14.186C14.7728 14.1235 15.2485 13.6478 15.2485 13.061C15.2485 12.4742 14.7728 11.9984 14.186 11.9984Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="to text-end mx-2">
                  <p>To</p>
                  <h5 className="mt-1">
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "120px" }}
                      value={destinationFiltered}
                      onChange={(e) => setDestinationFiltered(e.target.value)}
                    />
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <small className="me-1" style={{ marginLeft: "74px" }}>
                All Time
              </small>
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
              </svg>
              <small className="mx-1">
                {typeFiltered
                  ? typeFiltered[0].toUpperCase() + typeFiltered.slice(1)
                  : "All Class"}
              </small>
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
              </svg>
              <small className="mx-1">
                {passenger.adult
                  ? `${
                      parseInt(passenger.adult) + parseInt(passenger.child)
                    } Passenger`
                  : "All Stock"}
              </small>
            </div>
          </div>
        </div>
        <div className="left">
          <button className="btn btn-transparent text-white">
            <b onClick={() => applyFilter()}>Change Search</b>
          </button>
        </div>
      </div>
      <div className="mobile d-md-none">
        <div className="d-flex justify-content-between align-items-center">
          <svg
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1005 2.10051L2.90812 11.2929C2.51759 11.6834 2.51759 12.3166 2.90812 12.7071L12.1005 21.8995"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
          <div
            className="mx-2 p-2 rounded"
            style={{ backgroundColor: "rgba(255,255,255,.25)" }}
          >
            Monday, 20 July 2020
          </div>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p>From</p>
            <input
              type="text"
              className="form-control"
              style={{ width: "120px" }}
              value={originFiltered}
              onChange={(e) => setOriginFiltered(e.target.value)}
            />
          </div>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6888 4.69058L13.8123 7.56713C13.6048 7.77461 13.3329 7.87834 13.0609 7.87834C12.789 7.87834 12.5171 7.77461 12.3096 7.56713C11.8947 7.15219 11.8947 6.47946 12.3096 6.06452L13.3724 5.00179H2.23291C1.64611 5.00179 1.17041 4.52609 1.17041 3.93929C1.17041 3.35249 1.64611 2.87679 2.23291 2.87679H13.3724L12.3096 1.81406C11.8947 1.39912 11.8947 0.726388 12.3096 0.311449C12.7246 -0.103491 13.3973 -0.103491 13.8123 0.311449L16.6888 3.188C17.1037 3.60291 17.1037 4.27567 16.6888 4.69058ZM14.186 11.9987H3.62761L4.69037 10.9359C5.10528 10.521 5.10528 9.84828 4.69037 9.43334C4.2754 9.0184 3.60271 9.0184 3.18773 9.43334L0.31118 12.3099C-0.103727 12.7248 -0.103727 13.3976 0.31118 13.8125L3.18773 16.6891C3.39522 16.8965 3.66712 17.0003 3.93905 17.0003C4.21099 17.0003 4.48289 16.8965 4.69037 16.6891C5.10528 16.2741 5.10528 15.6014 4.69037 15.1864L3.62761 14.1237H14.186C14.7728 14.1237 15.2485 13.648 15.2485 13.0612C15.2485 12.4744 14.7728 11.9987 14.186 11.9987Z"
              fill="white"
            />
          </svg>
          <div className="text-end">
            <p>To</p>
            <input
              type="text"
              className="form-control"
              style={{ width: "120px" }}
              value={destinationFiltered}
              onChange={(e) => setDestinationFiltered(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-transparent text-white">
            <b onClick={() => applyFilter()}>Change Search</b>
          </button>
        </div>
      </div>
    </header>
  );
}
