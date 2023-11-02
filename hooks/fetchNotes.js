import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://192.168.1.236:4001/api/country");
      setCountries(response.data.notes);
      setIsLoading(false);
      // console.log("THIS IS COUNTRIES:", countries[0]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    fetchData();
  };

  return { notes, isLoading, error, refetch };
};

export default fetchNotes;
