import React, { useState, useRef } from 'react';
import TopHeader from '../../Common/TopHeader/TopHeader';
import styles from './Decode.module.css';
import uploadIcon from './assets/upload_icon.png';

export default function Decode() {
  const [fileName, setFileName] = useState(null);
  const dropRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <ul className={styles.steps}>
            <div className = {styles.onrBlock}>
                <li className={styles.active}>
                    <div className={styles.stepRow}>
                    <div className={styles.stepItem}>
                        <span>1</span> 
                        <div className={styles.text}>
                            암호화 된 파일 업로드
                            <ul>
                                <li className={styles.active_mini}>파일 업로드</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </li>
            </div>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>2</span>
                    <div className={styles.text}>복호화 준비</div>
                </div>
                </div>
            </li>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>3</span>
                    <div className={styles.text}>복호화 수행</div>
                </div>
                </div>
            </li>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>4</span>
                    <div className={styles.text}>파일 무결성/전자서명 검증</div>
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
          <div
            className={styles.uploadBox}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => dropRef.current.querySelector('input').click()}
            ref={dropRef}
          >
            <p className={styles.uploadTitle}>암호화 된 파일 업로드</p>
            <div className={styles.uploadArea}>
              {fileName ? (
                <p className={styles.fileName}>선택된 파일: {fileName}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handleFileChange} />
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary}>완료</button>
            <button className={styles.outlined}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
