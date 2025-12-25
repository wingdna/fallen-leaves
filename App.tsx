
import React, { useEffect } from 'react';
import { GameSettingsProvider } from './hooks/useGameSettings';
import { SkinProvider } from './contexts/SkinContext';
import { GameRoot } from './components/Game/GameRoot';
import { SystemGuard } from './components/System/SystemGuard';
import { telemetry } from './services/telemetryService';

// Internal Logger Wrapper
const logApp = (msg: string) => {
    telemetry.log('INFO', 'SYSTEM', msg);
    if ((window as any).logToScreen) (window as any).logToScreen(`[App] ${msg}`);
};

export const App: React.FC = () => {
    useEffect(() => {
        logApp("App Root Mounted. Telemetry Active.");
        // Capture initial screen size
        telemetry.log('INFO', 'SYSTEM', 'Environment Info', {
            userAgent: navigator.userAgent,
            screen: `${window.innerWidth}x${window.innerHeight}`,
            dpr: window.devicePixelRatio
        });
    }, []);

    return (
        <SkinProvider>
            <GameSettingsProvider>
                <SystemGuard />
                <GameRoot />
            </GameSettingsProvider>
        </SkinProvider>
    );
};
