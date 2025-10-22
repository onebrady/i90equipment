import wesleyImage from "@/assets/wesley-stewart.webp";

const About = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src={wesleyImage}
                alt="Wesley Stewart, Owner of I90 Equipment, standing with heavy-duty construction trailers in Montana"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground px-6 py-4 rounded-lg shadow-lg hidden sm:block">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm font-semibold">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About I90 Equipment
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to I90 Equipment! My name is <strong className="text-foreground">Wesley Stewart</strong>, and I am the proud owner of this venture. With over <strong className="text-foreground">15 years of experience</strong> in the heavy haul business and a background in owning a trucking fleet, I truly understand the significance of reliable, high-quality equipment.
              </p>
              <p>
                At I90 Equipment, we believe that quality equipment is crucial for keeping your customers' products moving smoothly. Our focus is on ensuring that your drivers have access to top-notch equipment, which enhances their performance and satisfaction on the road.
              </p>
              <p>
                To provide you with the best, I've partnered with one of the nation's largest dealers to bring you an exceptional selection of trucks and trailers. We offer renowned brands such as <strong className="text-foreground">XL Specialized, Smithco, Ranco, Dragon, Midland, Choice, and Manac</strong>, among others.
              </p>
              <p>
                Let I90 Equipment be your <strong className="text-foreground">one-stop shop</strong> for all your heavy truck and trailer needs. We are committed to delivering excellent service, quality products, and reliable solutions to keep your business running efficiently.
              </p>
              <p className="text-foreground font-semibold text-lg mt-6">
                Thank you for choosing I90 Equipment!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
