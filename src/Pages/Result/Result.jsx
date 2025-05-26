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

import React, { useRef } from 'react';
import styles from './Result.module.css';
import searchInput from './assets/search-bar.png';
import searchIcon from './assets/search-icon.png';

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
                                <div className={styles.text}>암호화 된 파일 업로드</div>
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

                    <div className={styles.searchBoxWrapper} onClick={() => inputRef.current?.focus()}>
                        <img src={searchInput} alt="Search Bar" className={styles.searchBarImg} />
                        <img src={searchIcon} alt="Search Icon" className={styles.searchIconOverlay} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className={styles.searchInputOverlay}
                        />
                    </div>

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
                            <p><strong>📄 파일명:</strong> secret.txt</p>
                            <p><strong>⏱ 검사 시간:</strong> 2025-05-16 10:12:05</p>
                            <p><strong>✅ 파일 무결성:</strong> 일치</p>
                            <p><strong>📝 전자서명:</strong> 유효함</p>
                            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                                <a
                                    href="/download/original-file"
                                    className={styles.primary}
                                    style={{ textDecoration: 'none' }}
                                >
                                    원본 파일 다운로드
                                </a>
                            </div>
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
