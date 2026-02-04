import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
