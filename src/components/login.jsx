
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../feature/authSlice";

const SECRET_PASSWORD = "Open@123";
const MAX_ATTEMPTS = 3;

const particles = Array.from({ length: 16 }, (_, i) => ({
    x: `${(i * 37 + 11) % 100}%`,
    size: `${4 + ((i * 5) % 7)}px`,
    duration: `${9 + ((i * 3) % 8)}s`,
    delay: `${(i * 0.9) % 7}s`
}));

// CONTINUOUS POLICE STYLE SIREN
function startSiren() {
    const AudioCtx =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) return () => {};

    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(650, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.1);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    // Repeating siren pattern
    for (let i = 0; i < 1000; i++) {
        const start = now + i * 0.5;

        oscillator.frequency.setValueAtTime(650, start);

        oscillator.frequency.linearRampToValueAtTime(
            1200,
            start + 0.25
        );

        oscillator.frequency.linearRampToValueAtTime(
            650,
            start + 0.5
        );
    }

    oscillator.start();

    return () => {
        try {
            oscillator.stop();
        } catch {}

        ctx.close().catch(() => {});
    };
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [status, setStatus] = useState("idle");
    const [notice, setNotice] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [shakeCount, setShakeCount] = useState(0);

    const stopSirenRef = useRef(null);
    const grantTimerRef = useRef(null);

    // CLEANUP
    useEffect(() => {
        return () => {
            stopSirenRef.current?.();
            clearTimeout(grantTimerRef.current);
        };
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (status === "locked" || status === "granted") {
            return;
        }

        const cleanName = name.trim();

        if (!cleanName) {
            setNotice({
                text: "PLEASE ENTER YOUR NAME.",
                tone: "warn"
            });
            return;
        }

        // CORRECT PASSWORD
        if (password === SECRET_PASSWORD) {
            stopSirenRef.current?.();
            stopSirenRef.current = null;

            setStatus("granted");

            setNotice({
                text: `ACCESS GRANTED. WELCOME ${cleanName.toUpperCase()}!`,
                tone: "ok"
            });

            grantTimerRef.current = setTimeout(() => {
                dispatch(login({ name: cleanName }));
                navigate("/");
            }, 1700);

            return;
        }

        // WRONG PASSWORD
        if (!stopSirenRef.current) {
            stopSirenRef.current = startSiren();
        }

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }

        const nextAttempts = attempts + 1;

        setPassword("");
        setAttempts(nextAttempts);
        setShakeCount((count) => count + 1);

        if (nextAttempts >= MAX_ATTEMPTS) {
            setStatus("locked");

            setNotice({
                text: "CRITICAL SECURITY ALERT",
                tone: "error"
            });

            return;
        }

        setStatus("denied");

        setNotice({
            text: `UNAUTHORIZED ACCESS DETECTED! ${MAX_ATTEMPTS - nextAttempts} ATTEMPTS REMAINING.`,
            tone: "error"
        });
    }

    // SECURITY LOCKDOWN SCREEN
    if (status === "locked") {
        return (
            <div className="gate gate-denied">
                <div className="gate-vignette" />

                <main className="gate-card">
                    <div className="gate-orb">
                        <span className="gate-ring" />

                        <span className="gate-core">
                            !
                        </span>
                    </div>

                    <p className="gate-brand">
                        EmployeeMS Security
                    </p>

                    <h1 className="gate-title">
                        SECURITY LOCKDOWN
                    </h1>

                    <h2 className="gate-message error">
                        UNAUTHORIZED ACCESS DETECTED
                    </h2>

                    <p className="gate-sub">
                        Maximum login attempts exceeded.
                        Workspace access has been locked.
                    </p>

                    <p className="gate-footer">
                        SYSTEM ACCESS RESTRICTED
                    </p>
                </main>
            </div>
        );
    }

    const shakeClass =
        status === "denied"
            ? shakeCount % 2
                ? "shake-a"
                : "shake-b"
            : "";

    let buttonLabel = "UNLOCK WORKSPACE";

    if (status === "granted") {
        buttonLabel = "ACCESS GRANTED...";
    }

    return (
        <div className={`gate gate-${status}`}>
            <div className="gate-grid" />
            <div className="gate-beacon" />
            <div className="gate-vignette" />

            {particles.map((dot, index) => (
                <span
                    className="gate-dot"
                    key={index}
                    style={{
                        "--x": dot.x,
                        "--s": dot.size,
                        "--d": dot.duration,
                        "--delay": dot.delay
                    }}
                />
            ))}

            <main className={`gate-card ${shakeClass}`}>
                <div className="gate-orb">
                    <span className="gate-ring" />

                    <span className="gate-core">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                            />

                            {status === "granted" ? (
                                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                            ) : (
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            )}
                        </svg>
                    </span>
                </div>

                <p className="gate-brand">
                    EmployeeMS
                </p>

                <h1 className="gate-title">
                    Secure Access
                </h1>

                <p className="gate-sub">
                    Enter your name and secret password to open the workspace.
                </p>

                <form
                    className="gate-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className="gate-field">
                        <input
                            id="gate-name"
                            type="text"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === "granted"}
                            autoFocus
                        />

                        <label htmlFor="gate-name">
                            Your name
                        </label>
                    </div>

                    <div className="gate-field">
                        <input
                            id="gate-password"
                            className="has-eye"
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={status === "granted"}
                        />

                        <label htmlFor="gate-password">
                            Secret password
                        </label>

                        <button
                            type="button"
                            className="gate-eye"
                            onClick={() =>
                                setShowPassword((show) => !show)
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <p
                        className={`gate-message ${notice?.tone ?? ""}`}
                        role="alert"
                    >
                        {notice?.text}
                    </p>

                    <button
                        type="submit"
                        className="gate-submit"
                        disabled={status === "granted"}
                    >
                        {buttonLabel}
                    </button>
                </form>

                <div className="gate-attempts">
                    <span>Security attempts</span>

                    {Array.from(
                        { length: MAX_ATTEMPTS },
                        (_, i) => (
                            <i
                                key={i}
                                className={i < attempts ? "used" : ""}
                            />
                        )
                    )}
                </div>
            </main>

            <p className="gate-footer">
                AUTHORIZED PERSONNEL ONLY
            </p>
        </div>
    );
}

export default Login;
