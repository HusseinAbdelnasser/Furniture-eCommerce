import React, {useState, useEffect} from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import ProductList from "../components/UI/ProductList";
import UseGetData from "../custom-hooks/useGetData";
const Shop = () => {
  const {data} = UseGetData('products');
  const [productsData, setProductsData] = useState('');

  useEffect(() => {
    setProductsData(data)
  }, [data]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if(filterValue === "all"){
      setProductsData(data)
    }
    if (filterValue === "sofa") {
      const filteredProducts = data.filter(
        (item) => item.category === "sofa"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "mobile") {
      const filteredProducts = data.filter(
        (item) => item.category === "mobile"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "chair") {
      const filteredProducts = data.filter(
        (item) => item.category === "chair"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "watch") {
      const filteredProducts = data.filter(
        (item) => item.category === "watch"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "wireless") {
      const filteredProducts = data.filter(
        (item) => item.category === "wireless"
      );
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };
  return (
    <Helmet title="shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value='all'>All</option>
                  <option value="sofa">
                    Sofa
                  </option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="9" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search......"
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No Products are found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
