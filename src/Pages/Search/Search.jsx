import React, { useRef } from 'react';
import styles from './Search.module.css';
import searchInput from './assets/search-bar.png';
import searchIcon from './assets/search-icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function Search() {
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
                    <li className={styles.actived}>
                    <div className={styles.stepRow}>
                        <div className={styles.stepItem}>
                            <span>4</span>
                                <div className={styles.text}>파일 무결성/전자서명 검증</div>
                               
                            </div>
                        </div>
                    </li>
                    <li className={styles.active}>
                        <div className={styles.stepItem}>
                            <span>5</span>
                            <div className={styles.textBlock}>
                                <div className={styles.text}>키 검색 및 파일 다운로드</div>
                                <ul className={styles.subList}>
                                        <li className={styles.active_mini}>· 비밀번호 검색 및 파일 다운로드</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                </aside>

                <main className={styles.main}>
                    <h2>복호화</h2>
                    <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                        비밀번호 값은 해시 값으로 제공 됩니다. 서비스 명을 검색해주세요. (ex, Goole)
                    </p>
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
                            전자 봉투 다운로드
                        </p>
                        <div
                            style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                padding: '24px',
                                backgroundColor: '#fafafa',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                justifyContent: 'center', 
                                alignItems: 'center'
                            }}
                        >
                            
                            <a
                                href="/download/original-file"
                                className={styles.outline}
                                style={{ textDecoration: 'none' }}
                            >
                                다운로드
                            </a>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                      <button className={styles.primary} onClick={() => navigate(ROUTES.MAIN)}>종료</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
