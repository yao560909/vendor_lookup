import {useState} from 'react';
import './App.css';

function App() {
    const [mac, setMac] = useState('');
    const [result, setResult] = useState<{organization: string; address: string; registry: string; assignment: string} | null>(null);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    function getOUIPrefix(m: string): string {
        const clean = m.replace(/[:-]/g, '');
        const prefix = clean.substring(0, 6).toUpperCase();
        if (prefix.length < 6) return prefix || 'N/A';
        return `${prefix.slice(0,2)}:${prefix.slice(2,4)}:${prefix.slice(4,6)}:00:00:00`;
    }

    function search() {
        if (!mac.trim()) {
            setErrMsg('请输入 MAC 地址');
            return;
        }
        setLoading(true);
        setErrMsg('');
        setResult(null);
        import('../wailsjs/go/main/App').then(({Search}) => {
            Search(mac.trim())
                .then((res) => {
                    setLoading(false);
                    if (!res || !res.organization || res.organization === 'N/A') {
                        setResult(null);
                        setErrMsg('未找到该MAC厂商');
                    } else {
                        setResult(res);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setResult(null);
                    setErrMsg(err?.toString() || '查询失败，请重试');
                });
        });
    }

    return (
        <div id="App">
            <div className="container">
                <h1 className="title">MAC 厂商查询</h1>

                <div className="search-box">
                    <input
                        className="search-input"
                        value={mac}
                        onChange={(e) => setMac(e.target.value.toUpperCase())}
                        placeholder="请输入MAC地址，格式如：AA:BB:CC:DD:EE:FF"
                        autoComplete="off"
                        onKeyDown={(e) => e.key === 'Enter' && search()}
                    />
                    <button className="search-btn" onClick={search} disabled={loading}>
                        {loading ? '查询中...' : '搜索'}
                    </button>
                </div>

                {errMsg && (
                    <div className="warning">
                        <svg className="warning-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f59e0b" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        <span>{errMsg}</span>
                    </div>
                )}

                {result && (
                    <div className="result-card">
                        <h2 className="card-title">厂商信息</h2>
                        <div className="result-row">
                            <span className="label">MAC地址</span>
                            <span className="value">{mac.toUpperCase()}</span>
                        </div>
                        <div className="result-row">
                            <span className="label">厂商名称</span>
                            <span className="value name-value">{result.organization}</span>
                        </div>
                        <div className="result-row">
                            <span className="label">OUI</span>
                            <span className="value">{getOUIPrefix(mac)}</span>
                        </div>
                        <div className="result-row">
                            <span className="label">MAC前24位</span>
                            <span className="value">{mac.replace(/[:-]/g, '').substring(0, 6).toUpperCase()}</span>
                        </div>
                        <div className="result-row">
                            <span className="label">注册机构</span>
                            <span className="value success">
                                <span className="dot"></span>
                                {result.registry}
                            </span>
                        </div>
                        <div className="result-row">
                            <span className="label">分配类型</span>
                            <span className="value success">
                                <span className="dot"></span>
                                {result.assignment}
                            </span>
                        </div>
                    </div>
                )}

                <div className="footer">
                    Powered by Wails · 数据来自 IEEE OUI 公开数据库
                </div>
            </div>
        </div>
    )
}

export default App
