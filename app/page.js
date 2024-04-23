import Header from "@/components/generic/Header";
import Hero from "@/components/generic/Hero";
import Problem from "@/components/generic/Problem";
import FeaturesAccordion from "@/components/generic/FeaturesAccordion";
import Pricing from "@/components/generic/Pricing";
import FAQ from "@/components/generic/FAQ";
import CTA from "@/components/generic/CTA";
import Footer from "@/components/generic/Footer";
import Testimonials3 from "@/components/generic/Testimonials3";
import config from "@/config";
import FeaturesAccordionStatic from "@/components/generic/FeaturesAccordionStatic";

export default function Home() {
  return (
    <>
      <Header 
        links={[
			{href: "/#howitworks", label: "How it works",},
			{href: "/#benefits", label: "Benefits",},
			{href: "/#faq", label: "FAQ"}
        ]}
      />
      <main>
        <Hero 
            title="My collection of UI components"
            description="Dealflow automatically performs company research to fill your pipeline with prospects that perfectly fit your investment criteria. "
            ctaButtonText="Contact us"
            img="/fold.png"
            ctaButtonLink={config.auth.callbackUrl}
			emailCapture={true}
        />
		<FeaturesAccordionStatic 
			headline="How it works"
			features={[
				{
					title: "1. Discover",
					description: "Our AI Researcher finds and vets companies based on your investment criteria just like a human would.",
					type: "image",
					path: "/undraw_search_engines.png",
					format: "video/mp4",
					// svg: (
					//   <svg
					//     xmlns="http://www.w3.org/2000/svg"
					//     fill="none"
					//     viewBox="0 0 24 24"
					//     strokeWidth={1.5}
					//     stroke="currentColor"
					//     className="w-6 h-6"
					//   >
					//     <path
					//       strokeLinecap="round"
					//       d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
					//     />
					//   </svg>
					// ),
				},
				{
					title: "2. Present",
					description: "You review the findings and provide feedback to continually improve the AI's accuracy - You're always in the loop.",
					type: "image",
					path: "/undraw_Teaching.png",
					format: "video/mp4",
				},
				{
					title: "3. Reach Out",
					description: "We generate and deliver tailored outreach messages that create strong impressions.",
					type: "image",
					path: "/undraw_confidential_letter.png",
					format: "video/mp4",
				},
				{
					title: "4. Nurture",
					description: "We keep track of updates and continue to notify you with important developments on your prospect portfolio.",
					type: "image",
					path: "/undraw_undraw_love.png",
					format: "video/mp4",
				},
			]}
		/>
        <Problem
			headline="Proven benefits"
			steps={[
				{emoji: "500%", text: "more prospects with no extra effort",},
				{emoji: "900", text: "hours equivelent of research done for you per iteration.",},
				{emoji: "10x", text: "the number of deals you keep warm.",},
			]}
		/>
        {/* <Testimonials3 
			headline="Testimonials"
			subtitle="Don&apos;t take our word for it. Here&apos;s what our users have to say."
			testimonials={[
				{
					username: "Morgan D", // Optional, use for social media like Twitter. Does not link anywhere but cool to display
					name: "Morgan", // REQUIRED
					text: "The future is now, this has been very helpful for my daily tasks!", // REQUIRED
					// Optional, a statically imported image (usually from your public folder—recommended) or a link to the person's avatar. Shows a fallback letter if not provided
					// img: "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
					rating: 5,
				},
				{
					username: "Lizzie M",
					name: "Lizzie",
					text: "Really interesting platform with great potential,excited to see what comes next.",
					rating: 4,
				},
				{
					username: "Harry B",
					name: "Harry",
					text: "I've used this every day since I found it to learn something new, whilst I'm on lunch or just idle.",
					rating: 5,
				},
			]}
		/> */}
        {/* <Pricing 
			headline="You're only one webinar away from online business success"
			plans={config.stripe.plans}
			tagline="Pay monthly. Access knowledge forever."
		/> */}
        <FAQ 
			faqs={[
				{
					question: "What if we have specific/uncommon criteria for our investments?",
					answer: <div className="space-y-2 leading-relaxed">Our tool is versatile and flexible to adjust to your criteria. We will discuss your specific needs in an onboarding call.</div>,
				},
				// {
				// 	question: "Can it use Companies House / LinkedIn / Crunchbase?",
				// 	answer: (
				// 	<div className="space-y-2 leading-relaxed">
				// 	We process numerous publicly available information sources, providing up-to-date, comprehensive and object results.
				// 	</div>
				// 	),
				// },
				{
					question: "Can it gather information from sources we specify?",
					answer: (
					<div className="space-y-2 leading-relaxed">Our team is commited to finding the information you need. We will work with you closely to make sure that happens. </div>
					),
				},
				{
					question: "How long does it take to implement?",
					answer: (
					<div className="space-y-2 leading-relaxed">We can adapt our model to your criteria and fill your pipeline in a matter of days. Have your tailored AI Researcher up and running in 2 weeks (average). </div>
					),
				},
				{
					question: "What is an example of investment criteria?",
					answer: (
					<div className="space-y-2 leading-relaxed">An investment criteria can have multiple dimensions such as geography, sector, company size, company age, funds raised, and others. An example could be looking for companies that are based in Europe, operates in cybersecurity, is B2B, has between 10 and 100 employees, is more than 2 years old, and has not raised series A before.</div>
					),
				},
			]}
		/>
        <CTA />
      </main>
      <Footer />
    </>
  );
}