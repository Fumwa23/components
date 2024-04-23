const Testimonial = (props) => {
	const testimonial = props.testimonial;

	if (!testimonial) return null;

	return (
		<li>
			<figure className="relative max-w-lg h-full p-6 md:p-10 bg-base-200 rounded-2xl max-md:text-sm flex flex-col">
				<blockquote className="relative flex-1">
					<p className="text-base-content/80 leading-relaxed">
						{testimonial.text}
					</p>
				</blockquote>
				<figcaption className="relative flex items-center justify-center gap-4 pt-4 mt-4 md:gap-8 md:pt-8 md:mt-8 border-t border-base-content/5">
				<div className="w-full flex items-center justify-center gap-2">
					<div>
						<div className="font-medium text-base-content md:mb-0.5">
							{testimonial.name}
						</div>
						<div className="flex flex-col justify-center items-center md:items-start gap-1">
							<div className="rating">
								{[...Array(5)].map((_, starIndex) => (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill={testimonial.rating > starIndex ? "currentColor" : "none"}
										className="w-5 h-5 text-yellow-500"
										key={starIndex}
									>
									<path
										fillRule="evenodd"
										d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
										clipRule="evenodd"
									/>
									</svg>
								))}
							</div>
						</div>
						{testimonial.username && (
							<div className="mt-0.5 text-sm text-base-content/80">
								@{testimonial.username}
							</div>
						)}
					</div>
				</div>
				</figcaption>
			</figure>
		</li>
	);
};

const Testimonials = (props) => {
	return (
		<section id="testimonials">
			<div className="py-24 px-8 max-w-7xl mx-auto">
				<div className="flex flex-col text-center w-full mb-20">
					<div className="mb-8">
						<h2 className="sm:text-5xl text-4xl font-extrabold text-base-content">
							{props.headline}
						</h2>
					</div>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base text-base-content/80">
						{props.subtitle}
					</p>
				</div>
				<ul
					role="list"
					className="flex flex-col items-center lg:flex-row lg:items-stretch gap-6 lg:gap-8"
				>
					{props.testimonials.map((t, i) => (
						<Testimonial testimonial={t} key={i} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default Testimonials;
