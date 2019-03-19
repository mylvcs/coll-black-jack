import React from 'react';



/* We need cards, we got the images at the 
img/ directory and carefully named them the f value on the deck array */

var Card = React.createClass({

    render: function() {
        var bgUrl = (this.props.hidden)
            ? 'url(img/hidden.png)'
            : 'url(img/' + this.props.face + '.png)';
        /* in react we pass the css properties as an object with camelCase variables referring to the respective CSS variables */
        var cardStyle = {backgroundImage: bgUrl};

        return (
            <div className='card' style={cardStyle}/>
        );
    }

});