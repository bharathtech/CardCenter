import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory , IndexRoute  } from 'react-router'

//App component used by Router
class App extends React.Component {
	
	render() {
	  return (
	     <div>
	        <h2>Search For a Property (eg. quotationStart, quotationEnd)</h2>
				
	        {this.props.children}
	     </div>
	  )
	}
}

export default App;

//SearchBox Component, used by home & search results

class SearchBox extends React.Component{

	doSearch(){
		var query=this.refs.searchInput.value;
		this.refs.searchInput.value="";
		window.location.href = "#/search/"+query;
	}

	render(){
	    return( 
			<div>
				<input type="text" ref="searchInput" placeholder="Search Locale property" />
				<button onClick={this.doSearch.bind(this)}>Search</button>
			</div>
		)
	}
}

export default SearchBox;

//Search Page Component

class Home extends React.Component {
	render() {
	  return (
			<div>
			<SearchBox/>
			</div>
	  )
	}
}

export default Home;

//Search Result page Component

class Search extends React.Component {


	constructor() {
		super();

		this.state = {
			searchResults: []
		};
	}

	loadData(property){
		$.ajax({
			url: '/api/property?q='+ property ,
			dataType: 'json',
			success: function(data) {
			this.setState({searchResults: data});
			}.bind(this),
			error: function(xhr, status, err) {
	        console.error(err.toString());
	      }.bind(this)
		});	
	}

	componentWillMount(){
		this.loadData(this.props.params.property);
	}

	componentWillReceiveProps(nextProps){
		this.loadData(nextProps.params.property);
	}

	render() {
		var results = "";

		for(var idx in this.state.searchResults){
			results+="<tr><td>"+ this.state.searchResults[idx].lang + "</td><td>"+ this.state.searchResults[idx].value + "</td></tr>";
		}

		var renderTable = function(){
			return {__html: results};
		}

	  return (
	     <div>
	     <SearchBox/>
	       <h3>Search Results for <strong>"{this.props.params.property}"</strong></h3>

	       <table>
	       	<thead>
	       		<tr>
	       			<th>Locale</th>
	       			<th>Value</th>
	       		</tr>
	       	</thead>

	       	<tbody dangerouslySetInnerHTML={renderTable()}>
	       	</tbody>
	       </table>
	     </div>
	  )
	}
}

export default Search;

//React SPA Routes

ReactDOM.render((
   <Router history={hashHistory}>
      <Route path = "/" component = {App}>
         	<IndexRoute component = {Home} />
     		<Route path = "home" component = {Home} />
       		<Route path="/search/:property" component={Search}/>
         	<Route path="*" component={Home}/>
      </Route>
   </Router>
	
), document.getElementById('app'))