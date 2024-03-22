import "./InvoiceTemplate.css";
import Modal from "react-modal";

function InvoiceTemplate({ invoiceData, openInvoiceModal, closeInvoiceModal }) {
  const printInvoice = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={openInvoiceModal}
      onRequestClose={closeInvoiceModal}
      appElement={document.getElementById("root")}
      className="invoice-modal-container"
    >
      <div className="invoice-template-container">
        <h3>Invoice No: {invoiceData.invoiceNo}</h3>
        <div className="invoice-info-container">
          <div className="company-card">
            <h3>Company Name: ......</h3>
            <h4>Company Address: .....</h4>
            <h4>Fiskal No: 123123123</h4>
          </div>
          <div className="company-card">
            <h3>Company Name: ......</h3>
            <h4>Company Address: .....</h4>
            <h4>Fiskal No: 123123123</h4>
          </div>
        </div>
        <div className="invoice-template-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>TVSH</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.products.map((prod, index) => {
                return (
                  <tr key={index}>
                    <td>{prod.name}</td>
                    <td>{prod.quantity}</td>
                    <td>{prod.price} €</td>
                    <td>{prod.tvsh} €</td>
                    <td>{prod.productTotal} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="total-price-container">
          <h4>Tvsh: {invoiceData.tvsh} %</h4>
          <h4>
            Amount: {invoiceData.ammount} <strong>€</strong>
          </h4>
          <h4>
            Total for Payment: {invoiceData.totalForPayment} <strong>€</strong>
          </h4>
        </div>
        <div className="print-container">
          <button
            type="button"
            className="close-modal"
            onClick={closeInvoiceModal}
          >
            Close
          </button>
          <button type="button" onClick={printInvoice}>
            Print
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default InvoiceTemplate;
