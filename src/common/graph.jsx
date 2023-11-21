import Geogebra from 'react-geogebra';

function Graph({ x, y, restrictions, obj, returnResult }) {
	function afterAppIsLoaded() {
		const api = window.ggbApplet;

		api.setRounding('2');

		restrictions = restrictions.map((restriction) => {
			return restriction.replace('+-', '-');
		});
		restrictions.forEach((restriction, i) => {
			api.evalCommand('R' + (i + 1) + ' = (' + restriction + ')');
		});

		api.evalCommand(`a: (${restrictions.join(' ∧ ')} ∧ x >= 0 ∧ y >= 0)`);

		const pointsName = api
			.evalCommandGetLabels('Vertice = Vertex(a)')
			.split(',');
		if (!pointsName.length) {
			//TODO: não encontrou pontos, adicionar uma mensagem de erro
			console.alert('nao foi possivel achar pontos');
		}
		console.log(pointsName);

		const points = [];
		pointsName.forEach((point, index) => {
			api.setLabelStyle(point, 1);
			const xaux = parseFloat(api.getXcoord(point)).toFixed(2);
			const yaux = parseFloat(api.getYcoord(point)).toFixed(2);

			const pointName = String.fromCharCode(65 + index);
			const result = xaux * x + yaux * y;

			points.push({ name: pointName, coords: [xaux, yaux], result });

			api.renameObject(point, pointName);
		});

		const maxValues = findMaxValues(restrictions);

		api.setCoordSystem(-1, maxValues.max_x + 1, -1, maxValues.max_y + 1);

		let minValue = points[0].result;
		let maxValue = points[0].result;
		let minCoords = points[0].coords;
		let maxCoords = points[0].coords;
		points.forEach((point) => {
			if (minValue > point.result) {
				minValue = point.result;
				minCoords = point.coords;
			}
			if (maxValue < point.result) {
				maxValue = point.result;
				maxCoords = point.coords;
			}
		});

		const result = { steps: points, fo: '', coords: [] };

		if (obj === 'max') {
			result.fo = maxValue;
			result.coords = maxCoords;
		}

		if (obj === 'min') {
			result.fo = minValue;
			result.coords = minCoords;
		}

		api.evalCommand();

		returnResult(result);
	}

	function findMaxValues(equations) {
		let max_x = -Infinity;
		let max_y = -Infinity;

		for (let i = 0; i < equations.length; i++) {
			const coeficientes = equations[i]
				.replace('<=', '=')
				.replace('>=', '=')
				.match(/([-]?\d+)x\s*([-+]?\d+)y\s*=+\s*([-]?\d+)/);

			const x = coeficientes[1] ? coeficientes[3] / coeficientes[1] : 0;
			const y = coeficientes[2] ? coeficientes[3] / coeficientes[2] : 0;

			if (x > max_x && x != Infinity) {
				max_x = x;
			} else if (x == Infinity) {
				max_x += max_x / 5;
			}
			if (y > max_y && y != Infinity) {
				max_y = y;
			} else if (y == Infinity) {
				max_y += max_y / 5;
			}
		}

		return { max_x, max_y };
	}

	return (
		<Geogebra
			appName='classic'
			width='1200'
			height='800'
			editorBackgroundColor='red'
			showToolBar={false}
			showToolBarHelp={false}
			showMenuBar={false}
			showAlgebraInput={false}
			enableShiftDragZoom={true}
			enableLabelDrags={false}
			showZoomButtons={true}
			allowUpscale={true}
			appletOnLoad={afterAppIsLoaded}
			scale={2}
			showLogging={false}
			showFullscreenButton={true}
		/>
	);
}

export default Graph;
