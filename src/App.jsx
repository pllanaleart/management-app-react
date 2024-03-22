import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import LandingPage from "./components/LandingPage";
import Invoice from "./components/invoices/Invoice";
import InvoiceTemplate from "./components/invoices/InvoiceTemplate";

function App() {
  const [showComponent, setShowComponent] = useState("home");

  function handleComponent(comp) {
    setShowComponent(comp);
  }

  const dummyInvoice = {
    invoiceNo: 4323,
    ammount: 27.58,
    tvsh: 16.0,
    totalForPayment: 31.99,
    products: [
      {
        name: "bombona",
        price: 2.79,
        quantity: 2,
        productTotal: 6.47,
        tvsh: 0.45,
      },
      {
        name: "cigare",
        price: 3.5,
        quantity: 4,
        productTotal: 16.24,
        tvsh: 0.56,
      },
      {
        name: "uje",
        price: 1.0,
        quantity: 2,
        productTotal: 2.32,
        tvsh: 0.16,
      },
      {
        name: "milka",
        price: 2.0,
        quantity: 3,
        productTotal: 6.96,
        tvsh: 0.32,
      },
    ],
  };
  const renderComponent = () => {
    switch (showComponent) {
      case "home":
        return <LandingPage></LandingPage>;
      case "products":
        return <Products></Products>;
      case "stock":
        return <InvoiceTemplate invoiceData={dummyInvoice}></InvoiceTemplate>;
      case "sellings":
        return <div></div>;
      case "purchases":
        return <div></div>;
      case "invoices":
        return <Invoice></Invoice>;
      case "employees":
        return <div></div>;
      default:
        return null;
    }
  };

  return (
    <div className="grid-container">
      <Navbar activeComponent={handleComponent} topic={showComponent}></Navbar>
      {renderComponent()}
    </div>
  );
}

export default App;
