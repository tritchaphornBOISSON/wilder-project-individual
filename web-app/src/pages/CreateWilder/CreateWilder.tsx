import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createWilder } from "./rest";
import { SectionTitle } from "../../styles/base-styles";
import { getErrorMessage } from "../../utils";

const CreateWilder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submit = async () => {
    try {
      await createWilder(firstName, lastName);
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès`);
      setFirstName("");
      setLastName("");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <>
      <SectionTitle>Ajouter un nouveau Wilder</SectionTitle>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
        <label>
          Prénom <br />
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
          Nom <br />
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
        <button>Valider</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateWilder;
