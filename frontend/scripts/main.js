var React = require('react'),
    ReactDOM = require('react-dom'),
    App = React.createFactory(require('./components/app.jsx'));


if (!window.ClientMounted){
	ReactDOM.render(new App({
							history: true
							}), document.getElementById('app')
					);
	window.ClientMounted === true;
}
