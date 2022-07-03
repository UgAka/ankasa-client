import "../assets/styles/search.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListProduct } from "../redux/actions/product";
import { getListAirline } from "../redux/actions/airline";
import Header from "../components/Search/Header";
import Filter from "../components/Search/Filter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Search/Product";
import Pagination from "../components/Search/Pagination";

export default function SearchFlight() {
  const dispatch = useDispatch();
  const { listProduct, listAirline, passenger } = useSelector((state) => state);

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [transitFiltered, setTransitFiltered] = useState("");
  const [airlinesFiltered, setAirlinesFiltered] = useState("");
  const [minPriceFiltered, setMinPriceFiltered] = useState("");
  const [maxPriceFiltered, setMaxPriceFiltered] = useState("");
  const [originFiltered, setOriginFiltered] = useState("");
  const [destinationFiltered, setDestinationFiltered] = useState("");
  const [typeFiltered, setTypeFiltered] = useState("");
  const [stockFiltered, setStockFiltered] = useState("");
  const [sortFiltered, setSortFiltered] = useState("");
  const [limitFiltered, setLimitFiltered] = useState('');

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Search Result`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/product?`;

    setTransitFiltered("");
    if (queryParams.get("transit")) {
      setTransitFiltered(queryParams.get("transit"));
      url += `&transitFiltered=${queryParams.get("transit")}`;
    }

    setAirlinesFiltered("");
    if (queryParams.get("airlines")) {
      setAirlinesFiltered(queryParams.get("airlines"));
      url += `&airlinesFiltered=${queryParams.get("airlines")}`;
    }

    setMinPriceFiltered("");
    if (queryParams.get("min")) {
      setMinPriceFiltered(queryParams.get("min"));
      url += `&minPriceFiltered=${queryParams.get("min")}`;
    }

    setMaxPriceFiltered("");
    if (queryParams.get("max")) {
      setMaxPriceFiltered(queryParams.get("max"));
      url += `&maxPriceFiltered=${queryParams.get("max")}`;
    }

    setOriginFiltered("");
    if (queryParams.get("origin")) {
      setOriginFiltered(queryParams.get("origin"));
      url += `&originFiltered=${queryParams.get("origin")}`;
    }

    setDestinationFiltered("");
    if (queryParams.get("destination")) {
      setDestinationFiltered(queryParams.get("destination"));
      url += `&destinationFiltered=${queryParams.get("destination")}`;
    }

    setTypeFiltered("");
    if (queryParams.get("type")) {
      setTypeFiltered(queryParams.get("type"));
      url += `&typeFiltered=${queryParams.get("type")}`;
    }

    setStockFiltered("");
    if (queryParams.get("stock")) {
      setStockFiltered(queryParams.get("stock"));
      url += `&stockFiltered=${queryParams.get("stock")}`;
    }

    setSortFiltered("");
    if (queryParams.get("sort")) {
      setSortFiltered(queryParams.get("sort"));
      url += `&sortFiltered=${queryParams.get("sort")}`;
    }

    setLimitFiltered("");
    if (queryParams.get("limit")) {
      setLimitFiltered(queryParams.get("limit"));
      url += `&limit=${queryParams.get("limit")}`;
    }

    if (queryParams.get('page')) {
      url += `&page=${queryParams.get('page')}`;
    }

    dispatch(getListProduct(url, navigate));
    dispatch(getListAirline(navigate));
  }, [dispatch, navigate, queryParams]);

  const applyFilter = (page = "") => {
    let url = "/search?";
    if (transitFiltered || transitFiltered === 0) {
      url += `&transit=${transitFiltered}`;
    }
    if (airlinesFiltered) {
      url += `&airlines=${airlinesFiltered}`;
    }
    if (minPriceFiltered) {
      url += `&min=${minPriceFiltered}`;
    }
    if (maxPriceFiltered) {
      url += `&max=${maxPriceFiltered}`;
    }
    if (originFiltered) {
      url += `&origin=${originFiltered}`;
    }
    if (destinationFiltered) {
      url += `&destination=${destinationFiltered}`;
    }
    if (typeFiltered) {
      url += `&type=${typeFiltered}`;
    }
    if (stockFiltered) {
      url += `&stock=${stockFiltered}`;
    }
    if (sortFiltered) {
      url += `&sort=${sortFiltered}`;
    }
    if (limitFiltered) {
      url += `&limit=${limitFiltered}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    return navigate(url);
  };

  const reset = () => {
    setTransitFiltered("");
    setAirlinesFiltered("");
    setMinPriceFiltered("");
    setMaxPriceFiltered("");
    setTypeFiltered("");
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="andry-sr">
          <Header
            originFiltered={originFiltered}
            setOriginFiltered={setOriginFiltered}
            destinationFiltered={destinationFiltered}
            setDestinationFiltered={setDestinationFiltered}
            typeFiltered={typeFiltered}
            applyFilter={applyFilter}
            passenger={passenger}
          />
          <main className="px-4 px-md-5 py-3">
            <div className="row">
              <div className="col-md-12 col-lg-3">
                <Filter
                  reset={reset}
                  listProduct={listProduct}
                  setShowMobileFilter={setShowMobileFilter}
                  showMobileFilter={showMobileFilter}
                  setTransitFiltered={setTransitFiltered}
                  transitFiltered={transitFiltered}
                  listAirline={listAirline}
                  setAirlinesFiltered={setAirlinesFiltered}
                  airlinesFiltered={airlinesFiltered}
                  setMinPriceFiltered={setMinPriceFiltered}
                  minPriceFiltered={minPriceFiltered}
                  setMaxPriceFiltered={setMaxPriceFiltered}
                  maxPriceFiltered={maxPriceFiltered}
                  setTypeFiltered={setTypeFiltered}
                  typeFiltered={typeFiltered}
                />
              </div>
              <div className="col-12 col-md-12 col-lg-9">
                <Product
                  listProduct={listProduct}
                  setSortFiltered={setSortFiltered}
                  sortFiltered={sortFiltered}
                  setLimitFiltered={setLimitFiltered}
                  limitFiltered={limitFiltered}
                />
                {listProduct.data.length && (
                  <Pagination
                    pagination={listProduct.pagination}
                    applyFilter={applyFilter}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
