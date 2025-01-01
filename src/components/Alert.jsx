import { useEffect, useRef } from 'react';
import { DoneRounded, BlockRounded } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';

const Alert = ({ returnFunction, success, message, style }) => {
    const btnRef = useRef(null);
    const { palette } = useTheme();

    useEffect(() => {
        btnRef.current.focus();
    }, []);

    return (
        // <Box position='fixed' top='0' left='0' bottom='0' right='0' border={'2px solid red'}>
        <section className='overlay'>
            <Paper sx={{ width: { md: '50%' }, height: { md: '50%' }, display: 'flex', }}>
                <Stack
                    spacing={3}
                    margin={'auto'}
                    p={2}
                    alignItems='center'
                // style={style}
                >

                    <Box width={150} height={150} display='flex' alignItems='center' justifyContent='center' borderRadius='50%' bgcolor={success ? palette.success.main : palette.error.main}>
                        {
                            success ?
                                <DoneRounded color='' fontSize='large' />
                                : <BlockRounded color='' fontSize='large' />
                        }
                    </Box>



                    <Typography variant='body1' >
                        {message}
                    </Typography>

                    <Box width={200}>
                        <Button fullWidth color='primary' variant='contained' ref={btnRef} onClick={returnFunction} >{success ? "Ok" : "Back"}</Button>
                    </Box>

                </Stack>
            </Paper>
            {/* </Box> */}
        </section>
    );
};

export default Alert;