import React, { Component } from 'react';
import DatatableComponent from './Datatable.js'
import './App.css';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


const List = ({ items}) => (
  <ul>
    {
       Object.keys(items).map((e, i) => 
        (<li><h4>{e}: </h4>{items[e]}</li>))
    }
  </ul>
);


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {showModal: false, description: {}}
  }

  showDetails(data) {
    this.setState({ description : data });
    this.setState({ showModal : true });
  }

  
	close(event) {
    // close modal
    event.preventDefault();
    this.setState({ showModal : false });
  }

  selectCategory(event) {
     this.refs.datatable.onCategoryChanged(event.target.value);
  }
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Star Wars</h1>
          <select onChange={this.selectCategory.bind(this)}>
            <option value="people">People</option>
            <option value="planets">Planets</option>
            <option value="films">Films</option>
            <option value="species">Species</option>
            <option value="vehicles">Vehicles</option>
            <option value="starships">Starships</option>
        </select>
        </header>
        <DatatableComponent className='datatable' name='datatable' ref="datatable" onCellClicked={this.showDetails.bind(this)}></DatatableComponent>
        <Modal className='modal' show = {this.state.showModal}>
            <Modal.Header>
                <Modal.Title> Description </Modal.Title>
                <Button className='closeBtn' onClick={this.close.bind(this)}>Close</Button>
            </Modal.Header>
       
            <Modal.Body>
            <List items={this.state.description} />
	        </Modal.Body>
	    </Modal>  
      </div>
    );
  }
}

export default App



