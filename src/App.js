import AppRoutes from "./routes";
import './App.css'; // Importa el archivo de estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

function App() {
  return (
   <>
    <div className="app-container" style={{marginBottom:'50px'}}>
      <header>
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" 
          alt="Pokémon Logo" 
          className="pokemon-logo" 
        />
      </header>
      
      {/* Aquí irán las rutas de la aplicación */}
      <AppRoutes />

    
    </div>
      <footer className="app-footer" >
      <p>Pokédex App © 2024 | Juan Carlos Ortiz Tiscareño</p>
    </footer></>
  );
}

export default App;
