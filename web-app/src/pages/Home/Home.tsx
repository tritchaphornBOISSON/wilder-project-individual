import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import Loader from "../../components/Loader";
import { CREATE_WILDER_PATH } from "../paths";
import { GetWildersQuery } from "../../gql/graphql";

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstName
      lastName
      isTrainer
      school {
        id
        schoolName
      }
      skills {
        id
        skillName
      }
    }
  }
`;
const Home = () => {
  const { data, loading, error, refetch } = useQuery<GetWildersQuery>(
    GET_WILDERS,
    { fetchPolicy: "cache-and-network" }
  );

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error;
    }
    if (!data?.wilders?.length) {
      return "Aucun wilder à afficher";
    }
    return (
      <CardRow>
        {data.wilders.map((wilder) => (
          <Wilder
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.firstName}
            lastName={wilder.lastName}
            skills={wilder.skills}
            isTrainer={wilder.isTrainer!}
            school={wilder.school!}
            onDelete={refetch}
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
