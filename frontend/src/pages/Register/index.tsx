import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";
import logoImg from "../../assets/logo.svg";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsApp, setWhatsApp] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [uf, setUf] = useState<string>("");

  const history = useHistory();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp: whatsApp,
      city,
      uf
    };

    const isAnyEmpty = !!Object.entries(data).find(
      ([, val]) => val === "" || !val
    );

    if (isAnyEmpty) return console.error("Formulary is incomplete");
    try {
      const response = await api.post<Service.ResponseOnRegister>(
        "/ongs",
        data
      );

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude as pessoas a
            encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Eu possuo um cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            type="text"
            placeholder="Nome da ONG"
          />
          <input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            type="email"
            placeholder="E-mail"
          />
          <input
            value={whatsApp}
            onChange={({ target: { value } }) => setWhatsApp(value)}
            placeholder="WhatsApp"
          />

          <div className="input-group">
            <input
              value={city}
              onChange={({ target: { value } }) =>
                setCity(
                  value.length <= 1
                    ? value.toLocaleUpperCase()
                    : value[0].toLocaleUpperCase() + value.substr(1)
                )
              }
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={({ target: { value } }) =>
                setUf(
                  (value
                    .substr(0, 2)
                    .replace(/\d/g, "") as string).toLocaleUpperCase()
                )
              }
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
