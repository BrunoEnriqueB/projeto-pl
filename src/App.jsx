import Graph from './components/Graph';
import './App.css';

function App() {
	function showResult(result) {
		console.log(result);
	}

	return (
		<>
			<Graph
				x={2}
				y={3}
				restrictions={['-1x+1y<=4', '1x+2y<=6', '2x+3y<=9']}
				obj='max'
				returnResult={showResult}
			/>
		</>
	);
}

export default App;
