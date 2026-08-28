import Link from "next/link";
import PricingCard from "./PricingCard";
import Image from "next/image";

const Pricing = () => {
    return (
        <div className="about-section style-three">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="about-left-thumb">
                        <Image src="/assets/images/resource/about6.png" alt="img" width={580} height={493}   />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dexon-section-title">
                            <h1> Specialize in Companies </h1>
                            <h1> Promote your Business </h1>
                            <h1> to Next Levels </h1>
                            <p>Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque potenti. Vulputate ut aliquam, consectetur turpis odio  prospective value for proact paradigms. Assertively target real-time <br/> <span>
                            Enthusiastically negotiate highly efficient manufactured products whereas distributed services. Conveniently impact e-business
                            </span></p>
                        </div>
                        <div className="about-button">
                            <Link className="dexon-button" href="/about">Learn More <i className="bi bi-arrow-right-short"></i> </Link>
                        </div>
                    </div>
                </div>
                <div className="row pricing-bg">
                    <div className="col-lg-12">
                        <div className="dexon-section-title text-center padding-lg">
                            <h1> Choose Your Service Plan</h1>
                            <p>Distinctively supply exceptional services after uniquely integrate on testing alternative markets rather emerging initiatives.</p>
                            <div className="claint-suport">
                            <Image src="/assets/images/resource/claint.png" alt="img" width={108} height={44}   />
                                <div className="cliant-text">
                                    <span>500+ Happy Customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="price-shape">
                        <div className="prc-thumb">
                        <Image src="/assets/images/resource/shape-2.png" alt="img" width={46} height={46}   />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <PricingCard
                            classAdd="pricing-single-box"
                            title="Starter"
                            price="$39"
                            duration="Month"
                            featuretitle="All Features :"
                            featurelist={[
                                "Access to All Features",
                                "Custom Software",
                                "50+ User Registrations",
                                "10 Unique Websites",
                                "Lifetime Supports"
                            ]}                            
                        ></PricingCard>
                    </div>

                    <div className="col-lg-4 col-md-6">

                    <PricingCard
                            classAdd="pricing-single-box upper"
                            title="Enterprise"
                            price="$59"
                            duration="Month"
                            featuretitle="All Features :"
                            featurelist={[
                                "Access to All Features",
                                "Custom Software",
                                "50+ User Registrations",
                                "10 Unique Websites",
                                "Lifetime Supports"
                            ]}                            
                        ></PricingCard>

                    </div>
                    <div className="col-lg-4 col-md-6">

                    <PricingCard
                            classAdd="pricing-single-box"
                            title="Premium"
                            price="$89"
                            duration="Month"
                            featuretitle="All Features :"
                            featurelist={[
                                "Access to All Features",
                                "Custom Software",
                                "50+ User Registrations",
                                "10 Unique Websites",
                                "Lifetime Supports"
                            ]}                            
                        ></PricingCard>

                    </div>
                </div>
            </div>
      </div>
    );
};

export default Pricing;
