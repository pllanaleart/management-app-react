import "./ProductRegister.css";
import Modal from "react-modal";
import { useState } from "react";

function ProductRegister({
  modalOpen,
  turnOffModal,
  changeData,
  updateProduct,
  actionName,
}) {
  const [barcodeNumber, setBarcodeNumber] = useState(
    updateProduct.barcodeNumber
  );
  const [description, setDescription] = useState(updateProduct.description);
  const [mrp, setMrp] = useState(updateProduct.mrp);
  const [name, setName] = useState(updateProduct.name);
  const [price, setPrice] = useState(updateProduct.price);

  async function handleSubmit() {
    const newProduct = {
      name: name,
      description: description,
      mrp: mrp,
      barcodeNumber: barcodeNumber,
      price: price,
    };
    let fetchData = {
      apiLink: "http://localhost:8080/products",
      method: "",
    };
    if (actionName === "Update") {
      fetchData.apiLink = fetchData.apiLink + "/" + updateProduct.id;
      fetchData.method = "PUT";
    } else if (actionName === "Register") {
      fetchData.apiLink = "http://localhost:8080/products";
      fetchData.method = "POST";
    }
    try {
      const response = await fetch(fetchData.apiLink, {
        method: fetchData.method,
        body: JSON.stringify(newProduct),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      changeData(data);
      turnOffModal();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    turnOffModal();
  }
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleClose}
      appElement={document.getElementById("root")}
      className="product-register-container"
    >
      <form className="flex-input">
        <h3>{actionName} product</h3>
        {/* Your form fields here */}
        <input
          type="text"
          placeholder="Name"
          id="name-register"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          rows={4}
          cols={50}
          placeholder="Description"
          id="description-register"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Barcode"
          id="barconde-register"
          required
          value={barcodeNumber}
          onChange={(e) => setBarcodeNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mrp"
          id="mrp-register"
          required
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          id="price-register"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* Other form inputs */}
        <div className="register-buttons-group">
          <button type="button" onClick={handleSubmit} id="submit-register-btn">
            {actionName}
          </button>
          <button onClick={handleClose} id="close-register-btn">
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductRegister;
