

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        DAPP Voting System
        <br/>
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          for voters
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        
    Decentralized voting ensures greater transparency, security, and inclusivity in democratic processes by distributing decision-making power across a network of participants rather than relying on centralized authorities.
      </p>

    </div>
  );
};

export default HeroSection;
