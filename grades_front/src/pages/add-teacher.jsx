import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/add-teacher.css";

function AddTeacher() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "enseignant"
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(function (prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    axios.post("http://localhost:8000/api/users", form, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function () {
      setSuccess("Enseignant ajouté avec succès !");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "enseignant"
      });

      setTimeout(function () {
        navigate("/admin");
      }, 2000);
    })
    .catch(function (error) {
      setError("Erreur lors de l'ajout de l'enseignant.");
    });
  }

  return (
    <div className="add-teacher-form">
      <h2>Ajouter un enseignant</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddTeacher;
