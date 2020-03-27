import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";

import "./style.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

const Logon: FC = () => {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post<Service.ResponseOnLogin>("/sessions", {
        id
      });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (error) {
      console.error("Login failed, try again.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            value={id}
            onChange={({ target: { value } }) => setId(value)}
            type="text"
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Logon;
