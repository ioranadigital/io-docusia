"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

const HeroBanner1 = ({bgmage,Title1,Title2,content,btnName,btnUrl,heroShape1,heroShape2,heroShape3}) => {

  useEffect(() => {
        loadBackgroudImages();
      }, []);

    return (
        <div className="hero-section d-flex align-items-center" data-background={bgmage}>
    <div className="container">
      <div className="row hero-bg">
        <div className="col-lg-12">
          <div className="hero-content">
            <h1> {Title1} </h1>
            <h2> {Title2} </h2>
            <div className="hero-content-text-btn">
              <p>{content}</p>
              <div className="hero-button">
                <Link href={btnUrl}> {btnName} <i className="bi bi-arrow-right-short"></i></Link>
              </div>
            </div>
            <div className="hero-all-shape">
              <div className="hero-shape">
                <Image src={heroShape1} alt="img" width={500} height={467}   />
              </div>
              <div className="hero-shape2">
                <Image src={heroShape2} alt="img" width={436} height={442}   />
              </div>
              <div className="hero-shape3">
                <Image src="/assets/images/slider/hero-shp4.png" alt="img" width={796} height={74}   />
              </div>
              <div className="hero-shape4">
                <Image src="/assets/images/slider/hero-shp.png" alt="img" width={224} height={342}   />
              </div>
              <div className="hero-shape5">
                <Image src={heroShape3} alt="img" width={104} height={103}   />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default HeroBanner1;
