import React, { useState, useRef } from 'react';
import styles from './Decode.module.css';
import uploadIcon from './assets/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function Decode() {
  const [encodeFile, setEncodeFile] = useState(null);
  const [envelopeFile, setEnvelopeFile] = useState(null);

  const encodeFileInputRef = useRef();
  const envelopeInputRef = useRef();

  const handleEncodeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setEncodeFile(file.name);
  };

  const handleEnvelopeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setEnvelopeFile(file.name);
  };

  const navigate = useNavigate();

  const encodeFileDropRef = useRef();
  const envelopeDropRef = useRef();
  
  const handleEncodeFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setEncodeFile(file.name);
  };
  
  const handleEnvelopeDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setEnvelopeFile(file.name);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <ul className={styles.steps}>
            <li className={styles.active}>
                <div className={styles.stepItem}>
                    <span>1</span> 
                    <div className={styles.textBlock}>
                        <div className={styles.text}>암호화 된 파일 업로드</div>
                        <ul className={styles.subList}>
                            <li className={styles.active_mini}>· 파일 업로드</li>
                        </ul>
                    </div>
                </div>
            </li>
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
            className={styles.uploadBox_EncodeFile}
            onDrop={handleEncodeFileDrop}
            onDragOver={handleDragOver}
            onClick={() => encodeFileDropRef.current.querySelector('input').click()}
            ref={encodeFileDropRef}
          >
            <p className={styles.uploadTitle}>암호화 된 파일 업로드</p>
            <div className={styles.uploadArea}>
              {encodeFile ? (
                <p className={styles.fileName}>선택된 파일: {encodeFile}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handleEncodeFileChange} ref={encodeFileInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.outlined} onClick={() => {setEncodeFile(null);;  if (encodeFileInputRef.current) {encodeFileInputRef.current.value = '';}}}>취소</button>
          </div>
          
          <div
            className={styles.uploadBox_Envelope}
            onDrop={handleEnvelopeDrop}
            onDragOver={handleDragOver}
            onClick={() => envelopeDropRef.current.querySelector('input').click()}
            ref={envelopeDropRef}
          >
            <p className={styles.uploadTitle}>전자봉투 업로드</p>
            <div className={styles.uploadArea}>
              {envelopeFile ? (
                <p className={styles.fileName}>선택된 파일: {envelopeFile}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handleEnvelopeFileChange} ref={envelopeInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={() => navigate(ROUTES.DECODE_READY)}>완료</button>
            <button className={styles.outlined} onClick={() => {setEnvelopeFile(null);;  if (envelopeInputRef.current) {envelopeInputRef.current.value = '';}}}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
