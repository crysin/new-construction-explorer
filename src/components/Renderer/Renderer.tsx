import './Renderer.css';
import { initializeEngine, loadMap } from './Engine/Engine';
import { useEffect, ReactNode, useContext } from 'react';
import { Container } from '@mui/material';
import { AppContext } from '../../context/AppContext';

type Props = {
    children?: ReactNode
};

function Renderer(props: Props) {
    const context = useContext(AppContext);
    
    useEffect(() => {
        initializeEngine();
    }, []);

    useEffect(() => {
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
