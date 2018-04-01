import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';
import {capitalize} from './Utils.js';
import axios from 'axios';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
 
 
class DatatableComponent extends Component {

  constructor(props) {
     super(props)

     this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
     this.handleNextPageClick = this.handleNextPageClick.bind(this);
    
     // state - store datatable properties
     this.state = { nColumns: 5, 
      columns: [], 
      data: [],
      rowsPerPage: [],
      title: '',
      page: 1,
      rowSize: 10,
      count: 100,
      category: 'people'
    }
   }

  componentDidMount(){
    this.browseAPI(this.state.page, this.state.category);
  }

  // on category changed
  onCategoryChanged(value) {
    this.setState({page: 1, category: value, columns: []})
    this.browseAPI(1, value)
  }

  // on cell clicked
  handleCellClick = (y, x, row) => {
    this.props.onCellClicked(this.state.data[y]);
  }

  // on previous page clicked
  handlePreviousPageClick() {
    var currentPage = this.state.page - 1;
    this.setState({
      page: currentPage,
    });
    this.browseAPI(currentPage, this.state.category);
  }

  // on next page clicked
  handleNextPageClick() {
    var currentPage = this.state.page + 1
    this.setState({
      page: currentPage,
    });
    this.browseAPI(currentPage, this.state.category);
  }

  // browse star-wars API
  browseAPI (currentPage, category) {
    
    axios.get('https://swapi.co/api/' + category + '?page=' + currentPage).then(response => 
    {
      response = JSON.parse(JSON.stringify(response))
      var results = response.data.results;
      this.setState({data: results});
      this.setState({count: response.data.count})

      if (results.length > 0) {
        for (var key in results[0]) {
          if (this.state.columns.length < this.state.nColumns) {
            this.setState({columns: this.state.columns.concat(
              {
                key: key,
                label: capitalize(key)
              })
              })
            }
          }
        }
      })
  }
 
  render() {
    return (
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <DataTables
          title={this.props.title}
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={this.state.columns}
          data={this.state.data}
          showCheckboxes={false}
          onCellClick={this.handleCellClick}
          onCellDoubleClick={this.handleCellDoubleClick}
          onFilterValueChange={this.handleFilterValueChange}
          onSortOrderChange={this.handleSortOrderChange}
          onNextPageClick={this.handleNextPageClick}
          onPreviousPageClick={this.handlePreviousPageClick} 
          rowSize={this.state.rowSize}
          page={this.state.page}
          count={this.state.count}
      />
       </MuiThemeProvider>
    );
  }
}

export default DatatableComponent