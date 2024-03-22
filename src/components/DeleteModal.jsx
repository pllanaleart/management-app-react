import "./DeleteModal.css";
import Modal from "react-modal";
function DeleteModal({ modalOpen, turnOffModal, changeData, deleteId }) {
  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${deleteId.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
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
      className="modal-overlay "
    >
      <div className="modal-container">
        <h3>
          Are you sure you want to Delete "{deleteId.name}" from Products??
        </h3>
        <div className="button-modal-container">
          <button
            type="button"
            className="deletebtn-modal"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            type="button"
            className="closebtn-modal"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
