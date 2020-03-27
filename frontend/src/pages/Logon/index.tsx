import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./style.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

const Logon: FC = () => {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form>
          <h1>Faça seu Logon</h1>
          <input type="text" placeholder="Sua ID" />
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
