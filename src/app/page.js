'use client'; //en next.js cuando se utilizan hooks se debe realizar del lado del cliente, por la interactivdad

import { useEffect, useState } from "react";

export default function Home() {
  //utilizamos useState para poder inicializar los estados que usaremos (datos y usuario)
  const [datos, setDatos] = useState(null); 
  const [user, setUser] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user}`);
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]); // user como dependencia, cuando cambie el user se volvera a hacer el fetch

  console.log(datos);//asegurarme que esta vez si me regrese algo

//Estas funciones nos ayudaran a hacer el carrusel y a cambiar el usuario que se esta mostrando
  const handleIncrement = () => {
    setUser(prevUser => (prevUser === 10 ? 1 : prevUser + 1));
  };

  const handleDecrement = () => {
    setUser(prevUser => (prevUser === 1 ? 10 : prevUser - 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-black p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Tabla de Usuarios</h1>
        {datos ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{datos.name}</h2>
            <h3 className="text-lg">{datos.username}</h3>
            <p className="text-gray-600">{datos.email}</p>
            <a className="text-blue-600">{datos.website}</a>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handleDecrement} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            -
          </button>
          <article className="text-lg font-semibold">{user}</article>
          <button 
            onClick={handleIncrement} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
