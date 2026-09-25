import styled from 'styled-components';
import Top from './components/Top';
import './App.css';
import Filter from './components/Filter';
import Food from './components/Food';
import { useEffect, useState } from 'react';

export const BASE_URL = "http://localhost:9000";

const FALLBACK_FOODS = [
  {
    name: "Boiled Egg",
    price: 10,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/egg.png",
    type: "breakfast",
  },
  {
    name: "RAMEN",
    price: 25,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/ramen.png",
    type: "lunch",
  },
  {
    name: "GRILLED CHICKEN",
    price: 45,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/chicken.png",
    type: "dinner",
  },
  {
    name: "CAKE",
    price: 18,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/cake.png",
    type: "breakfast",
  },
  {
    name: "BURGER",
    price: 23,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/burger.png",
    type: "lunch",
  },
  {
    name: "PANCAKE",
    price: 25,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    image: "/images/pancake.png",
    type: "dinner",
  },
];

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  const fetchFoodData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setFilteredData(json);
      setError(null);
    } catch (err) {
      console.warn("Backend server not reached on localhost:9000, using local fallback data:", err.message);
      // Fallback to local data so app continues working seamlessly
      setData(FALLBACK_FOODS);
      setFilteredData(FALLBACK_FOODS);
      setError("Backend server (port 9000) is offline. Using local data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue === "") {
      if (selectedButton === "all") {
        setFilteredData(data);
      } else {
        const filter = data?.filter((food) =>
          food.type.toLowerCase().includes(selectedButton.toLowerCase())
        );
        setFilteredData(filter);
      }
      return;
    }

    const filter = data?.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchValue);
      const matchesType =
        selectedButton === "all" ||
        food.type.toLowerCase() === selectedButton.toLowerCase();
      return matchesSearch && matchesType;
    });
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    setSelectedButton(type);

    if (type === "all") {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
  };

  return (
    <Container>
      {error && (
        <OfflineNotice>
          <span>{error}</span>
          <button onClick={fetchFoodData}>Retry Server</button>
        </OfflineNotice>
      )}
      <Top searchFood={searchFood} />
      <Filter filterFood={filterFood} selectedButton={selectedButton} />
      {loading ? (
        <LoadingState>Loading food items...</LoadingState>
      ) : (
        <Food data={filteredData} />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #363636;
  min-height: 100vh;
  position: relative;
`;

const OfflineNotice = styled.div`
  background: #4a2800;
  border-bottom: 1px solid #ff9800;
  color: #ffcc80;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px 16px;
  font-size: 13px;

  button {
    background: #ff9800;
    color: #1a1a1a;
    border: none;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  min-height: 300px;
`;