import "./ProductsTable.css";
import ProductRegister from "./ProductRegister";
import { useState, useEffect } from "react";
import LeftArrow from "../assets/svg/left-arrow.svg";
import RightArrow from "../assets/svg/right-arrow.svg";
import DeleteModal from "./DeleteModal";
import { useQuery } from "react-query";

const fetchData = async (pageInfo) => {
  const response = await fetch(
    `http://localhost:8080/products?page=${pageInfo.pageNo}&limit=${pageInfo.pageSize}`
  );
  return response.json();
};

function ProductsTable({ isChanged, handleDataChange }) {
  const [datapro, setData] = useState([]);
  const [modalIsOpen, setOpenModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    pageNo: 0,
    pageSize: 5,
  });
  const [productToDelete, setProductToDelete] = useState("");
  const [DeleteModalIsOpen, setDeleteModal] = useState(false);

  const { isLoading, error, data, refetch } = useQuery("products", () =>
    fetchData(paginationInfo)
  );
  const handlePagination = (increment) => {
    const tempVar = { ...paginationInfo };
    if (tempVar.pageNo >= 0 && !tempVar.last) {
      tempVar.pageNo = tempVar.pageNo + increment;
    }
    setPaginationInfo(tempVar);
    refetch();
  };
  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetch(
  //       `http://localhost:8080/products?page=${paginationInfo.pageNo}&limit=${paginationInfo.pageSize}`
  //     );
  //     const resData = await response.json();
  //     setPaginationInfo(resData);
  //     setData(resData.content);
  //   }
  //   fetchProducts();
  // }, [isChanged]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleUpdate = (productData) => {
    setProductToUpdate(productData);
    openModal();
    console.log(productToUpdate);
  };

  const handleDelete = (deleteData) => {
    setProductToDelete(deleteData);
    openDeleteModal();
  };
  console.log(paginationInfo);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Barcode Number</th>
            <th>Mrp</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((dat) => {
            return (
              <tr key={dat.id}>
                <td>{dat.name}</td>
                <td>{dat.description}</td>
                <td>{dat.barcodeNumber}</td>
                <td>{dat.mrp}</td>
                <td>{dat.price}</td>
                <td>
                  <div id="action-container">
                    <button
                      type="button"
                      id="updatebtn"
                      onClick={() => handleUpdate(dat)}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      id="deletebtn"
                      onClick={() => handleDelete(dat)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-position">
        {paginationInfo.pageNo != 0 && (
          <button className="page-button" onClick={() => handlePagination(-1)}>
            <img src={LeftArrow} alt="left-arrow" />
          </button>
        )}
        {!paginationInfo.last && (
          <button className="page-button" onClick={() => handlePagination(1)}>
            <img src={RightArrow} alt="right-arrow" />
          </button>
        )}
      </div>
      {modalIsOpen && (
        <ProductRegister
          modalOpen={modalIsOpen}
          turnOffModal={closeModal}
          changeData={handleDataChange}
          updateProduct={productToUpdate}
          actionName="Update"
        ></ProductRegister>
      )}
      {DeleteModalIsOpen && (
        <DeleteModal
          modalOpen={DeleteModalIsOpen}
          turnOffModal={closeDeleteModal}
          changeData={handleDataChange}
          deleteId={productToDelete}
        ></DeleteModal>
      )}
    </div>
  );
}

export default ProductsTable;
