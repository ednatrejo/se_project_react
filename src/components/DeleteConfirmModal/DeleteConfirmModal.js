import { useRef } from "react";
import "../ModalWithForm/ModalWithForm.css";

const DeleteConfirmModal = ({
  handleCloseModal,
  handleDeleteItem,
  selectedCard,
  isLoading,
}) => {
  const ref = useRef();

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal__confirm-content" ref={ref}>
        <button
          className="modal__confirm-close"
          type="button"
          onClick={handleCloseModal}
          alt="close-button"
        ></button>
        <div>Are you sure you want to delete this item?</div>
        <div>This action is irreversible.</div>

        <div className="modal__confirm-buttons">
          <button
            className="modal__confirm-button"
            type="button"
            onClick={() => handleDeleteItem(selectedCard._id)}
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>
          <button
            className="modal__cancel-button"
            type="button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
