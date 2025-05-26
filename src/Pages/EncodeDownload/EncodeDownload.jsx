import React, { useRef } from 'react';
import styles from './EncodeDownload.module.css';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function Result() {
    const inputRef = useRef();
    const navigate = useNavigate();

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
                            암호화가 완료 되었습니다. 암호문과 전자봉투를 다운로드 하세요.
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
                            <div style={{ marginTop: '16px', textAlign: 'center' }} className='buttons'>
                                <button
                                    href="/download/original-file"
                                    className={styles.primary}
                                    style={{ textDecoration: 'none' }}
                                >
                                    암호문 다운로드
                                </button>
                                <button
                                    href="/download/original-file"
                                    className={styles.outlined}
                                    style={{ textDecoration: 'none' }}
                                >
                                    전자봉투 다운로드
                                </button>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                                <button className={styles.primary_page} onClick={() => navigate(ROUTES.MAIN)}>완료</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
