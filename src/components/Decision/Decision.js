import { h, Component } from "preact";
import styles from "./Decision.css";

class Decision extends Component {
	/**
	 * Lifecycle
	 */

	constructor(props) {
		super(props);
	}

	/**
	 * Render
	 */

	render() {
		return (
			<div className={styles.container}>
				<img src="/assets/whysosad.png" />
				<img src="/assets/question.png" />
				<h2 className={styles.subTitle}>Give me some</h2>
				<div className={styles.buttonContainer}>
					<button className={styles.button} onClick={this.props.getNewCute}>
						Cuteness
					</button>
					<button className={styles.button}>Lolz</button>
				</div>
			</div>
		);
	}
}

export default Decision;
