import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Route as ArticleRoutes } from './utilities/Routes';
import Heading from './components/Heading';
import Dashboard from './pages/Dashboard';
import EditArticle from './pages/EditArticle';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Store from './store';


function App() {
  return (
    <div className="App">
      <h2>Article Management System</h2>
      <Store>

      <Routes>
        <Route path = '/' element = {<Heading/>} />
        <Route path = {ArticleRoutes.dashboard} element = {<Dashboard/>} />
        <Route path = {`${ArticleRoutes.editArticle}/:id`} element = {<EditArticle/>} />
        <Route path = {ArticleRoutes.addNewItem} element = {<EditArticle/>} />
        <Route path = {ArticleRoutes.login} element = {<Login/>} />
        <Route path = {ArticleRoutes.signup} element = {<Signup/>} />
      </Routes>
      </Store>
    </div>
  );
}

export default App;
