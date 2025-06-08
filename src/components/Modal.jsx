import ReactDom from "react-dom";

export default function Modal({ children, handleClose }) {
  return ReactDom.createPortal(
    <div className="modal-container">
      <button className="modal-underlay" onClick={handleClose} />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
}
