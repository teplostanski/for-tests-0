import React from 'react';
import {useApp, useInput, Text, Box, useStdout} from 'ink';

export default function App() {
	const [counter, setCounter] = React.useState(0);
	const {exit} = useApp();
	const { stdout } = useStdout();
	const [size, setSize] = React.useState({
			columns: process.stdout.columns,
			rows: process.stdout.rows,
	});


	React.useMemo(() => {
		stdout.write("\x1b[?1049h");
	}, [stdout]);
		
	React.useEffect(() => {
		function onResize() {
			setSize({
				columns: process.stdout.columns,
				rows: process.stdout.rows,
			});
		}
	
		process.stdout.on("resize", onResize);
		process.stdout.write("\x1b[?1049h");

		return () => {
			process.stdout.off("resize", onResize);
			process.stdout.write("\x1b[?1049l");
		};
	}, []);

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

	//const enterAltScreenCommand = '\x1b[?1049h';
	//const leaveAltScreenCommand = '\x1b[?1049l';
	//process.stdout.write(enterAltScreenCommand);
	//process.on('exit', () => {
	       // process.stdout.write(leaveAltScreenCommand);
	//});

	return (
		<Box width={size.columns} height={size.rows} borderStyle="round">
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
