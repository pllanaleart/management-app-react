import "./Navbar.css";
import LogoSvg from "../assets/svg/logo.svg";
import HomeSvg from "../assets/svg/home.svg";
import StockSvg from "../assets/svg/stock.svg";
import ProductSvg from "../assets/svg/products.svg";
import SellSvg from "../assets/svg/sell.svg";
import PurchaseSvg from "../assets/svg/purchase.svg";
import InvoiceSvg from "../assets/svg/invoice.svg";
import EmployeeSvg from "../assets/svg/employee.svg";
import AboutSvg from "../assets/svg/about.svg";

function Navbar({ activeComponent, topic }) {
  return (
    <div className="sidebar-container">
      <a href="#" onClick={() => activeComponent("home")}>
        <img src={LogoSvg} alt="logo" />
        Plan-A
      </a>
      <hr />
      <ul>
        <li
          onClick={() => activeComponent("home")}
          className={topic === "home" ? "active" : undefined}
        >
          <a href="#">
            <img src={HomeSvg} alt=" home icon" />
            Home
          </a>
        </li>
        <li
          onClick={() => activeComponent("products")}
          className={topic === "products" ? "active" : undefined}
        >
          <a href="#">
            <img src={ProductSvg} alt="product icon" />
            Products
          </a>
        </li>
        <li
          onClick={() => activeComponent("stock")}
          className={topic === "stock" ? "active" : undefined}
        >
          <a href="#">
            <img src={StockSvg} alt="stock icon" />
            Stock
          </a>
        </li>
        <li
          onClick={() => activeComponent("sellings")}
          className={topic === "sellings" ? "active" : undefined}
        >
          <a href="#">
            <img src={SellSvg} alt="sell icon" /> Sellings
          </a>
        </li>
        <li
          onClick={() => activeComponent("purchases")}
          className={topic === "purchases" ? "active" : undefined}
        >
          <a href="#">
            <img src={PurchaseSvg} alt="purchase icon" /> Purchases
          </a>
        </li>
        <li
          onClick={() => activeComponent("invoices")}
          className={topic === "invoices" ? "active" : undefined}
        >
          <a href="#">
            <img src={InvoiceSvg} alt="invoice icon" /> Invocies
          </a>
        </li>
        <li
          onClick={() => activeComponent("employees")}
          className={topic === "employees" ? "active" : undefined}
        >
          <a href="#">
            <img src={EmployeeSvg} alt="employee icon" /> Employees
          </a>
        </li>
      </ul>
      <hr />
      <a href="#">
        <img src={AboutSvg} alt="about icon" /> About
      </a>
      <hr />
    </div>
  );
}

export default Navbar;
