import React, { useState } from 'react'
import styled from "styled-components";

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
  font-size: 0.8rem;
  font-weight: bold;
  font-weight: 600;
  color: #000fs0;
  padding: 0.4rem;
`;

const Input = styled.input`
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  color: #000;
  width: calc(100% - 2rem);
  padding: 0.6rem 0.6rem;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #ff6f2a;
  }
`;

const Select = styled.select`
  padding: 0.6rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  width: calc(100% - 0.6rem);
  color: #000;
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

const LanguageSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LanguageRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const TopLocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 0.4rem;
`;

const LanguageOption = styled.div`
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  align-items: center;
  margin-right: 0.2rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  &.selected {
    border: 1px solid #ff6f2a;
    border-radius: 0.4rem;
  }

  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }
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
  font-size: 12px;
  align-items: center;
  padding: 4px;
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

const CuisineType = styled.select`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
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

  languages: [
    { value: "en", label: "English", icon: "🇺🇸" },
    { value: "tr", label: "Türkçe", icon: "🇹🇷" },
    { value: "fr", label: "Français", icon: "🇫🇷" },
    { value: "es", label: "Español", icon: "🇪🇸" },
    { value: "de", label: "Deutsch", icon: "🇩🇪" },
    { value: "it", label: "Italiano", icon: "🇮🇹" },
    { value: "pt", label: "Português", icon: "🇵🇹" },
    { value: "ru", label: "Русский", icon: "🇷🇺" },
    { value: "ja", label: "日本語", icon: "🇯🇵" },
  ],
};

const topLocations = [
  { name: "Milano, Italy", value: "Milano/Italy" },
  { name: "Paris, France", value: "Paris/France" },
  { name: "Los Angeles, CA", value: "Los Angeles/California" },
  // add more top locations as needed
];

interface TopLocation {
  name: string;
  value: string;
}

interface Language {
  value: string;
  label: string;
  icon: string;
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
  language: string;
}


const defaultValues = {
  destinationCountry: "",
  budget: "250 USD",
  travelStyle: options.travelStyles[0],
  interestsNew: [],
  accommodationType: options.accommodationTypes[0],
  transportationType: "Bus",
  activitiesNew: [],
  cuisineType: [options.cuisineTypes[0]],
  tripDuration: "3",
  language: options.languages[0].value,
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
  const [response, setResponse] = useState("");
  const [values, setValues] = useState<DefaultValues>(defaultValues);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<CuisineType[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    options.languages[0]
  );

  const handleCuisineTypeClick = (cuisineType: CuisineType) => {
    if (selectedCuisineTypes.includes(cuisineType)) {
      setSelectedCuisineTypes(
        selectedCuisineTypes.filter((item) => item !== cuisineType)
      );
      setValues((prevState) => ({
        ...prevState,
        cuisineType: selectedCuisineTypes.filter(
          (item: CuisineType) => item !== cuisineType
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

  const handleLanguageClick = (option: Language) => {
    setSelectedLanguage(option); // itt was option.value before

    setValues((prevState) => ({
      ...prevState,
      language: option.label,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. The itinerary should include ${values.activitiesNew} activities and ${values.cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${values.language}. `;

    fetch(`https://c3-na.altogic.com/e:6407519d2f0b61e4d9dda50f/travel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.choices[0].message.content);
        console.log(data.choices[0].message.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <>
      {/* Container for demo purpose */}
      <div className="container my-24 px-6 mx-auto">
        {/* Section: Design Block */}
        <section className="mb-32 text-gray-800">
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
            <Panel>
              <FormContainer onSubmit={handleSubmit}>
                <Label htmlFor="destinationCountry">Destination Country</Label>
                <Input
                  type="text"
                  placeholder="e.g. San Francisco/USA, Paris/France, Istanbul/Turkey, etc."
                  id="destinationCountry"
                  name="destinationCountry"
                  value={values.destinationCountry}
                  onChange={handleChangeInput}
                  required
                />
                <TopLocationContainer>
                  <Label htmlFor="topDestinations">🔥Top Destionations:</Label>
                  {topLocations.map((location) => (
                    <PinButton
                      key={location.value}
                      onClick={() => handleLocationClick(location)}
                    >
                      {location.name}
                    </PinButton>
                  ))}
                </TopLocationContainer>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="budget">
                      Budget
                      <p
                        style={{
                          display: "inline-block",
                          color: "#666",
                          fontSize: "10px",
                        }}
                      >
                        (with currency)
                      </p>
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g. $1000 USD, 1000 EUR, etc."
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onChange={handleChangeInput}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="tripDuration">
                      Trip Duration
                      <p
                        style={{
                          display: "inline-block",
                          color: "#666",
                          fontSize: "10px",
                        }}
                      >
                        (in days)
                      </p>
                    </Label>
                    <Input
                      type="number"
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
                      <InterestName>{interest.name}</InterestName>
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
                  <p
                    style={{
                      display: "inline-block",
                      fontSize: "10px",

                      color: "#666",
                    }}
                  >
                    (e.g. car, train, bus, etc.)
                  </p>
                </Label>
                <Input
                  type="text"
                  id="transportationType"
                  name="transportationType"
                  value={values.transportationType}
                  onChange={handleChangeInput}
                  required
                />

                <Label htmlFor="activityType">
                  Activity Type
                  <p
                    style={{
                      display: "inline-block",
                      fontSize: "10px",

                      color: "#666",
                    }}
                  >
                    (select multiple options)
                  </p>
                </Label>
                {/* <Select
                  id="activityType"
                  name="activityType"
                  multiple
                  value={values.activitiesNew}
                  onChange={handleMultiSelectChange}
                >
                  {options.activityTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select> */}
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
                    // value={interest}
                    >
                      {/* <InterestEmoji aria-label="emoji">
                        {interest.emoji}
                      </InterestEmoji> */}
                      <InterestName>{activity}</InterestName>
                    </InterestItemNew>
                  ))}
                </InterestsContainerNew>
                <Label htmlFor="cuisineType">Cuisine Type</Label>
                {/* <CuisineTypesContainer>
                  {options.cuisineTypes.map((cuisineType) => (
                    <CuisineType
                      multiple
                      value={values.cuisineType}
                      onChange={handleMultiSelectChange}
                      key={cuisineType.name}
                      className={
                        selectedCuisineTypes.includes(cuisineType.name)
                          ? "selected"
                          : ""
                      }
                      onClick={() => {
                        handleCuisineTypeClick(cuisineType.name);
                      }}
                    >
                      <span role="img" aria-label={cuisineType.name}>
                        {cuisineType.emoji}
                      </span>

                      <br />

                      <span>{cuisineType.name}</span>
                    </CuisineType>
                  ))}
                </CuisineTypesContainer> */}

                {/* <LanguageSelectorContainer>
                  <Label>Language</Label>
                  <LanguageRow>
                    {options.languages.map((option) => (
                      <LanguageOption
                        key={option.value}
                        onClick={() => {
                          handleLanguageClick(option);
                        }}
                        value={values.language}
                        className={
                          selectedLanguage === option.value ? "selected" : ""
                        }
                      >
                        <span role="img" aria-label={option.label}>
                          {option.icon}
                        </span>
                      </LanguageOption>
                    ))}
                  </LanguageRow>
                </LanguageSelectorContainer> */}
                <GenerateButton
                  loading={loading}
                  type="submit"
                  disabled={loading}
                  className={loading ? "loading" : ""}
                ></GenerateButton>
              </FormContainer>
            </Panel>
            <div className="mb-6 md:mb-0">
              <p className="font-bold mb-4">Anim pariatur cliche reprehenderit?</p>
              <p className="text-gray-500 mb-12">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt autem
                numquam dolore molestias aperiam culpa alias veritatis architecto
                eos, molestiae vitae ex eligendi libero eveniet dolorem, doloremque
                rem aliquid perferendis.
              </p>
              <p className="font-bold mb-4">
                Non cupidatat skateboard dolor brunch?
              </p>
              <p className="text-gray-500 mb-12">
                Distinctio corporis, iure facere ducimus quos consectetur ipsa ut
                magnam autem doloremque ex! Id, sequi. Voluptatum magnam sed fugit
                iusto minus et suscipit? Minima sunt at nulla tenetur, numquam unde
                quod modi magnam ab deserunt ipsam sint aliquid dolores libero
                repellendus cupiditate mollitia quidem dolorem odit
              </p>
              <p className="font-bold mb-4">
                Praesentium voluptatibus temporibus consequatur non aspernatur?
              </p>
              <p className="text-gray-500 mb-12">
                Minima sunt at nulla tenetur, numquam unde quod modi magnam ab
                deserunt ipsam sint aliquid dolores libero repellendus cupiditate
                mollitia quidem dolorem.
              </p>
              <p className="font-bold mb-4">
                Voluptatum magnam sed fugit iusto minus et suscipit?
              </p>
              <p className="text-gray-500 mb-12">
                Laudantium perferendis, est alias iure ut veniam suscipit dolorem
                fugit. Et ipsam corporis earum ea ut quae cum non iusto blanditiis
                ipsum dolor eius reiciendis, velit adipisci quas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>

  )
}

export default TripPlanner