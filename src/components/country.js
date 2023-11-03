import React, { useEffect, useState } from 'react';
import countriesData from './JSON/countries.json'; // Import your JSON data

function Country() {
function getFlagEmoji(isoCode) {
  if (isoCode) {
    return isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  }
  return '';
}


  const [country, setCountry] = useState('none');
  const [ambulance, setAmbulance] = useState('X');
  const [fire, setFire] = useState('X');
  const [police, setPolice] = useState('X');
  const [dispatch, setDispatch] = useState('X');
  const [localOnly, setLocalOnly] = useState('X');
  const [iso, setISOcode] = useState('X');

  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then((response) => response.json())
      .then((data) => {
        setCountry(data.country_name);
      });
  }, []);

  useEffect(() => {
    const foundCountry = countriesData.find((countryData) => countryData.Country.Name === country);
    if (foundCountry) {
      setAmbulance(foundCountry.Ambulance.All[0]);
      setFire(foundCountry.Fire.All[0]);
      setPolice(foundCountry.Police.All[0]);
      setDispatch(foundCountry.Dispatch.All[0]);
      setLocalOnly(foundCountry.LocalOnly ? "Emergency Services available just for the locals" : "Emergency Services are not just available to the locals");
      setISOcode(foundCountry.Country.ISOCode.toLowerCase());
    }
  }, [country]);

  return (
    <div className='flex flex-col items-center justify-center text-white'>
      <h1 className='font-bold text-3xl sm:text-1xl' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px'}}>Emergency Services</h1>
      <h3 className="text-white text-3xl mb-2 font-semibold sm:text-1xl md:text-1xl">{getFlagEmoji(iso)} It appears you're from {country}, here are a list of available Emergency Services</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="backdrop-blur-sm rounded-xl relative bg-opacity-70 bg-gray-900 p-3 sm:p-6 mb-2 sm:mb-4 mx-2">
          <h1 className="text-xl sm:text-2xl text-center">🚑</h1>
          <div className="flex flex-col">
            <h4 className="text-red-500 text-center font-semibold text-14 sm:text-18 mb-2">Ambulance</h4>
            <p className="text-red text-center font-semibold text-16 sm:text-250x">Number is: {ambulance}</p>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-xl relative bg-opacity-70 bg-gray-900 p-3 sm:p-6 mb-2 sm:mb-4 mx-2">
          <h1 className="text-xl sm:text-3xl text-center">🚔</h1>
          <div className="flex flex-col">
            <h4 className="text-red-500 text-center font-semibold text-14 sm:text-18 mb-2">Police</h4>
            <p className="text-red text-center font-semibold text-16 sm:text-250x">Police is: {police}</p>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-xl relative bg-opacity-70 bg-gray-900 p-3 sm:p-6 mb-2 sm:mb-4 mx-2">
          <h1 className="text-xl sm:text-3xl text-center">🚒</h1>
          <div className="flex flex-col">
            <h4 className="text-red-500 text-center font-semibold text-14 sm:text-18 mb-2">Fire</h4>
            <p className="text-red text-center font-semibold text-16 sm:text-250x">Number is: {fire}</p>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-xl relative bg-opacity-70 bg-gray-900 p-3 sm:p-6 mb-2 sm:mb-4 mx-2">
          <h1 className="text-xl sm:text-3xl text-center">⚠</h1>
          <div className="flex flex-col">
            <h4 className="text-red-500 text-center font-semibold text-14 sm:text-18 mb-2">Dispatch</h4>
            <p className="text-red text-center font-semibold text-16 sm:text-250x">Number is: {dispatch}</p>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-xl relative bg-opacity-70 bg-gray-900 p-3 sm:p-6 mb-2 sm:mb-4 mx-2">
          <h1 className="text-xl sm:text-3xl text-center">👥</h1>
          <div className="flex flex-col">
            <h4 className="text-red-500 text-center font-semibold text-14 sm:text-18 mb-2">Availability</h4>
            <p className="text-red text-center font-semibold text-16 sm:text-250x md:text-300x">{localOnly}</p>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Country;
