import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
};

export default Layout;
