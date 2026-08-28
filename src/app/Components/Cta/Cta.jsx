"use client"
import SectionTitle from "../Common/SectionTitle";
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

const Cta = () => {

    const CallContent = {
        icon:'/assets/images/resource/call.png',
        title2:'+98 069 (2350) 020',
        Content:'Whats App/Call',
      }    

      useEffect(() => {
        loadBackgroudImages();
      }, []);
      

    return (
        <div className="call-to-action" data-background="/assets/images/resource/call-bg.png">
    <div className="container">
      <div className="row dream1-bg">
        <div className="col-lg-6">
          <div className="dexon-section-title white">
                    <SectionTitle
                            Title="Are You Ready to for Your <br> Business Success?"
                            Content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque potenti. Vulputate ut aliquam, consectetur turpis odio."
                    ></SectionTitle>
          </div>
          <div className="dexon-button">
            <Link className="dexon-button" href="/contact">Contact Us <i className="bi bi-arrow-right-short"></i></Link>
          </div>
        </div>
        <div className="col-lg-3"></div>
        <div className="col-lg-3">
          <div className="call-info">
            <div className="call-icon">
            <Image src={CallContent.icon} alt="img" width={50} height={50}   />
            </div>
            <div className="call-number">
              <h1>{CallContent.title2}</h1>
            </div>
            <div className="call-text">
              <span>({CallContent.Content})</span>
            </div>
          </div>
        </div>
        <div className="call-to-all-shape">
          <div className="call-shape">
          <Image src="/assets/images/resource/line.png" alt="img" width={302} height={376}   />
          </div>
          <div className="call-shape2">
          <Image src="/assets/images/resource/shap2.png" alt="img" width={183} height={96}   />
          </div>
          <div className="call-shape3">
          <Image src="/assets/images/resource/shap1.png" alt="img" width={41} height={42}   />
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Cta;
