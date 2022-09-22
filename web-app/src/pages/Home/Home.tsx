import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import Loader from "../../components/Loader";
import { CREATE_WILDER_PATH } from "../paths";
import { fetchWildersRest } from "./rest";
import { WilderType } from "../../types";
import { getErrorMessage } from "../../utils";

const Home = () => {
  const [wilders, setWilders] = useState<null | WilderType[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const fetchedWilders = await fetchWildersRest();
        setWilders(fetchedWilders);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchWilders();
  }, [wilders]);

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (errorMessage) {
      return errorMessage;
    }
    if (!wilders?.length) {
      return "Aucun wilder à afficher";
    }
    return (
      <CardRow>
        {wilders?.map((wilder) => (
          <Wilder
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.firstName}
            lastName={wilder.lastName}
            skills={wilder.skills}
            isTrainer={wilder.isTrainer}
            school={wilder.school}
          />
        ))}
      </CardRow>
    );
  };
  return (
    <>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={CREATE_WILDER_PATH}>Ajouter un nouveau Wilder</Link>
      {renderMainContent()}
    </>
  );
};

export default Home;
