import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./style.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

const NewIncident: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId") as string;

  const history = useHistory();

  async function handleNewIncident(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (error) {
      console.error("Error on register new incident");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
