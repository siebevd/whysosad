import { h, Component } from "preact";
import {
	getRandomGif,
	getSadGifs,
	getCuteGifs
} from '../../utils/giphyApi';
import Decision from "../Decision";
import styles from './app.css';

class App extends Component {

	/**
	 * Lifecycle
	 */

	constructor(props) {
		super(props);

		this.state = {
			type: ""
		};
	}


	componentWillMount(){
		// getRandomGif()
		// 	.then((background)=>{
		// 		console.log('set this src', background);
		// 		this.setState({ background });
		// 	});

		getSadGifs()
			.then((images)=>{
				this.setState({ background: images[0].images.original.url });
			});

	}

	/**
	 * Event Handlers
	 */

	getNewCute = () => {
		getCuteGifs()
			.then((images)=>{
				this.setState({ background: images[0].images.original.url });
			});
	}

	/**
	 * Render
	 */

	render() {
		return (
			<div>
				{this.state.type.length < 1 && <Decision getNewCute={this.getNewCute} />}
				<div className={styles.backgroundContainer}>
					<img key={this.state.background} className={styles.background} src={this.state.background} />
				</div>
			</div>
		);
	}
}

export default App;
