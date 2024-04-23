import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import ButtonLead from "./ButtonLead";
import Button from "./Button";
import Link from "next/link";

const Hero = (props) => {
	return (
		<section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
		<div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">


			<h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
						{props.title}
			</h1>
			<p className="text-lg opacity-80 leading-relaxed">
				{props.description}
			</p>
			{props.detail && <p>{props.detail}</p>}
			{props.emailCapture ?
				<Button
				href="/#cta"
				className="btn btn-primary"
				title="Contact Us"
				/>
				// <ButtonLead 
				// 	lead_magnet_name={props.lead_magnet_name}
				// 	text={props.ctaButtonText} 
				// 	successMessage={props.successMessage} 
				// 	convertKitFormId={props.convertKitFormId}
				// />
				:
				<Link href={props.ctaButtonLink}>
					<button className="btn btn-primary btn-wide" href="/examples">
						{props.ctaButtonText}
					</button>
				</Link>
			}

			{props.showTestimonials && <TestimonialsAvatars priority={true} />}
		</div>
		<div className="lg:w-full lg:max-h-full">
			<div className="rounded-lg overflow-hidden">
				<Image
					// src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
					src={props.img  || "/images/laptop-logos.png"}
					alt="Product Demo"
					className="w-full"
					priority={true}
					width={300}
					height={300}
				/>
			</div>
		</div>
		</section>
	);
};

export default Hero;



// const Hero = () => {
//   return (
//     <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
//       <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">


//         <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          
//         </h1>
//         <p className="text-lg opacity-80 leading-relaxed">
//           Sometimes you need someone to talk things through with. We make it easy to have those conversations with exactly the right personality.
//         </p>
//         {/* <ButtonLead /> */}
//         <Link href="/chat/examples">
//           <button className="btn btn-primary btn-wide">
//             Try {config.appName}
//           </button>
//         </Link>

//         <TestimonialsAvatars priority={true} />
//       </div>
//       <div className="lg:w-full">
//         <div className="rounded-lg overflow-hidden">
//           <Image
//             // src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
//             src="/join.png"
//             alt="Product Demo"
//             className="w-full"
//             priority={true}
//             width={500}
//             height={500}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
