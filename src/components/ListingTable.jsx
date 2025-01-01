import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const height = 'calc(100vh - 198px)';

const ListingTable = ({
	tableHeads,
	tableBody,
	tableBodyKeys,
	selectModal,
	startAt
}) => {

	const tableContent =
		tableBody?.map((body, index) => {
			return (
				<TableRow
					key={body?._id}
					hover
					role="checkbox"
					tabIndex={-1}
					style={{ cursor: "pointer" }}
					onClick={() => selectModal(body)}
				>
					<TableCell>{startAt + index + 1}</TableCell>
					{
						tableBodyKeys.map(({ isObj, isImg, isArray, isCurrency, name, sep, subs, suffix }) => {
							if (isImg)
								return <TableCell key={name}><img className='company-logo' src={body[name]} /> </TableCell>;
							if (isArray)
								return <TableCell key={name}>{body[name].join('\n')}</TableCell>;
							if (isObj) {
								suffix = isCurrency ? " " + body[name]['currency'] : !suffix ? "" : suffix;
								const arrValues = subs.map(item => body[name][item]);
								return <TableCell key={name}>{arrValues.join(sep).concat(suffix)}</TableCell>;
							} else return <TableCell key={name}>{body[name]}</TableCell>;
						})
					}
				</TableRow>
			);
		});

	return (
		<Paper>
			<TableContainer style={{ height }}>
				<Table stickyHeader aria-label="a sticky dense table">
					<TableHead>
						<TableRow>
							{tableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableContent}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default ListingTable;