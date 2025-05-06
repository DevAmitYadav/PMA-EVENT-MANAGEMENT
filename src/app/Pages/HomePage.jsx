const HomePage = () => {
  return (
    <div className="m-0 p-0">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
        <img
          src="https://storage.googleapis.com/a1aa/image/e31452fd-f961-48bc-f7af-6e9424a0094b.jpg"
          alt="Wedding flowers and candles"
          className="w-full h-full object-cover brightness-75"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Gorgeous Flowers for Your
            <br />
            Special Event
          </h1>
          <img
            src="https://storage.googleapis.com/a1aa/image/f770f5b7-5537-4f24-80d2-260e31b30bca.jpg"
            alt="Decorative floral divider line"
            className="mt-4 w-[150px] h-[20px]"
            width={150}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
