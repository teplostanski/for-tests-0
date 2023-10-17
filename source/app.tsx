import React from 'react';
import {useApp, useInput, Text, Box} from 'ink';

export default function App() {
	const [counter, setCounter] = React.useState(0);
	const {exit} = useApp();

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prevCounter => prevCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	});

	useInput((input, key) => {
		if (input === 'q' || key.escape) {
			exit();
		}
	});

	return (
		<Box width={process.stdout.columns} height={process.stdout.rows} borderStyle="round">
			<Text>
				{counter} rows {process.stdout.rows} columns {process.stdout.columns}
			</Text>
		</Box>
	);
}

//const enterAltScreenCommand = "\x1b[?1049h";
//const leaveAltScreenCommand = "\x1b[?1049l";
//process.stdout.write(enterAltScreenCommand);
//process.on("exit", () => {
//  process.stdout.write(leaveAltScreenCommand);
//});
//function useApp(): { exit: any; } {
//	throw new Error('Function not implemented.');
//}

//function useInput(_arg0: (input: any, key: any) => void) {
//	throw new Error('Function not implemented.');
//}
