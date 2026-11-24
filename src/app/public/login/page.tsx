import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./page.css"

function Login() {
    const [isLoginGoogle, setIsLoginGoogle] = useState(false);
    const [isLoginEmail, setIsLoginEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [password, setPassword] = useState("");

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-contents">
                    <p className="login-title">
                        เข้าสู่ระบบ
                    </p>
                    <p className="login-subtitle">
                        เพื่อบันทึกและดูประวัติของคุณ
                    </p>
                    <button className="login-with-google-button" 
                        onClick={() => setIsLoginGoogle(true)}
                        disabled={isLoginGoogle}>
                        {
                            isLoginGoogle ? (
                                <>
                                    <span className="login-with-google-spinner"></span>
                                    กำลังเชื่อมต่อกับ Google...
                                </>
                            ) : (
                                "ดำเนินการต่อด้วย Google"
                        )}
                    </button>
                    <p className="login-option-title">
                        หรือ
                    </p>
                    <p className="login-with-email-email-title">
                        อีเมล
                    </p>
                    <input 
                        type="email" 
                        className="login-with-email-email-input" 
                        placeholder="name@example.com"/>
                    <p className="login-with-email-password-title">
                        รหัสผ่าน
                    </p>
                    <div className="login-with-email-password-input-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="login-with-email-password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}/>
                        <button 
                            type="button"
                            className="login-with-email-password-icons"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {
                        isPasswordFocused && (
                            <p className={`login-with-email-password-hint ${
                                password.length >= 8 ? "valid" : ""
                            }`}>
                                {
                                    password.length >= 8
                                        ? "✓ รหัสผ่านมีอย่างน้อย 8 ตัวอักษร"
                                        : `อย่างน้อย 8 ตัวอักษร (ตอนนี้ ${password.length})`
                                }
                            </p>
                        )
                    }
                    <button className="login-with-email-forget-password">
                        <u>
                            ลืมรหัสผ่าน?
                        </u>
                    </button>
                    <button className={`login-with-email-login-button ${isLoginEmail ? "loading" : ""}`} 
                        onClick={() => setIsLoginEmail(true)}>
                        {
                            isLoginEmail ? (
                                <>
                                    <span className="login-with-email-spinner"></span>
                                    กำลังเข้าสู่ระบบ...
                                </>
                            ) : (
                                "เข้าสู่ระบบ"
                        )}
                    </button>
                    <p className="login-page-register-title">
                        ยังไม่มีบัญชี?
                        <button type="button" className="login-page-register-button">
                            สมัครสมาชิก
                        </button>
                    </p>
                    <hr className="login-page-divider" />
                    <p className="login-page-no-login">
                        <button className="login-page-no-login-button">
                            <u>
                                ใช้เครื่องคำนวณโดยไม่ต้องสมัคร (ไม่บันทึกข้อมูล)
                            </u>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;