import { useState } from "react";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";

export default function Header({ todos }) {
  const [showModal, setShowModal] = useState(false);
  const { globalUser, logout } = useAuth();
  const todosLength = todos?.filter((todo) => !todo.complete).length || 0;

  const isTasksPlural = todosLength !== 1;
  const taskString = isTasksPlural ? "tasks" : "task";

  function handleClose() {
    setShowModal(false);
  }
  return (
    <>
      {showModal && (
        <Modal handleClose={handleClose}>
          <Authentication handleClose={handleClose} />
        </Modal>
      )}
      <header className="header">
        <h1 className="text-gradient">{`You have ${
          globalUser ? todosLength : 0
        } open ${taskString}`}</h1>
        {globalUser ? (
          <button onClick={() => logout()}>
            Logout{" "}
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <div className="login-content">
              <p>Sign up free</p>
              <span>
                <i className="fa-solid fa-pencil"></i>
              </span>
            </div>
          </button>
        )}
      </header>
    </>
  );
}
