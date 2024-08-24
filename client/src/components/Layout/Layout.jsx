import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import  { Toaster,ToastBar } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </div>
      </Helmet>

      <Header />
      <main style={{ minHeight: "77vh" }}>
        <Toaster >
        {(t) => (
    <ToastBar
      toast={t}
      style={{
        ...t.style,
        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 5s ease',
      }}
    />
  )}
        </Toaster>
        {children}
      </main>
      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "E-commerce-shop now",
  description: "mern stack project",
  author: "AS",
  keywords: "mern,react,node,mongodb",
};
export default Layout;
