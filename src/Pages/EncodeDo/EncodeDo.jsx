import React, { useState, useEffect } from 'react';
import styles from './EncodeDo.module.css';
import checkImg from './assets/check.png';
import loadingImg from './assets/loading.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';
import axios from "axios";
import CryptoJS from 'crypto-js';

export default function EncodeDo() {
    const [symmetricDone, setSymmetricDone] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const passwordFile = location.state?.passwordFile;

    const readPasswordFromFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.trim());
            reader.onerror = () => reject(new Error("파일 읽기 실패"));
            reader.readAsText(file);
        });
    };

    const generateSalt = () => {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        return array;
    };

    const hashWithSalt = async (value, salt) => {
        const encoder = new TextEncoder();
        const combined = new Uint8Array([...salt, ...encoder.encode(value)]);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', combined);
        return new Uint8Array(hashBuffer);
    };

    const generateAesKey = () => {
        return window.crypto.getRandomValues(new Uint8Array(16)); // 128-bit AES
    };

    const encryptWithAES = (plainText, keyBytes) => {
        const keyStr = Array.from(keyBytes).map(b => String.fromCharCode(b)).join('');
        return CryptoJS.AES.encrypt(plainText, keyStr).toString();
    };

    useEffect(() => {
        const runEncrypt = async () => {
            if (!passwordFile) {
                alert("비밀번호 파일이 존재하지 않습니다.");
                return;
            }

            try {
                const password = await readPasswordFromFile(passwordFile);

                // 1. 해시 + salt 처리
                const salt = generateSalt();
                const hashed = await hashWithSalt(password, salt);

                const hashBlob = new Blob([hashed], { type: "application/octet-stream" });
                const hashForm = new FormData();
                hashForm.append("hashFile", hashBlob, "hashed_password.txt");

                await axios.post("/api/encrypt/save-hash", hashForm, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                // 2. AES 대칭키로 암호화
                const aesKey = generateAesKey();
                const encrypted = encryptWithAES(password, aesKey);

                const aesForm = new FormData();
                aesForm.append("encryptedText", new Blob([encrypted], { type: "text/plain" }), "encrypted.txt");

                const encryptedAesKeyBytes = await encryptAesKeyWithPublicKey(aesKey);
                aesForm.append("encryptedAesKey", new Blob([encryptedAesKeyBytes], { type: "application/octet-stream" }), "aes_key_encrypted.bin");
                await axios.post("/api/encrypt/envelope", aesForm, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                try {
                    const signRes = await axios.post("/api/encrypt/sign");

                    setSymmetricDone(true);
                } catch (signErr) {
                    alert("전자서명 생성 중 오류가 발생했습니다.");
                    return;
                }

                // 3. salt 다운로드 제공
                const saltBlob = new Blob([salt], { type: "application/octet-stream" });
                const url = window.URL.createObjectURL(saltBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "salt.bin";
                document.body.appendChild(a);
                a.click();
                a.remove();

                setSymmetricDone(true);
            } catch (e) {
                console.error(e);
                alert("암호화 처리 중 오류가 발생했습니다.");
            }
        };

        runEncrypt();
    }, []);

    // 수정된 importRsaPublicKey 함수 (PEM 제거 로직 없이 바로 atob)
    const importRsaPublicKey = async (base64String) => {
        const binaryDerString = atob(base64String); // ← 바로 디코딩
        const binaryDer = new Uint8Array([...binaryDerString].map(ch => ch.charCodeAt(0)));

        return await window.crypto.subtle.importKey(
            "spki",
            binaryDer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["encrypt"]
        );
    };

    const encryptAesKeyWithPublicKey = async (aesKeyBytes) => {
        const response = await axios.get("http://localhost:8080/api/keys/public-key", { responseType: "text" });
        const pem = response.data;
        const publicKey = await importRsaPublicKey(pem);
        const encryptedKey = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            aesKeyBytes
        );
        return new Uint8Array(encryptedKey);
    };

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <ul className={styles.steps}>
                        <li className={styles.actived}>
                            <div className={styles.stepRow}>
                                <div className={styles.stepItem}>
                                    <span>1</span>
                                    <div className={styles.text}>암호화 준비</div>
                                </div>
                            </div>
                        </li>
                        <li className={styles.actived}>
                            <div className={styles.stepRow}>
                                <div className={styles.stepItem}>
                                    <span>2</span>
                                    <div className={styles.text}>비밀번호 파일 업로드</div>
                                </div>
                            </div>
                        </li>
                        <li className={styles.active}>
                            <div className={styles.stepItem}>
                                <span>3</span>
                                <div className={styles.textBlock}>
                                    <div className={styles.text}>해시 값 생성 및 전자서명 생성</div>
                                    <ul className={styles.subList}>
                                        <li className={styles.active_mini}>· 클라이언트에서 해시 + AES 처리</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={styles.stepRow}>
                                <div className={styles.stepItem}>
                                    <span>4</span>
                                    <div className={styles.text}>전자봉투 및 암호문 다운로드</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </aside>

                <main className={styles.main}>
                    <h2>암호화</h2>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>해시 + AES 암호화 처리 중입니다</div>
                        <div className={styles.blockBody}>
                            <p>{symmetricDone ? '완료되었습니다!' : '클라이언트에서 처리 중입니다...'}</p>
                            <img
                                src={symmetricDone ? checkImg : loadingImg}
                                alt="상태 이미지"
                                className={styles.statusIcon}
                            />
                        </div>
                    </div>

                    {symmetricDone && (
                        <div className={styles.buttons}>
                            <button className={styles.primary} onClick={() => navigate(ROUTES.ENCODE_DOWNLOAD)}>
                                다음
                            </button>
                        </div>
                    )}


                    <hr className={styles.divider} />

                    <div className={styles.signatureSection}>
                        <h3>전자서명 및 암호화된 공개키 받기</h3>
                        <p className={styles.description}>
                            서버에서 생성된 전자서명(대칭키를 공개키로 암호화)과, 대칭키로 암호화된 공개키 파일을 다운로드합니다.
                        </p>

                        <div className={styles.downloadButtons}>
                            <button
                                className={styles.primary}
                                onClick={async () => {
                                    try {
                                        const response = await axios.get("/api/encrypt/download-bundle", {
                                            responseType: "blob",
                                        });
                                        const blob = new Blob([response.data], { type: "application/octet-stream" });
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = "signed_key_package.zip"; // ZIP 형태로 묶었을 수도 있음
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                        alert("전자서명 및 암호화된 공개키 다운로드 완료");
                                    } catch (e) {
                                        alert("다운로드 실패: 서버에서 전자서명 파일을 생성하지 못했습니다.");
                                    }
                                }}
                            >
                                전자서명 + 암호화된 공개키 다운로드
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
