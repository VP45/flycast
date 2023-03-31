// Style
import { CardsContainer, CardSpacer, Card } from "./StylesTopCities";

const TopCities = () => {
  const deals = [
    {
      name: "Mumbai",
      link: "https://www.thrillophilia.com/attractions/gateway-of-india",
      image: "mumbai.jpg",
    },
    {
      name: "Delhi",
      link: "https://www.thrillophilia.com/tours/taj-mahal-entry-ticket-skip-the-line",
      image: "delhi.jpg",
    },
    {
      name: "Dehradun",
      link: "https://www.thrillophilia.com/attractions/shikhar-fall",
      image: "dehradun2.jpg",
    },
    {
      name: "Bangalore",
      link: "https://www.google.com/maps/place/Shivoham+Shiva+Temple/@12.9499897,77.510677,11z/data=!4m10!1m2!2m1!1sbangalore+shiva+temple!3m6!1s0x3bae13f778882c6f:0x14e38042a94c0cab!8m2!3d12.958333!4d77.656531!15sChZiYW5nYWxvcmUgc2hpdmEgdGVtcGxlWhgiFmJhbmdhbG9yZSBzaGl2YSB0ZW1wbGWSAQxoaW5kdV90ZW1wbGXgAQA!16s%2Fg%2F11bv5pt6dj",
      image: "bangalore.jpg",
    },
    {
      name: "Hyderabad",
      link: "https://www.thrillophilia.com/attractions/charminar",
      image: "hyderabad.jpg",
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
              <Card href={deal.link} target="_blank" image={index}>
                <h1 className="text-white text-xl font-bold pt-2 pb-2 w-full text-center sm:text-2xl bg-[rgb(255,111,42,52%)] hover:bg-[rgb(255,111,42,80%)] transition-all duration-200">
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
