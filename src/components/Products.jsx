import "./Products.css";
import ProductsTable from "./ProductsTable";
import ProductRegister from "./ProductRegister";
import { useState } from "react";

function Products() {
  const [isDataChanged, setDataChange] = useState("");
  const [modalIsOpen, setOpenModal] = useState(false);
  let dummyObject = {
    name: undefined,
    barcodeNumber: undefined,
    mrp: undefined,
    description: undefined,
    price: undefined,
  };

  function handleChange(newData) {
    setDataChange(newData);
  }
  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  console.log(modalIsOpen);
  return (
    <div className="products-container">
      <ProductsTable
        isChanged={isDataChanged}
        handleDataChange={handleChange}
      ></ProductsTable>
      <div className="second-container">
        <input
          type="text"
          name="Search"
          id="search-product-input"
          placeholder="Search for Product"
        />
        <button type="button" onClick={openModal}>
          Register Product
        </button>
      </div>
      {modalIsOpen && (
        <ProductRegister
          modalOpen={modalIsOpen}
          turnOffModal={closeModal}
          changeData={handleChange}
          updateProduct={dummyObject}
          actionName="Register"
        ></ProductRegister>
      )}
    </div>
  );
}

export default Products;
