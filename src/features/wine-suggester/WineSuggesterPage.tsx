import React, { useState } from "react";
import WineProduct from "models/product";
import SearchIcon from "../../icons/SearchIcon";
import WineDetailsComponent from "../../components/lookup/wine-details/WineDetailsComponent";
import {
  fetchWineByRecommendedFood,
  MAX_RECOMMENDED_RESULTS,
  RecommendedFood
} from "../../api/api";
import * as images from "images";
import Spinner from "../../components/spinner/Spinner";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const loadingLabelCss = css`
  font-size: 22px;
  color: #023950;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const buttonCss = css`
  //border: 1px solid black;
`;

const WineSuggesterPage: React.FC = () => {
  const [wineProduct, setWineProduct] = useState<WineProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendedFood = (rec: string): RecommendedFood => {
    switch (rec) {
      case "apetirif":
        return { foodId: "A", foodDescription: "Aperitiff" };
      case "skalldyr":
        return { foodId: "B", foodDescription: "Skalldyr" };
      case "fugl":
        return { foodId: "G", foodDescription: "Småvilt og fugl" };
      case "bull":
        return { foodId: "E", foodDescription: "Storfe" };
      case "ost":
        return { foodId: "L", foodDescription: "Ost" };
      case "svin":
        return { foodId: "Q", foodDescription: "Svinekjøtt" };
      case "vilt":
        return { foodId: "H", foodDescription: "Storvilt" };
      case "kake":
        return { foodId: "N", foodDescription: "Dessert, kake, frukt" };
      case "fisk":
        return { foodId: "C", foodDescription: "Fisk" };
      default:
        return { foodId: "E", foodDescription: "Storfe" };
    }
  };

  const handleSelectedFood = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // todo hook with loadingState and isFetching so that we can render a spinner
    console.log(event.currentTarget.value);
    setIsLoading(true);
    const wineWithRecommendedFoodResponse = await fetchWineByRecommendedFood(
      getRecommendedFood(event.currentTarget.value)
    );
    setWineProduct(
      wineWithRecommendedFoodResponse[
        Math.floor(Math.random() * MAX_RECOMMENDED_RESULTS)
      ]
    );
    setIsLoading(false);
  };

  const handleReset = () => {
    setIsLoading(false);
    setWineProduct(null);
  };

  return (
    <div className="lookup-container">
      <h1 className="page-title ">Finn meg en vin!</h1>
      <div className="lookup-details-container">
        {!wineProduct && (
          <FormContainer>
            <p>Velg hvilken type mat du skal spise</p>
            <ButtonContainer>
              <button
                value="okse"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["bull"]} className="image" alt="okse" />
              </button>
              <button
                value="fugl"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["chicken"]} className="image" alt="kylling" />
              </button>
              <button
                value="apetirif"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["apetirif"]} className="image" alt="pasta" />
              </button>
              <button
                value="skalldyr"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["seafood"]} className="image" alt="pizza" />
              </button>
              <button
                value="ost"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["cheese"]} className="image" alt="ost" />
              </button>
              <button
                value="svin"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["pig"]} className="image" alt="svin" />
              </button>
              <button
                value="vilt"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["deer"]} className="image" alt="vilt" />
              </button>
              <button
                value="fisk"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["fish"]} className="image" alt="fisk" />
              </button>
              <button
                value="kake"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={images["cake"]} className="image" alt="kake" />
              </button>
            </ButtonContainer>
            {isLoading && (
              <div style={{ display: "flex" }}>
                <span className={loadingLabelCss}>Henter en vin</span>
                <Spinner dark={true} />
              </div>
            )}
          </FormContainer>
        )}
        {wineProduct && (
          <div className="wine-details-component">
            <WineDetailsComponent wineProduct={wineProduct} />{" "}
            <button className="wine-search-form__button" onClick={handleReset}>
              <SearchIcon />
              Søk på nytt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WineSuggesterPage;
