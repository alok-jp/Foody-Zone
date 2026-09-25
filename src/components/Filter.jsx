import styled, { keyframes } from "styled-components"

const Filter = ({ filterFood, selectedButton = "all" }) => {
  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  return (
    <Container>
      {filterBtns.map((btn) => (
        <Button
          key={btn.type}
          $isSelected={selectedButton === btn.type}
          onClick={() => filterFood(btn.type)}
        >
          {btn.name}
        </Button>
      ))}
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 30px;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background-color: ${({ $isSelected }) => ($isSelected ? "#b71c1c" : "#ff4343")};
  outline: 1px solid ${({ $isSelected }) => ($isSelected ? "#ffffff" : "transparent")};
  padding: 6px 20px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e73333;
  }
`;

const pop = keyframes`


`