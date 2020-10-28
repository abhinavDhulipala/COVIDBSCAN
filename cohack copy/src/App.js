import React, {useState} from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Quiz from './index'
import MainPage from "./components/MainPage";



function App() {
    const [inQuiz, setQuiz] = useState(false);

    function renderLoginButton() {
        if (inQuiz) {
            return <Link to="/"  className="text-muted">Logout</Link>
        }
        return <Link to="/participate"  className="text-muted">Login & Participate!</Link>
    }


  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">CoviDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link>About us</Nav.Link>
                  <Nav.Link>Login</Nav.Link>
              </Nav>
              <Nav>
                  <Nav.Link eventKey={2}>
                    <Button variant="light" onClick={() => setQuiz(prevState => !prevState)}>
                        {renderLoginButton()}
                    </Button>);</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
        <Switch>
            <Route path="/participate"><Quiz/></Route>
            <Route path="/"><MainPage/></Route>
        </Switch>
    </Router>
  );
}

export default App;
