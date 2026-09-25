import styled from "styled-components";
import { BASE_URL } from "../App";
import { Button } from "./Filter";

const Food = ({ data }) => {
  return (
    <Container>
      <div className="bg_wrapper">
        <img className="image" src="/images/bg.png" alt="background" />
      </div>
      <div className="card">
        {data && data.length > 0 ? (
          data.map((food) => (
            <FoodCard className="foodCard" key={food.name}>
              <div>
                <img
                  className="food_image"
                  src={food.image?.startsWith("http") ? food.image : `${BASE_URL}${food.image}`}
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallbackTried) {
                      e.currentTarget.dataset.fallbackTried = "true";
                      e.currentTarget.src = food.image;
                    }
                  }}
                  alt={food.name}
                />
              </div>

              <div className="food_info">
                <div className="info">
                  <h3>{food.name}</h3>
                  <p>{food.text}</p>
                </div>
                <Button>${food.price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))
        ) : (
          <EmptyMessage>No food items found.</EmptyMessage>
        )}
      </div>
    </Container>
  );
};

export default Food;

const EmptyMessage = styled.div`
  color: white;
  font-size: 20px;
  margin-top: 50px;
`;

const Container = styled.div`
  position: relative;
  background-size: cover;
  min-height: calc(100vh - 210px);

  .bg_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }

  img.image {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 210px);
    object-fit: cover;
  }

  .foodCard {
    padding: 8px;
    display: flex;
    position: relative;
    z-index: 1;
  }

  .card {
    position: relative;
    z-index: 1;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 32px;
    column-gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .food_image {
    width: 133px;
    height: 133px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const FoodCard = styled.div`

  
   color: white;
  width: 340px;
  height: 177px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
    


}

`;
