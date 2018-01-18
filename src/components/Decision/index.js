import { h, Component } from "preact";
import styles from './decision.css';


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

				<h2 className={styles.subTitle}>Give me some</h2>
				<button onClick={this.props.getNewCute}>Cuteness</button>
				<button>Lolz</button>
			</div>
		);
	}
}

export default Decision;
