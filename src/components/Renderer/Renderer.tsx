import './Renderer.css';
import { initializeEngine, loadMap, loadPhotos } from './Engine/Engine';
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
        const loadData = async () => {
            if (Boolean(context?.mission?.model)) {
                await loadMap("mission/", context?.mission?.model!);
            }
            if (Boolean(context?.mission?.photos)) {
                await loadPhotos(context?.mission?.photos!)
            }
        }

        loadData().catch(console.error);
    }, [context?.mission])

    return (
        <div className="renderer-container">
            <canvas className="renderer" id='renderCanvas' />
            {props.children}
        </div>
    );
}

export default Renderer;
