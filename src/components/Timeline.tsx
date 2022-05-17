import { Box, Step, StepLabel, Stepper } from "@mui/material";

const steps = [
    '05/08/2022',
    '05/15/2022',
];

function Timeline() {
    return (
        <Box sx={{width: 1}}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default Timeline;
