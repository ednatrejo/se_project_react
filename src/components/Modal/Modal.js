import { useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";

export const Modal = ({ name, onClose, children }) => {
  //useEffect for `Escape` listener
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  //overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  //main wrapper
  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};
