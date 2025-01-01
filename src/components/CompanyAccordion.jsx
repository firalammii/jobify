import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandMoreRounded } from '@mui/icons-material';
const height = 'calc(100vh - 198px)';

const CompanyAccordion = ({
	tableBody,
	selectModal,
	deleteCompany,
}) => {
	const [expanded, setExpanded] = React.useState('panel1');

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleDelete = (companyName, id) => {
		const isOk = window.confirm(`Are You Sure You want to delete "{ ${companyName} }"`);
		if (isOk)
			deleteCompany(id);
	};

	return (
		<Box height={height} overflow='auto'>
			{
				tableBody.map(({ _id, companyName, companyLogo, location, description }) => (
					<Accordion
						expanded={expanded === _id}
						onChange={handleChange(_id)}
						key={_id}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreRounded />}
							aria-controls="panel1d-content"
							id="panel1d-header">
							<Stack direction={'row'} justifyContent='space-between' width='100%' pr={2}>
								<Stack direction={'row'} spacing={2}>
									<Avatar src={companyLogo} sx={{ width: 64, height: 64 }} />
									<Stack justifyContent='center' alignItems='center'>
										<Typography component="span">{companyName}</Typography>
										<Typography component="span">{location.city}, {location.state}, {location.country}</Typography>
									</Stack>
								</Stack>
								{expanded === _id &&
									<Stack direction={'row'} spacing={1} alignItems='center'>
										<IconButton sx={{ width: 48, height: 48 }} onClick={() => selectModal(_id)}><EditRounded color='primary' /></IconButton>
										<IconButton sx={{ width: 48, height: 48 }} onClick={() => handleDelete(companyName, _id)}><DeleteRounded color='error' /></IconButton>
									</Stack>}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{description}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))
			}
		</Box>
	);
};

export default CompanyAccordion;