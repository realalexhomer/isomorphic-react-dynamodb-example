var React = require('react'),
	ReactDOM = require('react-dom'),
	RouterMixin = require('react-mini-router').RouterMixin,
	FetchMixin = require('../mixins/fetch.jsx'),
	Tournament = require('./tournament.jsx'),
	db = require('../../../backend/db');

var App = React.createClass({
	mixins: [RouterMixin, FetchMixin],

	routes: {
		'/' : 'index',
		'/tournament/:id' : 'tournament'
	},

	componentWillMount: function(){
	},

	componentDidMount: function(){
		console.log('comp mounted (App)');
	},
	render: function() {
		this.data = this.fetchServerData();
	    return this.renderCurrentRoute();
	},
	index: function(path) {
		return ( <div>
				    {this.data.Items[0].startTime.N}
				    <a href={"/tournament/5"}>tournament 5</a>
			    </div>)
	},

	tournament: function(id){
		return (<div>The id u entered was {id}</div>)
	}
});

module.exports = App;