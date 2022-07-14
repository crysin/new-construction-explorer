import './Renderer.css';
import { initializeEngine, loadMap } from './Engine/Engine';
import { useEffect, ReactNode, useContext } from 'react';
import { Container } from '@mui/material';
import { AppContext } from '../../context/AppContext';
import { Gps } from '../../utils/Gps';
import { Coordinate } from '../../models/Coordinate';

type Props = {
    children?: ReactNode
};

function Renderer(props: Props) {
    const context = useContext(AppContext);
    
    useEffect(() => {
        initializeEngine();
    }, []);

    useEffect(() => {
        Gps.setOrigin(context?.mission?.center ?? Coordinate.nullIsland());
        loadMap(context?.mission?.model ?? "");
    }, [context?.mission])

    return (
        <div className="renderer-container">
            <canvas className="renderer" id='renderCanvas' />
            {props.children}
        </div>
    );
}

export default Renderer;
