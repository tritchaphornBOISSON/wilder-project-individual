import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { createWilderRest, fetchSkillsRest } from "./rest";
import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";
import { SkillType, WilderType } from "../../types";

const CreateWilder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [skills, setSkills] = useState<null | string[]>(null);
  //const [errorMessage, setErrorMessage] = useState("");
  // const [skillsSelected, setSkillsSelected] = useState<
  //   OptionType[] | string[]
  // >();

  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       const fetchedSkills = await fetchSkillsRest();
  //       //setSkills(fetchedSkills);
  //       console.log(fetchedSkills);
  //     } catch (error) {
  //       setErrorMessage(getErrorMessage(error));
  //     }
  //   };
  //   fetchSkills();
  // }, []);

  // type OptionType = {
  //   value: string;
  //   label: string;
  // };
  // const options = skills?.map((skill) => {
  //   return { value: skill.skillName, label: skill.skillName };
  // });

  // const handleSelectSkills = (selectedOption: OptionType[]) => {
  //   let skills = selectedOption.map((skill) => skill.value);
  //   setSkillsSelected(selectedOption);
  //   setSkills(skills);
  //   console.log("skills", skills, "skillSelected", skillsSelected);
  // };

  const submit = async () => {
    try {
      const result = await createWilderRest(
        firstName,
        lastName
        // skillsSelected
      );
      console.log(result);
      toast.success(
        `Wilder ${firstName} ${lastName} has been successfully created`
      );
      setFirstName("");
      setLastName("");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <SectionTitle>Create new Wilder</SectionTitle>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
        <label>
          Firstname <br />
          <input
            required
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Lastname <br />
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <br />
        {/* <Select
          options={options}
          isMulti={true}
          onChange={(option) => handleSelectSkills(option as OptionType[])}
        /> */}
        <button>Go!</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateWilder;
