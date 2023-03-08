import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import PlaceDetail from "../components/PlaceDetail";
// import { getPlacesData } from "./api";
import { getPlacesData } from "./api/apiTravel";
import Head from "next/head";
import data from "../assets/data.json"

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get the users current location on intial login
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredData = places.filter((place) => place.rating > ratings);
    setFilteredPlaces(filteredData);
    console.log({ ratings });
  }, [ratings]);

  useEffect(() => {
    setIsLoading(true);

    // setPlaces(data['data']);
    // console.log(data['data'])
    // setIsLoading(false);

      // fetch('/api')
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log("data ", data); // Log the data before creating LatLng objects

      //     setPlaces(data);
      //     setIsLoading(false);
      //   });

    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      console.log(data);
      setPlaces(data);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      maxWidth={"100vw"}
      maxHeight={"100vh"}
      position={"relative"}
    >
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB_mCvjxYGOsx5Jo5ekLUIieifOJArCInA"></script>
      </Head>

      <Header
        setType={setType} 
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />

      <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
      />


      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
      />

      
    </Flex>
  );
};

export default Home;
