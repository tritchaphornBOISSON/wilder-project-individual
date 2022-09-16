import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import Loader from "../../components/Loader/Loader";
import { CREATE_WILDER_PATH } from "../paths";
import { fetchWildersRest } from "./rest";



const Home = () => {
    const [wilders, setWilders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchWilders = async () => {
            try {
                const fetchedWilders = await fetchWildersRest();
                setWilders(fetchedWilders);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchWilders();
    }, []);

    const renderMainContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (errorMessage) {
            return errorMessage;
        }
        if (!wilders.length) {
            return 'Aucun wilder à afficher';
        }
        return (
            <CardRow>
                {wilders?.map((wilder) => (
                    <Wilder
                        key={wilder.id}
                        firstName={wilder.firstName}
                        lastName={wilder.lastName}
                        skills={wilder.skills}
                        isTrainer={wilder.isTrainer}
                    />
                ))}
            </CardRow>
        );
    }
    return (
        <>
            <SectionTitle>Wilders</SectionTitle>
            <Link to={CREATE_WILDER_PATH}>Ajouter un nouveau Wilder</Link>
            {renderMainContent()}
        </>
    );
};

export default Home;