import React, { useState, useRef } from 'react';
import TopHeader from '../../Common/TopHeader/TopHeader';
import styles from './Decode.module.css';
import decodeImage from './assets/Decode.png';

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
      <TopHeader />
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <ol className={styles.steps}>
            <li className={styles.active}><span>1</span> 암호화 된 파일 업로드<ul><li>파일 업로드</li></ul></li>
            <li><span>2</span> 복호화 준비</li>
            <li><span>3</span> 복호화 수행</li>
          </ol>
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
                  <img src={decodeImage} alt="upload" className={styles.uploadIcon} />
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
