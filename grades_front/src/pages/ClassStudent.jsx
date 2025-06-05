// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../css/ClassStudent.css";

// function ClassStudents() {
//   const { id } = useParams();
//   const [students, setStudents] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(function () {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("Non autorisé.");
//       setLoading(false);
//       return;
//     }

//     axios.get("http://localhost:8000/api/classes/" + id + "/students", {
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     })
//     .then(function (response) {
//       setStudents(response.data);
//       setLoading(false);
//     })
//     .catch(function () {
//       setError("Erreur lors du chargement des étudiants.");
//       setLoading(false);
//     });
//   }, [id]);

//   function handleDelete(studentId) {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     if (!window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;

//     axios.delete("http://localhost:8000/api/users/" + studentId, {
//       headers: { Authorization: "Bearer " + token }
//     })
//     .then(function () {
//       setStudents(function (prevStudents) {
//         return prevStudents.filter(function (student) {
//           return student.id !== studentId;
//         });
//       });
//     })
//     .catch(function () {
//       alert("Échec de la suppression.");
//     });
//   }

//   if (loading) {
//     return (
//       <div className="class-students-container">
//         <p className="loading-message">Chargement...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="class-students-container">
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="class-students-container">
//       <h2>Étudiants de la classe {id}</h2>

//       {students.length === 0 ? (
//         <p className="empty-message">Aucun étudiant trouvé.</p>
//       ) : (
//         <ul className="students-list">
//           {students.map(function (student) {
//             return (
//               <li key={student.id} className="student-item">
//                 <div>
//                   <strong>Nom:</strong> { student.user.name }<br />
//                   <strong>Email:</strong> { student.user.email}
//                 </div>
//                 <button
//                   className="delete-btn"
//                   onClick={function () {
//                     handleDelete(student.id);
//                   }}
//                 >
//                   Supprimer
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ClassStudents;


// ClassStudents.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ClassStudent.css";

function ClassStudents() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Non autorisé.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8000/api/classes/${id}/students`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des étudiants.");
        setLoading(false);
      });
  }, [id]);

  function handleDelete(studentId, userId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;

    axios
      .delete(`http://localhost:8000/api/users/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
      })
      .catch(() => {
        alert("Échec de la suppression.");
      });
  }

  if (loading) {
    return (
      <div className="class-students-container">
        <p className="loading-message">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="class-students-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="class-students-container">
      <h2>Étudiants de la classe {id}</h2>

      {students.length === 0 ? (
        <p className="empty-message">Aucun étudiant trouvé.</p>
      ) : (
        <ul className="students-list">
          {students.map((student) => (
            <li key={student.id} className="student-item">
              <div>
                <strong>Nom:</strong> {student.user.name}
                <br />
                <strong>Email:</strong> {student.user.email}
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(student.id, student.user.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClassStudents;
