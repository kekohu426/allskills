import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
