import "./styles.css";
import { Game } from "./components";

// https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
// github.com/harman052/react-tutorial-solutions/

export default function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}
