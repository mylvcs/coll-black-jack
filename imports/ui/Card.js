
import React , {Component} from 'react';
export default class Card extends React.Component{


	render(){
		var bgUrl = (this.props.hidden)
            ? 'url(./img/hidden.png)'
            : 'url(./img/' + this.props.face + '.png)';
         
        var cardStyle = {backgroundImage: bgUrl};

        return (
        	<div>
        		<h1>Card Component</h1>
        	</div>
        );
	}



}
