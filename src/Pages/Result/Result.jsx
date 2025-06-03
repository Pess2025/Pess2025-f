/*
 * 파일명: Result.jsx
 * 설명: 복호화 결과 및 파일 무결성/전자서명 검증 결과 화면
 * 작성자: 정여진
 * 작성일: 2025.05.19
 * 주요기능:
 *   - 복호화 결과 텍스트 및 검증 정보 표시
 *   - 이미지 기반 검색창 UI 구성 (search-bar.png + search-icon.png)
 *   - 검색창 클릭 시 input에 포커스 적용
 */

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './Result.module.css';
import searchInput from './assets/search-bar.png';
import searchIcon from './assets/search-icon.png';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function Result() {
    const [integrityStatus, setIntegrityStatus] = useState(null);
    const [signatureStatus, setSignatureStatus] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [checkTime, setCheckTime] = useState(null);

    const inputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
            // 검사 시간 저장
            const now = new Date();
            const formatted = now.toISOString().slice(0, 19).replace("T", " ");
            setCheckTime(formatted);

            //파일 이름 가져오기
            axios.get("/result/filename")
                .then(response => {
                      const files = response.data;
                      setFileName(files.file);
                })

            // 무결성 검증 요청
            axios.get("/verify/integrity")
                .then(res => {
                    if (res.status === 200) setIntegrityStatus("일치");
                    else setIntegrityStatus("불일치");
                })
                .catch(() => setIntegrityStatus("불일치"));



            // 전자서명 확인
            axios.get("/verify/signature")
                .then(res => {
                    if (res.status === 200) setSignatureStatus("유효함");
                    else setSignatureStatus("없음");
                })
                .catch(() => setSignatureStatus("없음"));
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
                                <div className={styles.text}>개인 키 업로드</div>
                            </div>
                        </div>
                    </li>
                    <li className={styles.actived}>
                        <div className={styles.stepRow}>
                        <div className={styles.stepItem}>
                            <span>2</span>
                            <div className={styles.text}>복호화 준비</div>
                            </div>
                        
                        </div>
                    </li>
                    <li className={styles.actived}>
                        <div className={styles.stepRow}>
                        <div className={styles.stepItem}>
                            <span>3</span>
                                <div className={styles.text}>복호화 수행</div>
                            </div>
                        </div>
                    </li>
                    <li className={styles.active}>
                        <div className={styles.stepItem}>
                            <span>4</span>
                            <div className={styles.textBlock}>
                                <div className={styles.text}>파일 무결성/전자서명 검증</div>
                                <ul className={styles.subList}>
                                    <li className={styles.active_mini}>· 파일 무결성/전자서명 검증 결과</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.stepRow}>
                        <div className={styles.stepItem}>
                            <span>5</span>
                            <div className={styles.text}>키 검색 및 원본 다운로드</div>
                        </div>
                        </div>
                    </li>
                </ul>
                </aside>

                <main className={styles.main}>
                    <h2>복호화</h2>

                    <div className={styles.uploadBox}>
                        <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                            복호화 및 무결성 검증 결과입니다.
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
                            <p><strong>📄 파일명:</strong> {fileName || "로딩 중..."}</p>
                            <p><strong>⏱ 검사 시간:</strong> {checkTime || "로딩 중..."}</p>
                            <p><strong>✅ 파일 무결성:</strong> {integrityStatus || "검사 중..."}</p>
                            <p><strong>📝 전자서명:</strong> {signatureStatus || "검사 중..."}</p>
                        </div>
                        <div className={styles.buttons}>
                                <button className={styles.primary_page} onClick={() => navigate(ROUTES.SEARCH)}>다음</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
