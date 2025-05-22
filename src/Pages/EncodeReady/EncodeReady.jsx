import React, { useState, useRef } from 'react';
import styles from './EncodeReady.module.css';
import uploadIcon from './assets/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function EncodeDo() {

  const [textFile, setTextFile] = useState(null);

  const textFileInputRef = useRef();

  const handleTextFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPublicKeyFile(file.name);
  };

  const navigate = useNavigate();

  const textDropRef = useRef();
 
  
  const handleTextDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPublicKeyFile(file.name);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <ul className={styles.steps}>
            <li>
              <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>1</span> 
                    <div className={styles.textBlock}>
                        <div className={styles.text}>암호화 준비</div> 
                    </div>
                </div>
              </div>
            </li>
            <li className={styles.actived}>
                <div className={styles.stepItem}>
                    <span>2</span>
                    <div className={styles.text}>비밀번호 파일 업로드</div>
                    <ul className={styles.subList}>
                            <li className={styles.active_mini}>· 비밀번호 목록의 파일 업로드</li>
                      </ul>
                
                </div>
            </li>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>3</span>
                    <div className={styles.text}>해시 값 생성 및 전자서명 생성</div>
                </div>
                </div>
            </li>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>4</span>
                    <div className={styles.text}>전자봉투 및 암호문 다운로드</div>
                </div>
                </div>
            </li>
          </ul>
        </aside>

        <main className={styles.main}>
            <h2>암호화</h2>
          <div
            className={styles.uploadBox_textFile}
            onDrop={handleTextDrop}
            onDragOver={handleDragOver}
            onClick={() => textDropRef.current.querySelector('input').click()}
            ref={textDropRef}
          >
            <p className={styles.uploadTitle}>공개 키 파일 업로드</p>
            <div className={styles.uploadArea}>
              {textFile ? (
                <p className={styles.fileName}>선택된 파일: {textFile}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handleTextFileChange} ref={textFileInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={() => navigate(ROUTES.ENCODE_DO)}>완료</button>
            <button className={styles.outlined} onClick={() => {setTextFile(null);;  if (textFileInputRef.current) {textFileInputRef.current.value = '';}}}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
