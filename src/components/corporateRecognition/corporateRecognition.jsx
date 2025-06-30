"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "./corporateRecognition.scss";
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import CorporateRecognitionData from "./coporateRecognitionData.js";
import Link from "next/link";

export default function CorporateRecognition() {
  // const handleImageClick = (pdfUrl) => {
  //   window.open(pdfUrl, "_blank");
  // };

  return (
    <div className="corporateRecognitionWrapper">
      <div className="corporateRecognitionHeaderOuter">
        <motion.div
          className="corporateRecognitionHeader"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p>Recognition</p>
        </motion.div>
        <div className="corporateSwiperArrowContainer">
          {/* Custom Previous Arrow */}
          <div className="swiper-button-prev recognition-custom-prev">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
            >
              <path
                d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
          {/* Custom Next Arrow */}
          <div className="swiper-button-next recognition-custom-next">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        freeMode={true}
        speed={1500}
        navigation={{
          nextEl: ".recognition-custom-prev",
          prevEl: ".recognition-custom-next",
        }}
        modules={[Pagination, FreeMode, Navigation]}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 1,
          },
        }}
      >
        {CorporateRecognitionData.map((cardData, index) => (
          <SwiperSlide key={index}>
            <div className="corporateRecognitionCardContainer"
            // onClick={() => handleImageClick(cardData.pdf)}
            >
              <div className="corporateRecognitionCardInner">
                <div className="corporateRecognitionCardImage">
                  <Link href={cardData.pdfUrl}  target="_blank">
                  <Image
                    src={cardData.image}
                    alt="Recognition Image"
                    className="corporateRecognitionCardImageInner"
                  />
                  </Link>
                </div>
              </div>
              <div className="corporateRecognitionCardDescription">
                <p>{cardData.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
