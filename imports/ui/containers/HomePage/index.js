import React from 'react';
import Game from '../../containers/Game/index';

//TODO Si el usuario no está registrado NO cargar GameLoad CHECK IF Meteor.userId=Null
function Home() {  
  return (
  	
    <div>
      <Game />
    </div>
  );
}

export default Home;