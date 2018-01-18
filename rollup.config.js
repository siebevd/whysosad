import babel from 'rollup-plugin-babel'; // transpile es6
import eslint from 'rollup-plugin-eslint'; // Lint the code when we build
import resolve from 'rollup-plugin-node-resolve'; // Load third party modules from node_modules
import replace from 'rollup-plugin-replace'; // used to make sure we can use ENV
import commonjs from 'rollup-plugin-commonjs'; // Make it possible to require commonjs files
import uglify from 'rollup-plugin-uglify'; // Uglify/Minify the code
import postcss from 'rollup-plugin-postcss'; // Add in postcss
import serve from 'rollup-plugin-serve'; // Serve the files
import livereload from 'rollup-plugin-livereload'; // livereload the files


export default {
	input: 'src/main.js',
	output: {
		file: 'build/js/main.min.js',
		format: 'iife',
		name: 'whySoSad'
	},
	plugins: [
		postcss({
			extensions: [ '.css' ],
			modules: true
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		commonjs(),
		eslint({
			exclude: [
				'node_modules/**',
				'src/**/**.css'
			]
		}),
		replace({
			exclude: 'node_modules/**',
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		(process.env.NODE_ENV !== 'production' && serve()),
		(process.env.NODE_ENV !== 'production' && livereload('src')),
		(process.env.NODE_ENV === 'production' && uglify()), // Only use uglify when in production
	]
};
