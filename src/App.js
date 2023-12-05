import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=100&skip=10&select=title,price`
    );
    const data = await res.json();
    if (data && data.products) setProducts(data.products);
  };

  const handlePageClick = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <section className="container">
        <h1>Pagination Test</h1>
        <div className="product-items" style={{ fontSize: "20px" }}>
          <span>id</span>
          <span>price</span>
          <span>title</span>
        </div>
        {products.length > 0 && (
          <>
            {products.slice(page * 10 - 10, page * 10).map((product, index) => {
              return (
                <div className="product-items" key={index}>
                  <span>{product.id}</span>
                  <span>{product.price}</span>
                  <span>{product.title}</span>
                </div>
              );
            })}
          </>
        )}

        {products.length > 0 && (
          <div className="pagination">
            <span
              className={`${page > 1 ? "" : "page_disabled"}`}
              onClick={() => handlePageClick(page - 1)}
            >
              ⬅️
            </span>
            {[...Array(products.length / 10)].map((_, index) => {
              return (
                <span
                  className={`${index + 1 == page ? "page-selected" : ""}`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </span>
              );
            })}
            <span
              className={`${
                page < products.length / 10 ? "" : "page_disabled"
              }`}
              onClick={() => handlePageClick(page + 1)}
            >
              ➡️
            </span>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
