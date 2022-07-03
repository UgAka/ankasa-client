import React from "react";

export default function Filter({
  reset,
  listProduct,
  setShowMobileFilter,
  showMobileFilter,
  setTransitFiltered,
  transitFiltered,
  listAirline,
  setAirlinesFiltered,
  airlinesFiltered,
  setMinPriceFiltered,
  minPriceFiltered,
  setMaxPriceFiltered,
  maxPriceFiltered,
  setTypeFiltered,
  typeFiltered,
}) {
  const types = [
    { id: "economy", name: "Economy" },
    { id: "business", name: "Business" },
    { id: "firstclass", name: "First Class" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between my-3 d-none d-lg-flex align-items-center">
        <h5>
          <b>Filter</b>
        </h5>
        <button className="btn btn-transparent text-primary" onClick={reset}>
          <b>Reset</b>
        </button>
      </div>
      <div className="d-flex justify-content-between my-3 d-lg-none">
        <h5>
          <b>Select Ticket</b>
          <small className="ms-2 text-secondary" style={{ fontSize: "14px" }}>
            ({listProduct.data.length} Ticket Found)
          </small>
        </h5>
        <div>
          <p className="d-inline me-2">
            <b onClick={() => setShowMobileFilter(!showMobileFilter)}>Filter</b>
          </p>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3097 16.6888L9.43312 13.8123C9.22563 13.6048 9.1219 13.3329 9.1219 13.0609C9.1219 12.789 9.22563 12.5171 9.43312 12.3096C9.84806 11.8947 10.5208 11.8947 10.9357 12.3096L11.9985 13.3724L11.9985 2.23291C11.9985 1.64611 12.4742 1.17041 13.061 1.17041C13.6478 1.17041 14.1235 1.64611 14.1235 2.23291L14.1235 13.3724L15.1862 12.3096C15.6011 11.8947 16.2739 11.8947 16.6888 12.3096C17.1037 12.7246 17.1037 13.3973 16.6888 13.8123L13.8122 16.6888C13.3973 17.1037 12.7246 17.1037 12.3097 16.6888ZM5.00156 14.186L5.00156 3.62761L6.06429 4.69037C6.47923 5.10528 7.15196 5.10528 7.5669 4.69037C7.98184 4.2754 7.98184 3.6027 7.5669 3.18773L4.69035 0.311179C4.27541 -0.103727 3.60268 -0.103727 3.18774 0.311179L0.31119 3.18773C0.103704 3.39522 -2.30485e-05 3.66712 -2.30604e-05 3.93905C-2.30723e-05 4.21099 0.103704 4.48289 0.311189 4.69037C0.726129 5.10528 1.39886 5.10528 1.8138 4.69037L2.87653 3.62761L2.87653 14.186C2.87653 14.7728 3.35223 15.2485 3.93903 15.2485C4.52583 15.2485 5.00156 14.7728 5.00156 14.186Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {showMobileFilter && (
        <div className="filter d-lg-none">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="fw-bold">Transit</p>
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
                stroke="#2395FF"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p>Direct</p>
            <input
              className="form-check-input"
              type="radio"
              name="filterTransitMobile"
              checked={transitFiltered === "0" ? true : false}
              onChange={(e) => setTransitFiltered("0")}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p>Transit</p>
            <div className="d-flex align-items-center">
              <input
                type="number"
                className="form-control form-control-sm"
                style={{ width: "100px" }}
                value={transitFiltered}
                onChange={(e) => setTransitFiltered(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="fw-bold">Airlines</p>
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
                stroke="#2395FF"
                strokeWidth="3"
              />
            </svg>
          </div>
          {listAirline.data.map((airline) => (
            <div
              className="d-flex justify-content-between align-items-center my-3"
              key={airline.id}
            >
              <p>{airline.name}</p>
              <input
                className="form-check-input"
                type="radio"
                name="filterAirlineMobile"
                onChange={(e) => setAirlinesFiltered(airline.name)}
                checked={airlinesFiltered === airline.name}
              />
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="fw-bold">Type</p>
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
                stroke="#2395FF"
                strokeWidth="3"
              />
            </svg>
          </div>
          {types.map((type) => (
            <div
              className="d-flex justify-content-between align-items-center my-3"
              key={type.id}
            >
              <p>{type.name}</p>
              <input
                className="form-check-input"
                type="radio"
                name="filterType"
                onChange={() => setTypeFiltered(type.id)}
                checked={typeFiltered === type.id}
              />
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="fw-bold">Ticket Price</p>
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
                stroke="#2395FF"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p>Lowest</p>
            <div className="d-flex align-items-center">
              <span className="me-2">Rp.</span>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "100px" }}
                value={minPriceFiltered}
                onChange={(e) => setMinPriceFiltered(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <p>Highest</p>
            <div className="d-flex align-items-center">
              <span className="me-2">Rp.</span>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "100px" }}
                value={maxPriceFiltered}
                onChange={(e) => setMaxPriceFiltered(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="filter d-none d-lg-block">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="fw-bold">Transit</p>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
              stroke="#2395FF"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <p>Direct</p>
          <input
            className="form-check-input"
            type="radio"
            name="filterTransit"
            checked={transitFiltered === "0" ? true : false}
            onChange={(e) => setTransitFiltered("0")}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <p>Transit</p>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control form-control-sm"
              style={{ width: "100px" }}
              value={transitFiltered}
              onChange={(e) => setTransitFiltered(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="fw-bold">Airlines</p>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
              stroke="#2395FF"
              strokeWidth="3"
            />
          </svg>
        </div>
        {listAirline.data.map((airline) => (
          <div
            className="d-flex justify-content-between align-items-center my-3"
            key={airline.id}
          >
            <p>{airline.name}</p>
            <input
              className="form-check-input"
              type="radio"
              name="filterAirline"
              onChange={() => setAirlinesFiltered(airline.name)}
              checked={airlinesFiltered === airline.name}
            />
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="fw-bold">Type</p>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
              stroke="#2395FF"
              strokeWidth="3"
            />
          </svg>
        </div>
        {types.map((type) => (
          <div
            className="d-flex justify-content-between align-items-center my-3"
            key={type.id}
          >
            <p>{type.name}</p>
            <input
              className="form-check-input"
              type="radio"
              name="filterType"
              onChange={() => setTypeFiltered(type.id)}
              checked={typeFiltered === type.id}
            />
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="fw-bold">Ticket Price</p>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8761 8.90344L8.3112 2.55997C8.70452 2.17226 9.33995 2.17454 9.73047 2.56506L16.1199 8.95452"
              stroke="#2395FF"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <p>Lowest</p>
          <div className="d-flex align-items-center">
            <span className="me-2">Rp.</span>
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: "100px" }}
              value={minPriceFiltered}
              onChange={(e) => setMinPriceFiltered(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <p>Highest</p>
          <div className="d-flex align-items-center">
            <span className="me-2">Rp.</span>
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: "100px" }}
              value={maxPriceFiltered}
              onChange={(e) => setMaxPriceFiltered(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
