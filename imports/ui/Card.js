
import React , {Component} from 'react';
export default class Card extends React.Component{


	render(){
		var bgUrl = (this.props.hidden)
            ? 'hidden.png'
            : this.props.face + '.png';
        //console.log(bgUrl);
        var cardStyle = {backgroundImage: bgUrl};

        return (
        	<div>
        		<div>
        			<img src = {"/img/" + bgUrl}/>
        		</div>
        		
        		<div className='card' style={cardStyle}/>
        	</div>
        );
	}

}
