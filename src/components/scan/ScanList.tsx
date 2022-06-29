import React, { useContext, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { AppContext } from "../../context/AppContext";
import { Mission } from "../../models/Mission";

type Props = {
    missions?: Mission[]
};

function ScanList({missions}: Props) {
    const context = useContext(AppContext);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        step: number
    ) => {
        const mission = missions != undefined ? missions[step] : undefined;
        context?.setMission(mission);
        setSelectedIndex(step);
    };

    useEffect(() => {
        if (missions != undefined) {
            setSelectedIndex(missions.length - 1);
        }
    }, [missions])

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {missions?.map((m, i) => { return (
                <ListItemButton key={m.missionNumber} selected={selectedIndex === i} onClick={(event) => handleListItemClick(event, i)}>
                    <ListItemText primary={m.getShortDate()}/>
                </ListItemButton>
            )})}
        </List>
    );
}

export default ScanList;