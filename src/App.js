import React, { Component } from 'react'

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: '',
      title: '' 
    };
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value})
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users }));
  }
  render(){
    const { monsters, searchField } = this.state;
    const filteredMonsters1 = monsters.filter( monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    const filteredMonsters2 = monsters.filter( monster => monster.email.toLowerCase().includes(searchField.toLowerCase()));
    const filteredMonsters = filteredMonsters1.concat(filteredMonsters2.filter((item) => filteredMonsters1.indexOf(item) < 0))

    return (
      <div className='App'>
        <h1> Monsters Rolodex</h1>
        <SearchBox 
          placeholder = 'search monsters'
          handleChange ={this.onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;