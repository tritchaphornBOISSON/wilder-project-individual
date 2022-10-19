import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";
import {
  CreateWilderMutation,
  CreateWilderMutationVariables,
} from "../../gql/graphql";
import Loader from "../../components/Loader";

const CREATE_WILDER = gql`
  mutation CreateWilder($firstName: String!, $lastName: String!) {
    createWilder(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const CreateWilder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [createWilder, { loading }] = useMutation<
    CreateWilderMutation,
    CreateWilderMutationVariables
  >(CREATE_WILDER);

  const submit = async () => {
    try {
      await createWilder({ variables: { firstName, lastName } });
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
        <button disabled={loading}>{loading ? <Loader /> : "Go!"}</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateWilder;
