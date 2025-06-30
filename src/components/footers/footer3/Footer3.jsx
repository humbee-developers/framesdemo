"use client";

import Form3 from "@/components/forms/form3/Form3";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/svgLogos/FinalHeaderLogo.svg";
import "./footer3.scss";
import LinkHover from "@/components/linkHover/LinkHover";
import telIcon from "@/images/svgLogos/phone_icon.svg";
import mailIcon from "@/images/svgLogos/mail_icon.svg";
import fb from "@/images/svgLogos/facebook.svg";
import ig from "@/images/svgLogos/instagramSvg.svg";
import yt from "@/images/svgLogos/youtube.svg";
import wa from "@/images/svgLogos/whatsapp.svg";
import li from "@/images/svgLogos/Linkedin.svg";
import PageTransition from "@/components/pageTransition/PageTransition";
import border from "@/images/svgLogos/FooterBorder.svg";
import { usePathname } from "next/navigation";

const Footer2 = ({ bgColor }) => {
  const pathname = usePathname();
  console.log("path", pathname);
  // return pathname === "/" || pathname === "/store" ? null : (
  return(
    <footer className="footer2">
      <div>
        FOOTER
      </div>
    </footer>
  );
};
export default Footer2;
