import React from "react";
import SoftwareCard from "./SoftwareCard";

const SoftwareProjects: React.FC = () => {
  return (
    <section className="font-poppins">
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <SoftwareCard source="/software/Kazi.webp" title="Kazi Desk HR System" description="A General purpose HR management system by Hillgan Innovations" link="https://kazi-desk.vercel.app/" />
        <SoftwareCard source="/software/Sms.webp" title="Hillgan Bulk SMS System" description="A Bulk SMS management system by Hillgan Innovations" link="https://hillgan-bulksms.vercel.app/" />
        <SoftwareCard source="/software/Opct.webp" title="OPCT Application System" description="Inua Jamii elderly progran cash application platform" link="https://opct-ts.vercel.app/" />
        <SoftwareCard source="/software/Innovation.webp" title="UEAB Innovation" description="A portal for UEAB Students to submit their innovation proposals" link="https://ueabinnovation.vercel.app/" />
        <SoftwareCard source="/software/Research.webp" title="UEAB Research Grants & Innovation" description="A platform for the Directorate of Research Grants & Innovation" link="https://ueab-research.vercel.app/" />
        <SoftwareCard source="/software/Hotel.webp" title="10-Star Hotel Management System" description="A hotel management system for an hypothetical 10-Star hotel" link="https://young-professor-github-io.vercel.app/" />
        <SoftwareCard source="/software/Patrick.webp" title="Patrick Murani" description="My initial portfolio site" link="https://patrickmurani.vercel.app/" />
      </div>
    </section>
  );
};

export default SoftwareProjects;
