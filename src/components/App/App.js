import { h, Component } from "preact";
import { getRandomGif, getSadGifs, getCuteGifs } from "../../utils/giphyApi";
import Decision from "../Decision/Decision.js";
import classNamesBinder from "classNames/bind";
import styles from "./App.css";

const classNames = classNamesBinder.bind(styles);

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

	componentWillMount() {
		// getRandomGif()
		// 	.then((background)=>{
		// 		console.log('set this src', background);
		// 		this.setState({ background });
		// 	});

		getSadGifs().then(images => {
			this.setState({ background: images[0].images.original.url });
		});

		// Register Handlers
		document.body.addEventListener("keydown", this.keyDownHandler);
	}

	componentWillUnmount() {
		// Unregister Handlers
		document.body.addEventListener("keydown", this.keyDownHandler);
	}

	/**
	 * Event Handlers
	 */

	getNewCute = () => {
		getCuteGifs().then(images => {
			this.setState({ selection: images[0].images.original.url });
		});
	};

	keyDownHandler = ev => {
		if (ev.which === 32) {
			// Space Bar
			if (this.state.selection) {
				// TODO: this needs to be done better,
				// so it will see which state was selected
				this.getNewCute();
			}
		}
	};

	/**
	 * Render
	 */

	render() {
		const backgroundClasses = classNames({
			backgroundContainer: true,
			active: this.state.selection
		});

		return (
			<div>
				{this.state.type.length < 1 &&
					!this.state.selection && <Decision getNewCute={this.getNewCute} />}
				<div className={backgroundClasses}>
					{this.state.background &&
						!this.state.selection && (
							<img
								key={this.state.background}
								className={styles.background}
								src={this.state.background}
							/>
						)}
					{this.state.selection && (
						<img
							key={this.state.selection}
							className={styles.background}
							src={this.state.selection}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default App;
