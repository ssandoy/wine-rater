import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { imageSources } from "images";
import type WineProduct from "models/product";
import type React from "react";
import { useState } from "react";
import {
  fetchWineByRecommendedFood,
  type RecommendedFood,
} from "../../api/api";
import styles from "../../components/lookup/lookup.module.css";
import WineDetailsComponent from "../../components/lookup/wine-details/WineDetailsComponent";
import Spinner from "../../components/spinner/Spinner";
import SearchIcon from "../../icons/SearchIcon";

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
  const [requestError, setRequestError] = useState<string | null>(null);

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
    setIsLoading(true);
    setRequestError(null);

    try {
      const wines = await fetchWineByRecommendedFood(
        getRecommendedFood(event.currentTarget.value)
      );
      if (wines.length === 0) {
        setRequestError("Fant ingen viner som passer. Prøv et annet matvalg.");
        return;
      }

      setWineProduct(wines[Math.floor(Math.random() * wines.length)]);
    } catch (error) {
      console.error("Failed to fetch a wine recommendation", error);
      setRequestError(
        error instanceof Error
          ? error.message
          : "Kunne ikke hente en vinanbefaling. Prøv igjen."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsLoading(false);
    setRequestError(null);
    setWineProduct(null);
  };

  return (
    <div className={styles["lookup-container"]}>
      <h1 className="page-title ">Finn meg en vin!</h1>
      <div className={styles["lookup-details-container"]}>
        {!wineProduct && (
          <FormContainer>
            <p>Velg hvilken type mat du skal spise</p>
            <ButtonContainer>
              <button
                type="button"
                value="okse"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.bull} className="image" alt="okse" />
              </button>
              <button
                type="button"
                value="fugl"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img
                  src={imageSources.chicken}
                  className="image"
                  alt="kylling"
                />
              </button>
              <button
                type="button"
                value="apetirif"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img
                  src={imageSources.apetirif}
                  className="image"
                  alt="pasta"
                />
              </button>
              <button
                type="button"
                value="skalldyr"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.seafood} className="image" alt="pizza" />
              </button>
              <button
                type="button"
                value="ost"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.cheese} className="image" alt="ost" />
              </button>
              <button
                type="button"
                value="svin"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.pig} className="image" alt="svin" />
              </button>
              <button
                type="button"
                value="vilt"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.deer} className="image" alt="vilt" />
              </button>
              <button
                type="button"
                value="fisk"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.fish} className="image" alt="fisk" />
              </button>
              <button
                type="button"
                value="kake"
                className={buttonCss}
                onClick={handleSelectedFood}
              >
                <img src={imageSources.cake} className="image" alt="kake" />
              </button>
            </ButtonContainer>
            {isLoading && (
              <div style={{ display: "flex" }}>
                <span className={loadingLabelCss}>Henter en vin</span>
                <Spinner dark={true} />
              </div>
            )}
            {requestError && (
              <p className={styles["request-error"]} role="alert">
                {requestError}
              </p>
            )}
          </FormContainer>
        )}
        {wineProduct && (
          <div className={styles["wine-details-component"]}>
            <WineDetailsComponent wineProduct={wineProduct} />{" "}
            <button
              type="button"
              className="wine-search-form__button"
              onClick={handleReset}
            >
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
