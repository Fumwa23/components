import Image from "next/image";
import config from "@/config";
import Link from "next/link";
import ButtonLead from "./ButtonLead";
import ButtonLeadWithComments from "./ButtonLeadWithComments";

const CTA = () => {
  return (
    <section className="bg-base-100 text-black-content" id="cta">
      {/* <Image
        alt=""
        src=""
        className="object-cover w-full"
        fill
      /> */}
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-black-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Leave a comment?
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Feel free to leave your feedback, advice or ideas!
          </p>
          {/* <ButtonLead /> */}
          <ButtonLeadWithComments />
          {/* <Link href="/chat/examples">
              <button className="btn btn-primary btn-wide">
                Try {config.appName}
              </button>
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
