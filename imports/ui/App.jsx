import React , {Component} from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import { Meteor } from "meteor/meteor";
import Game from "./Game.jsx"; 


import HomePage from './containers/HomePage/index';
import NotFound from './containers/NotFound/index';
import Table from './Table.js';

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


 export default class App extends Component{
	render(){
		return(
			<div>Black Jack HomePage
				<div>Hello </div>
				<AccountsUIWrapper/>
				{
					Meteor.user() ? 
					<div>
						<h1> testing </h1>
						

					</div>
					:
					<Table />
					

				}
				
			</div>
			
		);
	}

}