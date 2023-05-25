import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import markdownToTxt from 'markdown-to-txt';

type Props = {};
const Panel = styled.div`
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  overflow-y: auto;

  @media screen and (max-width: 1320px) {
    flex-basis: calc(40% - 2.2rem);
    // width: calc(40% - 2.2rem);
    // position: relative;
  }

  @media (max-width: 768px) {
    // width: calc(100% - 2rem);
    margin: 0 auto;
  }

  @media (max-height: 500px) {
    // width: calc(100% - 2rem);
    margin: 0 auto;
    overflow-y: scroll;
    // position: relative;
  }
`;

const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  top: 0;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  font-weight: 600;
  color: #000fs0;
  padding: 10px 0 2px 5px;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #ccc;
  color: #000;
  width: calc(100% - 40px);
  padding: 0.6rem 0.6rem;
  margin-left: 5px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #ff6f2a;
  }
`;

const Select = styled.select`
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: calc(100% - 35px);
  color: #000;
  -webkit-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #ff6f2a;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const TopLocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 0.4rem;
`;

const PinButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  font-size: 12px;
  letter-spacing: 0px;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &::before {
    content: "📍";
    margin-right: 4px;
    left: 8px;
    top: 8px;
  }

  &:hover {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
  }
`;

const InterestsContainerNew = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const InterestItemNew = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  padding: 0 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;

  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }

  &.selected {
    border: 1px solid #ff6f2a;
    border-radius: 0.4rem;
  }
`;

const InterestName = styled.span`
  margin-left: 6px;
  margin-right: 6px;
`;

const InterestEmoji = styled.span`
  font-size: 16px;
`;

const CuisineTypesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const CuisineType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  padding: 0.4rem;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  &.selected {
    border: 1px solid #ff6f2a;
    border-radius: 0.4rem;
  }
  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }
`;


const Button = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  font-size: 1rem;

  background-color: #ff6f2a;
  color: #fff;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #d8581d;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &.loading {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;



const options = {
  travelStyles: [
    "Cultural",
    "Adventure",
    "Relaxation",
    "Beach",
    "City Break",
    "Road Trip",
    "Wildlife Safari",
    "Ski",
  ],
  interestsNew: [
    { name: "History", emoji: "🏛️" },
    { name: "Art", emoji: "🎨" },
    { name: "Food", emoji: "🍴" },
    { name: "Music", emoji: "🎵" },
    { name: "Nature", emoji: "🌳" },
    { name: "Sports", emoji: "⚽" },
    { name: "Photography", emoji: "📷" },
    { name: "Architecture", emoji: "🏰" },
    { name: "Literature", emoji: "📚" },
  ],

  interests: [
    "History",
    "Art",
    "Food",
    "Music",
    "Nature",
    "Sports",
    "Photography",
    "Architecture",
    "Literature",
  ],

  accommodationTypes: [
    "Hotel",
    "Boutique Hotel",
    "Hostel",
    "Resort",
    "Vacation Rental",
    "Camping",
    "Homestay",
    "Bed and Breakfast",
  ],
  activityTypes: [
    "Outdoor",
    "Sightseeing",
    "Shopping",
    "Nightlife",
    "Museums",
    "Theme Parks",
    "Water Sports",
    "Yoga and Wellness",
  ],
  cuisineTypes: [
    { name: "Traditional", emoji: "😋" },
    { name: "Japanese", emoji: "🍱" },
    { name: "Italian", emoji: "🍝" },
    { name: "American", emoji: "🍔" },
    { name: "Korean", emoji: "🍜" },
    { name: "Mexican", emoji: "🌮" },
    { name: "Thai", emoji: "🍲" },
    { name: "Turkish", emoji: "🥙" },
    { name: "Indian", emoji: "🍛" },
    { name: "French", emoji: "🥐" },
    { name: "Spanish", emoji: "🥘" },
    { name: "Greek", emoji: "🍗" },
    { name: "Chinese", emoji: "🥡" },
  ],

};

const topLocations = [
  { name: "Mumbai, India", value: "Mumbai, India" },
  { name: "Delhi, India", value: "Delhi, India" },
  { name: "Agra, India", value: "Agra, India" },
  // add more top locations as needed
];

interface TopLocation {
  name: string;
  value: string;
}

interface CuisineType {
  name: string;
  emoji: string;
}

interface DefaultValues {
  destinationCountry: string;
  budget: string;
  travelStyle: string;
  interestsNew: string[];
  activitiesNew: string[];
  accommodationType: string;
  transportationType: string;
  // activityType: string[];
  cuisineType: CuisineType[];
  tripDuration: string;
}


const defaultValues = {
  destinationCountry: "",
  budget: "10000 INR",
  travelStyle: options.travelStyles[0],
  interestsNew: [],
  accommodationType: options.accommodationTypes[0],
  transportationType: "Bus",
  activitiesNew: [],
  cuisineType: [options.cuisineTypes[0]],
  tripDuration: "3"
};

type GenerateProps = {
  loading: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};
const GenerateButton = ({ loading }: GenerateProps) => (
  <Button disabled={loading}>
    {loading ? "Please wait..." : "Generate"}
  </Button>
);

const TripPlanner = (props: Props) => {


  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [values, setValues] = useState<DefaultValues>(defaultValues);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<CuisineType[]>([]);
  const { showTripPlanner, setShowTripPlanner } = useContext(AppContext)

  const handleCuisineTypeClick = (cuisineType: CuisineType) => {
    if (selectedCuisineTypes.find((cuisine) => cuisine.name === cuisineType.name) !== undefined) {
      setSelectedCuisineTypes(
        selectedCuisineTypes.filter((item) => item.name !== cuisineType.name)
      );
      setValues((prevState) => ({
        ...prevState,
        cuisineType: selectedCuisineTypes.filter(
          (item: CuisineType) => item.name !== cuisineType.name
        ),
      }));
    } else {
      if (selectedCuisineTypes.length >= 3) {
        setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
          const newSelectedCuisineTypes = [
            ...prevSelectedCuisineTypes.slice(1),
            cuisineType,
          ];
          setValues((prevState) => ({
            ...prevState,
            cuisineType: newSelectedCuisineTypes,
          }));
          return newSelectedCuisineTypes;
        });
      } else {
        setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
          const newSelectedCuisineTypes = [
            ...prevSelectedCuisineTypes,
            cuisineType,
          ];
          setValues((prevState) => ({
            ...prevState,
            cuisineType: newSelectedCuisineTypes,
          }));
          return newSelectedCuisineTypes;
        });
      }
    }


    console.log("hwllooo", values);
  };

  const handleInterestClick = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      if (selectedInterests.length >= 3) {
        setSelectedInterests((prevSelectedInterests) => {
          const newSelectedInterests = [
            ...prevSelectedInterests.slice(1),
            interest,
          ];
          setValues((prevState) => ({
            ...prevState,
            interestsNew: newSelectedInterests,
          }));
          return newSelectedInterests;
        });
      } else {
        setSelectedInterests((prevSelectedInterests) => {
          const newSelectedInterests = [...prevSelectedInterests, interest];
          setValues((prevState) => ({
            ...prevState,
            interestsNew: newSelectedInterests,
          }));
          return newSelectedInterests;
        });
      }
    }
  };

  const handleActivityClick = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity)
      );
    } else {
      if (selectedActivities.length >= 3) {
        setSelectedActivities((prevSelectedActivities) => {
          const newSelectedActivities = [
            ...prevSelectedActivities.slice(1),
            activity,
          ];
          setValues((prevState) => ({
            ...prevState,
            activitiesNew: newSelectedActivities,
          }));
          return newSelectedActivities;
        });
      } else {
        setSelectedActivities((prevSelectedActivities) => {
          const newSelectedActivities = [...prevSelectedActivities, activity];
          setValues((prevState) => ({
            ...prevState,
            activitiesNew: newSelectedActivities,
          }));
          return newSelectedActivities;
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationClick = (location: TopLocation) => {
    setValues((prevState) => ({
      ...prevState,
      destinationCountry: location.name,
    }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedOptions: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setValues((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse('');
    setLoading(true);
    const cuisineArray = values.cuisineType.map((cuisine) => cuisine.name);
    let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. The itinerary should include ${values.activitiesNew} activities and ${cuisineArray} dining options. Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in English. Generate response as well formated markdown code`;


    console.log(prompt);
    console.log(values);
    setLoading(false);
    // fetch(`https://c3-na.altogic.com/e:6407519d2f0b61e4d9dda50f/travel`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ prompt: prompt }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setResponse(data.choices[0].message.content);
    //     console.log(data.choices[0].message.content);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
    if (!response.ok) {
      // throw new Error(response.statusText);
      console.log(response.statusText);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
      console.log(chunkValue);
    }
    // scrollToBioszz();
    setLoading(false);
  };
  return (
    <div className='md:p-12 shadow-lg  px-6' id='trip-planner'>
      {/* close button on top right corner */}
      <div className='flex justify-end'>
        <button
          className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700'
          aria-label='Close'
          onClick={() => {
            setShowTripPlanner(false);
          }}
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      {/* title */}
      <div className='flex flex-col items-center justify-center mt-12 mb-6'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-white'>Trip Planner</h1>
        <p className='text-gray-500 md:text-lg md:mt-2 md:mb-12 dark:text-gray-300'>
          Flycast trip planner is a powerful tool that helps travelers plan their dream vacation. With customizable itineraries and travel recommendations.
        </p>
      </div>
      <div className="container mx-auto">
        {/* Section: Design Block ... */}
        <section className="mb-32 text-gray-800 dark:text-white">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-x-12 lg:mb-0">
            {/* <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6">
                Trip Planner
              </h2>
              <p className="text-gray-500 mb-12">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt autem
              </p>
              <form>
                <div className="form-group mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#ff6f2a] focus:outline-none"
                    id="exampleInput7"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#ff6f2a] focus:outline-none"
                    id="exampleInput8"
                    placeholder="Email address"
                  />
                </div>
                <div className="form-group mb-6">
                  <textarea
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#ff6f2a] focus:outline-none"
                    id="exampleFormControlTextarea13"
                    rows={3}
                    placeholder="Message"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group form-check text-center mb-6">
                  <input
                    type="checkbox"
                    className="outline-none focus:outline-none form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#ff6f2a] checked:border-[#ff6f2a]transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck87"
                    defaultChecked={true}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck87"
                  >
                    Send me a copy of this message
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-[#ff6f2a] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#cf5923] hover:shadow-lg focus:bg-[#cf5923] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#cf5923] active:shadow-lg transition duration-150 ease-in-out"
                >
                  Send
                </button>
              </form>
            </div> */}
            <Panel className='dark:bg-gray-900 rounded-md border-2'>
              <FormContainer onSubmit={handleSubmit} className='justify-center'>
                <Label htmlFor="destinationCountry">Destination Place</Label>
                <Input
                  type="text"
                  placeholder="e.g. Mumbai/India Delhi/India, etc."
                  id="destinationCountry"
                  name="destinationCountry"
                  value={values.destinationCountry}
                  onChange={handleChangeInput}
                  required
                  className='rounded-md dark:bg-gray-700 text-sm dark:text-white'
                />
                <TopLocationContainer>
                  <Label htmlFor="topDestinations">Top Destionations:</Label>
                  {topLocations.map((location) => (
                    <PinButton
                      key={location.value}
                      onClick={() => handleLocationClick(location)}
                      className='dark:text-gray-400 text-sm mt-[10px] dark:hover:bg-slate-200 dark:hover:text-gray-900'
                    >
                      {location.name}
                    </PinButton>
                  ))}
                </TopLocationContainer>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="budget">
                      Budget
                      <p className='inline-block text-gray-700 dark:text-gray-200 text-[14px] ml-1 font-medium'>
                        (with currency)
                      </p>
                    </Label>
                    <Input
                      type="text"
                      className='rounded-md dark:bg-gray-700 text-sm dark:text-white'
                      placeholder="e.g. 15000 INR"
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onChange={handleChangeInput}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="tripDuration" >
                      Trip Duration
                      <p className='inline-block text-gray-700 dark:text-gray-200 text-[14px] ml-1 font-medium' >
                        (in days)
                      </p>
                    </Label>
                    <Input
                      type="number"
                      className='rounded-md dark:bg-gray-700 text-sm dark:text-white'
                      id="tripDuration"
                      name="tripDuration"
                      value={values.tripDuration}
                      onChange={handleChangeInput}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <Label htmlFor="interests">Interests</Label>
                <InterestsContainerNew>
                  {options.interestsNew.map((interest, index) => (
                    <InterestItemNew
                      key={index}
                      className={
                        selectedInterests.includes(interest.name) ? "selected" : ""
                      }
                      onClick={() => {
                        handleInterestClick(interest.name);
                      }}
                    // value={interest}
                    >
                      <InterestEmoji aria-label="emoji">
                        {interest.emoji}
                      </InterestEmoji>
                      <InterestName className='dark:text-gray-400'>{interest.name}</InterestName>
                    </InterestItemNew>
                  ))}
                </InterestsContainerNew>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="accommodationType">Accommodation</Label>
                    <Select
                      id="accommodationType"
                      name="accommodationType"
                      value={values.accommodationType}
                      onChange={handleChange}
                      className='py-2 ml-[5px] rounded-md dark:bg-gray-700 dark:text-white'
                    >
                      {options.accommodationTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="travelStyle">Travel Style</Label>
                    <Select
                      id="travelStyle"
                      name="travelStyle"
                      value={values.travelStyle}
                      onChange={handleChange}
                      className='py-2 rounded-md dark:bg-gray-700 dark:text-white'
                    >
                      {options.travelStyles.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormRow>

                <Label htmlFor="transportationType">
                  Transportation Type
                  <p className='inline-block text-gray-700 dark:text-gray-200 text-[14px] mx-1 font-medium'>
                    (e.g. car, train, bus, etc.)
                  </p>
                </Label>
                <Input
                  type="text"
                  className='rounded-md dark:bg-gray-700 text-sm dark:text-white'
                  id="transportationType"
                  name="transportationType"
                  value={values.transportationType}
                  onChange={handleChangeInput}
                  required
                />

                <Label htmlFor="activityType">
                  Activity Type
                  <p className='inline-block text-gray-700 dark:text-gray-200 text-[14px] ml-1 font-normal' >
                    (select multiple options)
                  </p>
                </Label>
                <InterestsContainerNew>
                  {options.activityTypes.map((activity, index) => (
                    <InterestItemNew
                      key={index}
                      className={
                        selectedActivities.includes(activity) ? "selected" : ""
                      }
                      onClick={() => {
                        handleActivityClick(activity);
                        console.log(selectedActivities);
                        console.log(activity);
                      }}
                    >
                      <InterestName className='dark:text-gray-400'>{activity}</InterestName>
                    </InterestItemNew>
                  ))}
                </InterestsContainerNew>
                <Label htmlFor="cuisineType">Cuisine Type</Label>
                <CuisineTypesContainer className='text-sm'>
                  {options.cuisineTypes.map((cuisineType) => (
                    <CuisineType
                      // multiple
                      // value={values.cuisineType}
                      // onChange={handleMultiSelectChange}
                      key={cuisineType.name}
                      className={
                        selectedCuisineTypes.find((cuisine) => cuisine.name === cuisineType.name) !== undefined
                          ? "selected"
                          : ""
                      }
                      onClick={() => {
                        handleCuisineTypeClick(cuisineType);
                      }}
                    >
                      <span role="img" aria-label={cuisineType.name}>
                        {cuisineType.emoji}
                      </span>

                      <br />

                      <span className='dark:text-gray-400'>{cuisineType.name}</span>
                    </CuisineType>
                  ))}
                </CuisineTypesContainer>
                <GenerateButton
                  loading={loading}
                  type="submit"
                  disabled={loading}
                  className={loading ? "loading" : ""}
                ></GenerateButton>
              </FormContainer>
            </Panel>
            <div className="mb-6 md:mb-0 h-screen border-2 rounded-md px-4 overflow-y-scroll relative dark:bg-gray-900">
              {/* Your plan is ready msg */}
              {response && (
                <div className="z-10 flex flex-col items-center sticky top-0 py-4 shadow-md bg-gray-100 my-2 dark:bg-gray-700 rounded">
                  <h1 className="text-2xl font-bold text-center">
                    Your plan is ready!
                  </h1>
                  <p className="text-center">
                    Click on the button below to download your plan.
                  </p>
                  <button
                    className="bg-[#ff6f2a] hover:bg-[#f88049] text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      const blob = new Blob([markdownToTxt(response)], {
                        type: "text/plain;charset=utf-8",
                      });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", "travel-plan.txt");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                      return false;
                    }}
                  >
                    Download
                  </button>
                </div>
              )}
              {/* Your plan is ready msg */}
              {
                response === "" && (
                  <div className='w-full h-full flex items-center justify-center'>
                    <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-bold text-center">
                        Your plan will appear here
                      </h1>
                      <p className="text-center">
                        Click on the generate button to generate your plan.
                      </p>
                    </div>
                  </div>
                )
              }
              {
                response.length > 0 && (
                  <div className='overflow-y-scroll trip-planner'>
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                )
              }
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default TripPlanner