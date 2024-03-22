import "./Invoice.css";
import { useState, useEffect, useRef } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import BarcodeScanner from "../../assets/svg/barcode-scanner.svg";
import DeleteIcon from "../../assets/svg/delete-icon.svg";
import EditIcon from "../../assets/svg/edit-icon.svg";

function Invoice() {
  const quantityRef = useRef();
  const testRef = useRef();

  const [allInvoices, setAllInvoices] = useState([]);
  const [invoicesPaginationInfo, setInvoicesPaginationInfo] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [productToAdd, setProductToAdd] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productSearched, setProductSearched] = useState({ name: "" });
  const [invoiceQuantityModels, setInvoiceQuantityModels] = useState([]);
  const [finalInvoice, setFinalInvoice] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(null);

  const openInvoiceModal = (index) => {
    setInvoiceModal(index);
  };
  const closeInvoiceModal = () => {
    setInvoiceModal(null);
  };

  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch(
        `http://localhost:8080/invoices?page=${invoicesPaginationInfo.pageNo}&limit=${invoicesPaginationInfo.pageSize}&sortBy=id&sortDir=dsc`
      );
      const resData = await response.json();
      const { content, ...paginationData } = resData;
      setInvoicesPaginationInfo(paginationData);
      setAllInvoices(content);
      console.log(content);
    }
    fetchInvoices();
  }, [finalInvoice]);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${productToAdd}`
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const resData = await response.json();
        setProductSearched(resData);
      } catch (error) {
        console.log(error);
      }
    }

    if (productToAdd != "") {
      fetchInvoice();
    }
  }, [productToAdd]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const isAlreadyInList = productList.some(
        (product) => product.id === productSearched.id
      );
      if (!isAlreadyInList) {
        const tempProductSearched = {
          total: productSearched.price,
          ...productSearched,
        };

        console.log(tempProductSearched);
        setProductList([tempProductSearched, ...productList]);
        const productModel = { productId: productSearched.id, quantity: 1 };
        setInvoiceQuantityModels([productModel, ...invoiceQuantityModels]);
        setProductToAdd("");
        testRef.current.focus();
      } else {
        console.log("already in list");
      }
    }
  };
  function handleTdChange(e, id) {
    const quantityTemp = e.currentTarget.textContent;
    const productIndex = invoiceQuantityModels.findIndex(
      (product) => product.productId === id
    );
    const productListIndex = productList.findIndex((prod) => prod.id === id);
    console.log(id);
    if (productIndex !== -1) {
      const updatedProductList = [...productList];
      updatedProductList[productListIndex].total =
        quantityTemp * productList[productListIndex].price;
      setProductList(updatedProductList);
      const updatedInvoiceQuantityModel = [...invoiceQuantityModels];
      updatedInvoiceQuantityModel[productIndex].quantity = quantityTemp;
      setInvoiceQuantityModels(updatedInvoiceQuantityModel);
      console.log(invoiceQuantityModels);
      console.log(productList);
    }
  }
  const handleQuantity = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  async function createNewInvoice() {
    if (invoiceQuantityModels) {
      let randomNumber = Math.random();
      randomNumber *= Math.pow(10, 16);
      const invoiceNrRandom = Math.floor(randomNumber);
      const newInvoiceTemp = {
        invoiceNo: invoiceNrRandom,
        invoiceQuantityModels: [...invoiceQuantityModels],
      };
      try {
        const response = await fetch("http://localhost:8080/invoices", {
          method: "POST",
          body: JSON.stringify(newInvoiceTemp),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        setFinalInvoice(data);
        setInvoiceQuantityModels([]);
        setProductList([]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function deleteFromList(idToDel) {
    console.log("id to del : " + idToDel);
    const newList = productList.filter((item) => item.id !== idToDel);
    setProductList(newList);
    console.log(productList);
    const newInvoiceQuantityModels = invoiceQuantityModels.filter(
      (item) => item.productId !== idToDel
    );
    setInvoiceQuantityModels(newInvoiceQuantityModels);
    console.log(invoiceQuantityModels);
  }

  return (
    <div className="invoice-container">
      <div className="new-invoice-container">
        <h3>Create Invoice</h3>

        <div className="invoice-info-container">
          <div className="invoice-info-group">
            <h4>Invoice No: {invoicesPaginationInfo.totalElements}</h4>
            <h5>Company: {invoicesPaginationInfo.pageSize}</h5>
            <h5>Nr.Biz: {invoicesPaginationInfo.totalPages}</h5>
            <h6>Adresa: Obiliq</h6>
          </div>
          <div className="invoice-info-group">
            <h4>Sold To:</h4>
            <h5>Company: {invoicesPaginationInfo.pageSize}</h5>
            <h5>Nr.Biz: {invoicesPaginationInfo.totalPages}</h5>
            <h6>Adresa: Obiliq</h6>
          </div>
        </div>

        <div className="search-product-toAdd-container">
          <input
            type="text"
            placeholder="Search Products"
            id="search-product-toAdd"
            required
            value={productToAdd}
            onChange={(e) => setProductToAdd(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button type="button" className="barcode-btn">
            <img src={BarcodeScanner} alt="barcodeScanner" />
          </button>
        </div>
        <div id="invoice-table">
          <table className="invoice-table-container">
            <thead>
              <tr>
                <th>Name</th>
                <th>Barcode Number</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.barcodeNumber}</td>
                    <td
                      ref={testRef}
                      contentEditable
                      onKeyDown={handleQuantity}
                      onInput={(e) => handleTdChange(e, product.id)}
                    >
                      {quantityRef.current}
                    </td>
                    <td>{product.price} €</td>
                    <td>{product.total} €</td>
                    <td>
                      <img
                        src={DeleteIcon}
                        alt="delete-icon"
                        id="delete-product-invoice-btn"
                        onClick={() => deleteFromList(product.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="invoice-create-container">
          <button type="button" onClick={createNewInvoice}>
            Create new Invoice
          </button>
        </div>
      </div>
      <div className="invoices-list">
        <h4 id="h4-allInvoices-title">All invoices: </h4>
        <div className="invoice-content-container">
          {allInvoices.map((invoice, index) => {
            return (
              <div className="invoice-card-container" key={invoice.invoiceNo}>
                <h5>
                  <strong>Invoice No: {invoice.invoiceNo}</strong>
                </h5>
                <h6>Sold to: Company XYZ</h6>
                <div className="decorative-container">
                  <h6>
                    Total amount: <strong> {invoice.totalForPayment} €</strong>
                  </h6>
                  <img
                    src={EditIcon}
                    alt="edit-icon"
                    onClick={() => openInvoiceModal(index)}
                  />
                </div>
                {invoiceModal === index && (
                  <InvoiceTemplate
                    invoiceData={invoice}
                    openInvoiceModal={invoiceModal === index}
                    closeInvoiceModal={closeInvoiceModal}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
