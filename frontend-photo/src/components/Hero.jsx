import { Button, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const Hero = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96  box-border">
      <h1 className="text-center  my-3">
        {" "}
        (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Share cute photos of your pets (♥ω♥*)
      </h1>
      <Carousel className="sm:h-screen">
        <img
          className="object-cover"
          src="https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="kitty laying upside down"
        />
        <img
          className="object-cover"
          src="https://images.pexels.com/photos/28305670/pexels-photo-28305670/free-photo-of-a-dog-is-walking-on-a-leash-with-a-person.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="tiny dogs a walk"
        />
        <img
          className="object-cover"
          src="https://images.pexels.com/photos/2463238/pexels-photo-2463238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="orange dogs with Over-the-Collar Dog Bandanas"
        />
      </Carousel>

      <div className="sm:grid grid-flow-dense grid-cols-3 h-screen flex-wrap ">
        <h1 className="col-span-1 lg:m-auto my-3 text-center">
          {" "}
          ┗( ＾0＾)┓ Find inspiration
        </h1>
        <div className="m-auto col-span-2">
          <img
            className=" lg:scale-150 object-cover w-auto h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
            src="https://images.pexels.com/photos/1640784/pexels-photo-1640784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="image description"
          />
        </div>
      </div>
      <div className="sm:grid grid-flow-row-dense grid-cols-3 h-screen flex-wrap ">
        <div className="m-auto col-span-2">
          <img
            className=" object-cover h-auto w-auto max-w-lg transition-all duration-300 rounded-lg blur-sm hover:blur-none"
            src="https://images.pexels.com/photos/28260045/pexels-photo-28260045/free-photo-of-hotcakes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />{" "}
        </div>
        <h1 className="col-span-1 lg:m-auto my-4 text-center">
          Discover new things (◕ᴗ◕✿)
        </h1>
      </div>
      <h1 className="text-center">Join Us!</h1>
      <Button gradientDuoTone="purpleToBlue" className="mx-auto my-4">
        {" "}
        <Link to="/signup">Sign up</Link>
      </Button>
      <Footer />
    </div>
  );
};

export default Hero;
