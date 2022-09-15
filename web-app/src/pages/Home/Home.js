import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const WILDERS = [
    {
        id: "aaaa",
        firstName: "Laurent",
        lastName: "Wilder",
        skills: [
            {
                id: "skill-1",
                skillName: "PHP",
            },
        ],
    },
    {
        id: "bbbb",
        firstName: "Jeanne",
        lastName: "Wild",
        skills: [
            {
                id: "skill-2",
                skillName: "JavaScript",
            },
        ],
    },
    {
        id: "cccc",
        firstName: "Nicolas",
        lastName: "W.",
        skills: [
            {
                id: "skill-1",
                skillName: "PHP",
            },
            {
                id: "skill-2",
                skillName: "JavaScript",
            },
        ],
    },
    {
        id: "dddd",
        firstName: "Arnaud",
        lastName: "Renaud",
        isTrainer: true,
        skills: [
            {
                id: "skill-2",
                skillName: "JavaScript",
            },
        ],
    },
];

const Home = () => {
    const [wilders, setWilders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWilders = async () => {
            const response = await fetch("/wilders");
            const fetchedWilders = await response.json();
            setWilders(fetchedWilders);
            setIsLoading(false);
        }
        fetchWilders();
    }, []);
    return (
        <>
            <SectionTitle>Wilders</SectionTitle>
            {isLoading
                ?
                <Loader />
                :
                (<CardRow>
                    {wilders?.map((wilder) => (
                        <Wilder
                            key={wilder.id}
                            firstName={wilder.firstName}
                            lastName={wilder.lastName}
                            skills={wilder.skills}
                            isTrainer={wilder.isTrainer}
                        />
                    ))}
                </CardRow>)}
        </>
    );
};

export default Home;