import React, { useRef } from 'react';
import styles from './Search.module.css';
import searchInput from './assets/search-bar.png';
import searchIcon from './assets/search-icon.png';

export default function Search() {
    const inputRef = useRef();

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
                                <div className={styles.text}>키 검색 및 원본 다운로드</div>
                                <ul className={styles.subList}>
                                        <li className={styles.active_mini}>· 키 검색 및 원본 파일 다운로드</li>
                                </ul>
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
                            원본 파일 다운로드
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
                                className={styles.primary}
                                style={{ textDecoration: 'none' }}
                            >
                                다운로드
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
