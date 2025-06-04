/**
 * 파일명 : EncodeDownload.jsx
 * 설명 : 암호화 완료된 암호문과 전자봉투를 다운로드하는 화면 (4단계)
 * 작성자 : 진채민, 정여진
 * 수정일 : 2025.06.02
 */

import React from 'react';
import styles from './EncodeDownload.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';
import axios from 'axios';

export default function EncodeDownload() {
    const navigate = useNavigate();

    const downloadFile = async (endpoint, filename) => {
        try {
            const res = await axios.get(endpoint, {
                responseType: 'blob'
            });
            const blob = new Blob([res.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            alert(`${filename} 다운로드에 실패했습니다.`);
        }
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
                        <li className={styles.actived}>
                            <div className={styles.stepRow}>
                                <div className={styles.stepItem}>
                                    <span>3</span>
                                    <div className={styles.text}>해시 값 생성 및 전자서명 생성</div>
                                </div>
                            </div>
                        </li>
                        <li className={styles.active}>
                            <div className={styles.stepItem}>
                                <span>4</span>
                                <div className={styles.textBlock}>
                                    <div className={styles.text}>전자봉투 및 암호문 다운로드</div>
                                    <ul className={styles.subList}>
                                        <li className={styles.active_mini}>· 전자봉투 / 암호화 된 파일 다운로드</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </aside>

                 <main className={styles.main}>
                    <h2>암호화</h2>
                    <div className={styles.block}>
                        <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                            전자서명 및 암호화된 공개키 받기
                        </p>
                        <div className={styles.signatureSection}>
                            <p className={styles.description}>
                                서버에서 생성된 전자서명(대칭키를 공개키로 암호화)과, 대칭키로 암호화된 공개키 파일을 다운로드합니다.
                            </p>
                        </div>
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
                                        alert("전자서명 및 암호화 된 공개키 다운로드 완료");
                                    } catch (e) {
                                        alert("다운로드 실패: 서버에서 전자서명 파일을 생성하지 못했습니다.");
                                    }
                                }}
                            >전자서명 및 암호화 된 공개 키 다운로드</button>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.primary_page} onClick={() => navigate(ROUTES.MAIN)}>
                                완료
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
