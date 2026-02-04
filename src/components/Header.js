import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Admin Panel</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </header>
  );
}
