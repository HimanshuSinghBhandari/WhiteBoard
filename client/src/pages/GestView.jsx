import React from "react";
import LandingPageFront from "../components/Langingpage/landing-page-front";
import BrandSlide from "../components/Brandslide/brand-slide";
import Features from "../components/Features/feature-page";
import Pricing from "../components/Pricing/pricing-card";
import { AnimatedBeamDemo } from "../components/AnimateBeam/animate-beamdemo";
import Paragraph from "../components/Scrollparagraph/scroll-paragraph";
import Testimonials from "../components/Testimonial/testimonial";

const paragraph = "Digital whiteboards spark ideas Share thoughts Draw plans Work together from anywhere Boost teamwork";

 export default function GuestView() {
  return (
    <div className="bg-zinc-800">
    <LandingPageFront />
    <BrandSlide />
    <Paragraph paragraph={paragraph}/>
    <Features />
    <AnimatedBeamDemo/>
    <Pricing />
    <Testimonials/>
    </div>
  );
}