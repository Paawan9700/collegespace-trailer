import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import EventState from './context/events/EventState';
import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
      <EventState>
        <Router>
          <Navbar />
          <Alert message="this is alert" />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              {/* <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} /> */}
            </Routes>
          </div>
        </Router>
      </EventState>

    </div>
  );
}

export default App;
