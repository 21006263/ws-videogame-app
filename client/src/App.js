import './App.css';
//import { /*Switch*/ Route  } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './components/A_Landing';
import Home from './components/B_Home';
import Detail from './components/Details/index';
import CreateVideogame from './components/D_AddGames/index';

function App() {
  return (
    <Router>
        {/* <Switch> */}
     
        
        <Route exact path="/" component={Landing} />
       <Route exact path="/Home" component={Home} />
      
       <Route
        exact
        path="/videogames/:id"
        component={({ match }) => <Detail id={match.params.id} />}
      />
       <Route exact path="/create" component={CreateVideogame} />
   
      </Router>
  );
}

export default App;
