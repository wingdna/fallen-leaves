import React, { ReactNode, ErrorInfo, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const safeLog = (msg: string, type: 'info' | 'error' = 'info') => {
    const w = window as any;
    if (w.logToScreen) w.logToScreen(msg, type);
    else console[type](msg);
};

const hideLoader = () => {
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 600);
    }
};

const reportBootError = (err: any) => {
    const errDisplay = document.getElementById('loader-error');
    if (errDisplay) {
        errDisplay.innerText = "江湖路断: " + (err?.message || String(err));
    }
    console.error("Boot Failure:", err);
};

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error: Error | null; }

/**
 * 修复：通过从 'react' 直接解构 Component 并使用属性初始化器。
 * 显式声明 state 属性确保 TypeScript 在各种环境配置下均能正确识别 class 成员。
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    // 修复：显式声明并初始化 state 属性，解决 Property 'state' does not exist 错误
    public state: ErrorBoundaryState = { hasError: false, error: null };

    // 修复：显式声明 props 属性以解决 Property 'props' does not exist 错误
    // 使用 declare 关键字告知编译器该属性由基类提供，解决某些 TS 配置下的识别问题
    declare public props: ErrorBoundaryProps;

    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState { 
        return { hasError: true, error }; 
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        safeLog("React Crash: " + error.message, 'error');
        hideLoader();
    }

    render() {
        // 修复：通过显式声明，this.state 现在可被 TypeScript 正确识别
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', color: '#ff6b6b', fontFamily: 'serif', background: '#0a0505', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#ffd700' }}>博弈推演中断</h1>
                    <p style={{ opacity: 0.6, marginBottom: '20px' }}>江湖路远，竟遇此变。老夫未能算尽天机。</p>
                    <pre style={{ background: 'rgba(255,107,107,0.1)', padding: '20px', borderRadius: '4px', maxWidth: '80vw', overflow: 'auto', fontSize: '12px', color: '#ffaaaa' }}>
                        {this.state.error?.message || "未知模块解析错误"}
                    </pre>
                    <button onClick={() => window.location.reload()} style={{ marginTop: '30px', padding: '12px 30px', background: '#3d0e0e', color: '#e6c278', border: '1px solid #5c1010', cursor: 'pointer', borderRadius: '2px', letterSpacing: '0.2em' }}>
                        卷土重来
                    </button>
                </div>
            );
        }
        // 修复：通过显式声明 props，this.props.children 现在可被正确识别
        return this.props.children;
    }
}

const initializeApp = () => {
    const rootEl = document.getElementById('root');
    if (!rootEl) return;

    try {
        const root = createRoot(rootEl);
        root.render(
            <React.StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </React.StrictMode>
        );
        
        setTimeout(hideLoader, 1000);

        try {
            serviceWorkerRegistration.register();
        } catch (swError) {
            console.warn("Offline support skipped", swError);
        }
    } catch (e: any) {
        reportBootError(e);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
