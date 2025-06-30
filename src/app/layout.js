
import Footer2 from "@/components/footers/footer2/Footer2";
import Footer3 from "@/components/footers/footer3/Footer3";
import Header from "../components/headerNew/Header";
import HeaderCopy from "@/components/headerNewCopy/HeaderCopy";
// import Header1 from "@/components/headers/index"
import "./globals.scss";
import Script from 'next/script'
// import Footer from "@/components/footers/footer/Footer";

export const metadata = {
  title: "Frames Demo",
  description: "Frames Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        {/* <Header1 /> */}
        <Header />
        {/* <HeaderCopy /> */}
        {children}
        {/* <Footer /> */}
        {/* <Footer3 /> */}
        {/* <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" /> */}
        {/* <Script type="module" src="./js/index2.js" /> */}
        <Script src="http://localhost/humbeeassets/js/style.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
