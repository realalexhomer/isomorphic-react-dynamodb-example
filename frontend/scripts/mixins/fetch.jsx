var React = require('react'),
	ReactDOM = require('react-dom');

var FetchMixin = {
	fetchServerData: function(params){
		return this.props.getData();

		// this breaks the front end. Need to add the initial data on the window.
	}
}


module.exports = FetchMixin;


// render:
	// if data exists, use data (set state);
	// if data doesn't exist, dont use data (dont set state)


// didMount:
	// if data exists, clear data and dont set state
	// if data doesnt exist, get data and set state
