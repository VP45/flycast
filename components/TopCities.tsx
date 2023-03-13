// Style
import { CardsContainer, CardSpacer, Card } from "./StylesTopCities";

const TopCities = () => {
  const deals = [
    {
      name: "Paris",
      link: "",
      image: "paris.jpg",
    },
    {
      name: "Cairo",
      link: "",
      image: "cairo.jpg",
    },
    {
      name: "New York",
      link: "",
      image: "newyork.jpg",
    },
    {
      name: "Cancun",
      link: "",
      image: "cancun.jpg",
    },
    {
      name: "Hong Kong",
      link: "",
      image: "hongkong.jpg",
    },
  ];

  const animationOffset = [0, 50, 100, 30, 100];

  return (
    <div className="w-full flex flex-col space-y-4 mt-16 mb-8">
      <h1 className="sm:mb-4 p-4 text-2xl sm:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        Ready for an{" "}
        <span className="underline underline-offset-3 decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
          adventure?
        </span>{" "}
        Start booking!
      </h1>

      <CardsContainer>
        {deals.map((deal, index) => {
          return (
            <CardSpacer offset={animationOffset[index]} key={index}>
              <Card href="/" image={index}>
                <h1 className="text-xl font-bold pt-2 pb-2 w-full text-center sm:text-2xl bg-[rgb(255,111,42,52%)] hover:bg-[rgb(255,111,42,80%)] transition-all duration-200">
                  {deal.name}
                </h1>
              </Card>
            </CardSpacer>
          );
        })}
      </CardsContainer>
    </div>
  );
};

export default TopCities;
