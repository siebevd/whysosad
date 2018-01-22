import { h, render } from "preact";
import App from "./components/App/App";
import "./styling/reset.css";
import "./styling/base.css";

// NOTE:
// since this is so simplistic,
// we probably don't need to implement redux

// render an instance of Clock into <body>:
render(<App />, document.body);
