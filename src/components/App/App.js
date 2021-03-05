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
			type: "",
			superMode: false
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
		let buffer = [];
		let lastKeyTime = Date.now();
		document.addEventListener("keydown", event => {
			const charList = "abcdefghijklmnopqrstuvwxyz0123456789";
			const key = event.key.toLowerCase();

			// we are only interested in alphanumeric keys
			if (charList.indexOf(key) === -1) return;

			const currentTime = Date.now();

			if (currentTime - lastKeyTime > 1000) {
				buffer = [];
			}

			buffer.push(key);
			lastKeyTime = currentTime;

			if (buffer.join("") === "maria") {
				this.setState({
					superMode: true,
					background: "https://media.giphy.com/media/qKCFeFGiojrAQ/giphy.gif"
				});
			}
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
		getCuteGifs(this.state.superMode).then(images => {
			const rnmd = Math.floor(Math.random() * images.length);
			console.log("images are", images, images[rnmd]);
			this.setState({ selection: images[rnmd].images.original.url });
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

		console.log("what is the state", this.state);

		return (
			<div>
				{this.state.type.length < 1 && !this.state.selection && (
					<Decision
						superMode={this.state.superMode}
						getNewCute={this.getNewCute}
					/>
				)}
				<div className={backgroundClasses}>
					{this.state.background && !this.state.selection && (
						<img
							key={this.state.background}
							className={styles.background}
							src={this.state.background}
						/>
					)}
					{this.state.selection && (
						<img
							key={this.state.selection}
							onClick={this.getNewCute}
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
