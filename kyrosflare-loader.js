// ====================================
// KyrosFlare Auto-Loader
// Tüm sayfalarda otomatik bot koruması
// ====================================

(function() {
    'use strict';
    
    // KyrosFlare Protection HTML & CSS
    const kyrosflareProtection = `
        <style>
            :root {
                --bg-light: #f2f4f8;
                --bg-dark: #121212;
                --text-light: #111;
                --text-dark: #eee;
                --highlight: #00aaff;
                --box-bg: rgba(255, 255, 255, 0.85);
                --box-dark-bg: rgba(30, 30, 30, 0.85);
                --shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                --warning-bg: #ffaa00;
            }

            #kyrosflare-overlay {
                position: fixed;
                z-index: 9999;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                backdrop-filter: blur(6px);
                background-color: var(--bg-light);
                color: var(--text-light);
                text-align: center;
                padding: 15px;
                box-sizing: border-box;
                transition: opacity 0.5s ease-in-out;
            }

            @media (prefers-color-scheme: dark) {
                #kyrosflare-overlay {
                    background-color: var(--bg-dark);
                    color: var(--text-dark);
                }
                .kyrosflare-info-box {
                    background-color: var(--box-dark-bg);
                }
            }

            .kyrosflare-warning-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: var(--warning-bg);
                color: var(--text-light);
                padding: 8px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                z-index: 10000;
                box-shadow: var(--shadow);
                display: flex;
                justify-content: center;
                gap: 10px;
            }

            .kyrosflare-logo {
                width: 80px;
                border-radius: 50%;
                margin-bottom: 15px;
                box-shadow: var(--shadow);
                animation: logo-glow 2s ease-in-out infinite, spin 2.5s linear infinite;
            }

            .kyrosflare-main-title {
                font-size: 26px;
                font-weight: 700;
                margin-bottom: 6px;
                color: var(--highlight);
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            }

            .kyrosflare-subtitle {
                font-size: 14px;
                margin-bottom: 20px;
            }

            .kyrosflare-spinner {
                border: 4px solid #ddd;
                border-top: 4px solid var(--highlight);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1.2s linear infinite;
                margin: 15px auto;
            }

            .kyrosflare-radar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle at center, rgba(0, 170, 255, 0.2) 0%, transparent 80%);
                animation: pulse 2s infinite;
                margin: 10px auto;
            }

            .kyrosflare-info-box {
                background-color: var(--box-bg);
                border-radius: 12px;
                padding: 15px;
                box-shadow: var(--shadow);
                width: 90%;
                max-width: 350px;
                text-align: left;
                margin-top: 20px;
                box-sizing: border-box;
            }

            .kyrosflare-tech-line {
                font-size: 12px;
                margin: 3px 0;
                word-break: break-word;
                overflow-wrap: break-word;
                max-width: 100%;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes pulse {
                0% { transform: scale(0.95); opacity: 0.6; }
                70% { transform: scale(1.05); opacity: 1; }
                100% { transform: scale(0.95); opacity: 0.6; }
            }

            @keyframes logo-glow {
                0% { transform: scale(1); box-shadow: var(--shadow); }
                50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 170, 255, 0.5); }
                100% { transform: scale(1); box-shadow: var(--shadow); }
            }

            @media screen and (max-width: 480px) {
                .kyrosflare-main-title { font-size: 20px; }
                .kyrosflare-subtitle { font-size: 12px; }
                .kyrosflare-tech-line { font-size: 11px; }
                .kyrosflare-spinner { width: 35px; height: 35px; }
                .kyrosflare-radar { width: 90px; height: 90px; }
                .kyrosflare-info-box { width: 92%; padding: 12px; }
                .kyrosflare-warning-bar { font-size: 12px; padding: 6px; gap: 8px; }
            }

            @media screen and (max-width: 320px) {
                .kyrosflare-info-box { width: 95%; padding: 10px; }
                .kyrosflare-tech-line { font-size: 10px; }
                .kyrosflare-main-title { font-size: 18px; }
                .kyrosflare-subtitle { font-size: 11px; }
            }
        </style>

        <div id="kyrosflare-overlay">
            <div class="kyrosflare-warning-bar" id="kyrosflare-warning-bar">Güvenlik Doğrulaması Devam Ediyor...</div>
            <img src="https://i0.wp.com/kyrosil.eu/wp-content/uploads/2025/04/adsiz-tasarim.png" alt="Kyrosil" class="kyrosflare-logo">
            <div class="kyrosflare-main-title">KyrosFlare™</div>
            <div class="kyrosflare-subtitle"></div>
            <div class="kyrosflare-radar"></div>
            <div class="kyrosflare-spinner"></div>
            <div class="kyrosflare-info-box">
                <p id="kyrosflare-line1"></p>
                <p id="kyrosflare-line2"></p>
                <p id="kyrosflare-line3"></p>
                <div class="kyrosflare-tech-line" id="kyrosflare-ray">Ray ID: ...</div>
                <div class="kyrosflare-tech-line" id="kyrosflare-ip-info"></div>
                <div class="kyrosflare-tech-line" id="kyrosflare-country-info"></div>
                <div class="kyrosflare-tech-line" id="kyrosflare-user-agent"></div>
                <div class="kyrosflare-tech-line">HTTP Status: 403.9 | Code: 0xAE34F9</div>
            </div>
        </div>
    `;
    
    // Protection Logic
    function initKyrosFlare() {
        // Insert protection HTML
        document.body.insertAdjacentHTML('afterbegin', kyrosflareProtection);
        
        // Generate Ray ID
        const ray = 'KYR-2025-' + Math.random().toString(36).substring(2, 14);
        document.getElementById("kyrosflare-ray").innerText = "Ray ID: " + ray;
        
        // Fetch IP and Country Info
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const ip = data.ip;
                const country = data.country_name;
                const tr = data.country_code === "TR";
                
                document.getElementById("kyrosflare-ip-info").innerText = "IP: " + ip;
                document.getElementById("kyrosflare-country-info").innerText = tr ? "Ülke: Türkiye" : "Country: " + country;
                document.querySelector(".kyrosflare-main-title").innerText = "KyrosFlare™" + (tr ? " Güvenlik Doğrulaması" : " Security Check");
                document.querySelector(".kyrosflare-subtitle").innerText = tr ? "kyrosil.eu tarafından korunuyorsunuz" : "You are protected by kyrosil.eu";
                document.getElementById("kyrosflare-user-agent").innerText = (tr ? "Tarayıcı: " : "Browser: ") + navigator.userAgent;
                document.getElementById("kyrosflare-warning-bar").innerText = tr ? "Güvenlik Doğrulaması Devam Ediyor... - Powered by kyrosil.eu" : "Security Verification in Progress... - Powered by kyrosil.eu";
                
                // Animation sequences
                setTimeout(() => {
                    document.getElementById("kyrosflare-line1").innerText = tr ? "KyrosFlare sistemi analiz ediyor..." : "KyrosFlare is analyzing...";
                }, 1200);
                
                setTimeout(() => {
                    document.getElementById("kyrosflare-line2").innerText = tr ? "İnsan olduğunuz doğrulandı ✔️" : "You are verified as human ✔️";
                }, 3200);
                
                setTimeout(() => {
                    document.getElementById("kyrosflare-line3").innerText = tr ? "Yönlendiriliyorsunuz..." : "Redirecting...";
                }, 5600);
            })
            .catch(() => {
                document.getElementById("kyrosflare-country-info").innerText = "Ülke: Belirlenemedi";
            });
        
        // Remove overlay after verification
        setTimeout(() => {
            const overlay = document.getElementById("kyrosflare-overlay");
            overlay.style.opacity = 0;
            setTimeout(() => overlay.remove(), 500);
        }, 7700);
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKyrosFlare);
    } else {
        initKyrosFlare();
    }
})();
