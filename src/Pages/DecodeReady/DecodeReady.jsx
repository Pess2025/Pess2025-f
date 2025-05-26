import React, { useState, useRef } from 'react';
import styles from './DecodeReady.module.css';
import uploadIcon from './assets/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function DecodeReady() {
  const [files, setFiles] = useState([]);
  const dropRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 3);
    setFiles(droppedFiles);
  };

  const navigate = useNavigate();

  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3);
    setFiles(selectedFiles);
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
                        <div className={styles.text}>암호화 된 파일 업로드</div>
                    </div>
                </div>
            </li>
            <li className={styles.active}>
                <div className={styles.stepItem}>
                    <span>2</span>
                    <div className={styles.textBlock}>
                      <div className={styles.text}>복호화 준비</div>
                      <ul className={styles.subList}>
                          <li className={styles.active_mini}>· 파일 업로드</li>
                      </ul>
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
            <p className={styles.uploadTitle}>개인 키, 전자 서명, 해시 파일 업로드</p>
            <div className={styles.uploadArea}>
            {files.length > 0 ? (
              <ul className={styles.fileList}>
                {files.map((file, idx) => (
                  <li key={idx} className={styles.fileName}>선택된 파일: {file.name}</li>
                ))}
              </ul>
            ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handleFileChange} multiple />
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={() => navigate(ROUTES.DECODE_DO)}>완료</button>
            <button className={styles.outlined} onClick={() => setFiles([])}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
