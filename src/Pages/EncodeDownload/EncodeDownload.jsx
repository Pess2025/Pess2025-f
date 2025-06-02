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
                    <div className={styles.uploadBox}>
                        <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                            암호화가 완료되었습니다. 아래 버튼을 눌러 암호문과 전자봉투를 다운로드 하세요.
                        </p>

                        <div
                            style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                padding: '24px',
                                backgroundColor: '#fafafa',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}
                        >
                            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                                <button
                                    className={styles.primary}
                                    onClick={() =>
                                        downloadFile('/api/encrypt/encrypted-file', 'encrypted_result.txt')
                                    }
                                >
                                    암호문 다운로드
                                </button>

                                <button
                                    className={styles.outlined}
                                    onClick={() =>
                                        downloadFile('/api/encrypt/envelope', 'envelope_signature.txt')
                                    }
                                >
                                    전자봉투 다운로드
                                </button>
                            </div>
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
