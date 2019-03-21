import React , {Component} from 'react';
import Hello from './Hello.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import { Meteor } from "meteor/meteor";
import NavBar from "./NavBar.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from './containers/HomePage/index';
import NotFound from './containers/NotFound/index';
import Table from './Table.js';
import Tabletwo from './Tabletwo.js';
import Lobby from './Lobby.js';
import TableForTwo from './TableForTwo.js';
// export default class MainLayout extends React.Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <Header />
//           <Switch>
//             <Route exact path="/" component={HomePage} />
//             <Route component={NotFound} />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }



class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
        }
        this.changeGame = this.changeGame.bind(this);
    }

    Load(props) {
        const id = props.game
        const game = props.onGame

        if (id == null) {
            console.log(48)
            return <Lobby onGame={game} />
        }
        else {
            console.log("TableForTwo worked!")
            console.log(id)
            return <TableForTwo onGame={game} id={id} />
        }
    }

    changeGame(change) {
        this.setState({
            game: change
        });
        console.log(this.state.game);

    }

  render(){
        return (
        <div>
          <h1>Meteor chat</h1>

          {             Meteor.user()  ? 

                        <this.Load game={this.state.game} onGame={this.changeGame} />
                        
                        :

                        <Table />}

        </div>
      );
    }
  
};


const AboutComponent = () =>
  <div>
    <h2>About</h2>
    <div>This is the about page</div>
  </div>;

const NotFoundPage = () =>
  <div>
    <h2>Page not found</h2>
    <div>We should call Admin about it 🤷‍♀️</div>
  </div>;




  class App extends Component{
  	



	render(){
		return(
			<Router>
                <div>
                  <NavBar />
                  <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/about" component={AboutComponent} />
                    <Route component={NotFoundPage} />
                  </Switch>
                  <br />
                  <div>Made by Black Jack</div>


                </div>
              </Router>
			
		);
	}

}
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(App)