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
        <Toaster gutter={12} >
        {(t) => (
    <ToastBar
      toast={t}
      style={{
        ...t.style,
        animation: t.visible ? 'custom-enter 0.5s ease' : 'custom-exit 0.5s ease',
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
  title: "prayosha oil online store ",
  description: "100% original oil",
  author: "prayoshaoil",
  keywords: "prayosha oil ,prayoshasingtel,oil,penut oil,sing tel,groundnut",
};
export default Layout;
