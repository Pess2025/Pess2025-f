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
                reader.onload = () => {
                    const arrayBuffer = reader.result;
                    const byteArray = new Uint8Array(arrayBuffer);
                    resolve(byteArray);  // 바이트 배열 반환
                };
                reader.onerror = () => reject(new Error("파일 읽기 실패"));
                reader.readAsArrayBuffer(file);  //바이트 단위로 읽음
            });
    };

    const generateSalt = () => {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        return array;
    }

    const hashWithSalt = async (value, salt) => {
        const encoder = new TextEncoder();
        const combined = new Uint8Array([...salt, ...encoder.encode(value)]);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', combined);
        return new Uint8Array(hashBuffer);
    };

    const encryptWithAES = (plainTextBytes, keyBytes) => {
            // 입력된 바이트 배열을 WordArray로 변환
            const plaintext = CryptoJS.lib.WordArray.create(plainTextBytes);
            const key = CryptoJS.lib.WordArray.create(keyBytes);

            return CryptoJS.AES.encrypt(plaintext, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        };

//     const encryptWithAES = (plainText, keyBytes) => {
//         const key = CryptoJS.lib.WordArray.create(keyBytes);
//         const encrypted = CryptoJS.AES.encrypt(plainText, key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         });
//         // WordArray를 Uint8Array로 변환
//         const wordArray = encrypted.ciphertext;
//         const byteArray = [];
//         for (let i = 0; i < wordArray.sigBytes; i++) {
//             byteArray.push((wordArray.words[Math.floor(i / 4)] >>> (24 - (i % 4) * 8)) & 0xff);
//         }
//         return new Uint8Array(byteArray);
//     };

    const encryptAesKeyWithPublicKey = async (aesKeyBytes) => {
        try {
            const response = await axios.get("/api/keys/generate/public-key", { responseType: "arraybuffer" });
            const keyBytes = new Uint8Array(response.data);

            console.log("AES key byte length:", aesKeyBytes.length);
            console.log("Public key bytes length:", keyBytes.length);
            console.log("Public key bytes (String):", Array.from(keyBytes).toString());


            const publicKey = await crypto.subtle.importKey(
              "spki",
              keyBytes.buffer,
              { name: "RSA-OAEP", hash: "SHA-256" },
              false,
              ["encrypt"]
            );

            console.log("퍼블릭키:", publicKey.toString());

            const encryptedKey = await window.crypto.subtle.encrypt(
                { name: "RSA-OAEP" },
                publicKey,
                aesKeyBytes.slice(0, 32)
            );

            return new Uint8Array(encryptedKey);
        } catch (e) {
            console.error("encryptAesKeyWithPublicKey error:", e);
            throw e;
        }
    };

    useEffect(() => {
        const runEncrypt = async () => {
            if (!passwordFile) {
                alert("비밀번호 파일이 존재하지 않습니다.");
                console.log("[runEncrypt] 비밀번호 파일이 존재하지 않습니다.");
                return;
            }

            try {
                console.log("[runEncrypt] 비밀번호 파일 읽기 시작");
                const password = await readPasswordFromFile(passwordFile);
                console.log("[runEncrypt] 비밀번호 파일 읽기 완료, password:", password);

                // 1. 해시 + salt 처리
                console.log("[runEncrypt] salt 생성 시작");
                const salt = generateSalt();
                console.log("[runEncrypt] salt 생성 완료, salt:", salt);

                console.log("[runEncrypt] 비밀번호와 salt로 해시 계산 시작");
                const hashed = await hashWithSalt(password, salt);
                console.log("[runEncrypt] 해시 계산 완료, hashed:", hashed);

                const hashBlob = new Blob([hashed], { type: "application/octet-stream" });
                const hashForm = new FormData();
                hashForm.append("hashFile", hashBlob, "hashed_password.txt");

                console.log("[runEncrypt] 해시 파일 FormData 생성, 서버에 전송 시작");
                await axios.post("/api/encrypt/save-hash", hashForm, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("[runEncrypt] 해시 파일 서버 전송 완료");

                // 2. AES 대칭키로 암호화 -> 백의 AESKeyHolder 에서 .getinstance().getAES();해서 얻어서 프론트에 대칭키를 전송해줘야
                console.log("[runEncrypt] AES 대칭키 들고오기 시작");
                const res = await axios.get("/api/keys/aes-key", {
                    responseType: "arraybuffer",
                });
                const aesKey = new Uint8Array(res.data); //원래 generateAesKey();였는데 생성하면 안 됨
                console.log("[runEncrypt] AES 대칭키 들고오기 완료, aesKey:", aesKey);


                console.log("[runEncrypt] 비밀번호 AES 암호화 시작");
                const encrypted = encryptWithAES(password, aesKey);
                console.log("[runEncrypt] 비밀번호 AES 암호화 완료, encrypted:", encrypted);

                const aesForm = new FormData();
                aesForm.append("encryptedText", new Blob([encrypted], { type: "text/plain" }), "encrypted.txt");

                // 3. 공개키 raw bytes 받아서 AES 키 암호화
                console.log("[runEncrypt] AES 키 공개키로 암호화 시작");
                const encryptedAesKeyBytes = await encryptAesKeyWithPublicKey(aesKey);
                console.log("[runEncrypt] AES 키 공개키로 암호화 완료, encryptedAesKeyBytes:", encryptedAesKeyBytes);
                console.log("[runEncrypt] encryptedAesKeyBytes length:", encryptedAesKeyBytes.length);

                aesForm.append("encryptedAesKey", new Blob([encryptedAesKeyBytes], { type: "application/octet-stream" }), "aes_key_encrypted.bin");

                console.log("[runEncrypt] 암호문 및 암호화된 AES 키 서버 전송 시작");
                await axios.post("/api/encrypt/envelope", aesForm, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("[runEncrypt] 암호문 및 암호화된 AES 키 서버 전송 완료");

                // 4. 전자서명 생성 요청
                try {
                    console.log("[runEncrypt] 전자서명 생성 요청 시작");
                    const signRes = await axios.post("/api/encrypt/sign");
                    console.log("[runEncrypt] 전자서명 생성 완료", signRes.data);

                    setSymmetricDone(true);
                } catch (signErr) {
                    console.error("[runEncrypt] 전자서명 생성 중 오류 발생:", signErr);
                    alert("전자서명 생성 중 오류가 발생했습니다.");
                    return;
                }

                // 5. salt 다운로드 제공
                console.log("[runEncrypt] salt 다운로드 생성 시작");
                const saltBlob = new Blob([salt], { type: "application/octet-stream" });
                const url = window.URL.createObjectURL(saltBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "salt.bin";
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log("[runEncrypt] salt 다운로드 완료");

                setSymmetricDone(true);
            } catch (e) {
                console.error("[runEncrypt] 암호화 처리 중 오류 발생:", e);
                alert("암호화 처리 중 오류가 발생했습니다.");
            }
        };

        runEncrypt();
    }, []);

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
                                        a.download = "signed_key_package.zip";
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