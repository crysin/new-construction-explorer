import { Box, Paper, Step, StepButton, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { styled } from '@mui/material/styles';
import TodayIcon from '@mui/icons-material/Today';
import React, { useContext, useEffect } from "react";
import './Timeline.css';
import { AppContext } from "../../context/AppContext";
import { Mission } from "../../models/Mission";

type Props = {
    missions?: Mission[]
};

function Timeline({missions}: Props) {
    const context = useContext(AppContext);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStep = (step: number) => () => {
        const mission = missions != undefined ? missions[step] : undefined;
        context?.setMission(mission);
        setActiveStep(step);
    };

    useEffect(() => {
        if (missions != undefined) {
            handleStep(missions.length - 1)();
        }
    }, [missions])

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
    }));

    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                <TodayIcon />
            </ColorlibStepIconRoot>
        );
    }

    return (
        <Paper elevation={3} className='timeline'>
            <Stepper nonLinear activeStep={activeStep}>
                {missions?.map((mission, index) => (
                    <Step key={mission.missionNumber}>
                        <StepButton onClick={handleStep(index)}>
                            <StepLabel sx={{flexDirection: "column"}} className="icon-remove-offset" StepIconComponent={ColorlibStepIcon}>
                                {mission.getShortDate()}
                            </StepLabel> 
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Paper>
    );
}

export default Timeline;
