import React, { useState, useRef } from 'react';
import styles from './Encode.module.css';
import uploadIcon from './assets/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function Encode() {

  const [privateKeyFile, setPrivateKeyFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);

  const privateInputRef = useRef();
  const publicInputRef = useRef();

  const handlePrivateFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPrivateKeyFile(file.name);
  };

  const handlePublicFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPublicKeyFile(file.name);
  };

  const navigate = useNavigate();

  const privateDropRef = useRef();
  const publicDropRef = useRef();
  
  const handlePrivateDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPrivateKeyFile(file.name);
  };
  
  const handlePublicDrop = (e) => {
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
            <li className={styles.active}>
                <div className={styles.stepItem}>
                    <span>1</span> 
                    <div className={styles.textBlock}>
                        <div className={styles.text}>암호화 준비</div>
                        <ul className={styles.subList}>
                            <li className={styles.active_mini}>· (선택)기존 키 불러오기</li>
                            <li className={styles.active_already}>· 개인 키 생성</li>
                            <li className={styles.active_already}>· 공개 키 생성</li>
                        </ul>
                    </div>
                </div>
            </li>
            <li>
                <div className={styles.stepRow}>
                <div className={styles.stepItem}>
                    <span>2</span>
                    <div className={styles.text}>비밀번호 파일 업로드</div>
                </div>
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
          <div className={styles.headerRow}>
            <h2>암호화</h2>
            <div className={styles.noKeyGroup}>
              <p className={styles.noKeyText}>키가 없다면? →</p>
              <button className={styles.keyButton} onClick={() => navigate(ROUTES.ENCODE_MAKE_PRIVATE)}>새로운 키 생성하기</button>
            </div>
          </div>
          <div
            className={styles.uploadBox_privateKey}
            onDrop={handlePrivateDrop}
            onDragOver={handleDragOver}
            onClick={() => privateDropRef.current.querySelector('input').click()}
            ref={privateDropRef}
          >
            <p className={styles.uploadTitle}>개인 키 파일 업로드</p>
            <div className={styles.uploadArea}>
              {privateKeyFile ? (
                <p className={styles.fileName}>선택된 파일: {privateKeyFile}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handlePrivateFileChange} ref={privateInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.outlined} onClick={() => {setPrivateKeyFile(null);;  if (privateInputRef.current) {privateInputRef.current.value = '';}}}>취소</button>
          </div>
          
          <div
            className={styles.uploadBox_publicKey}
            onDrop={handlePublicDrop}
            onDragOver={handleDragOver}
            onClick={() => publicDropRef.current.querySelector('input').click()}
            ref={publicDropRef}
          >
            <p className={styles.uploadTitle}>공개 키 파일 업로드</p>
            <div className={styles.uploadArea}>
              {publicKeyFile ? (
                <p className={styles.fileName}>선택된 파일: {publicKeyFile}</p>
              ) : (
                <>
                  <p>파일을 드래그 해서 올려주세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handlePublicFileChange} ref={publicInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={() => navigate(ROUTES.DECODE_READY)}>완료</button>
            <button className={styles.outlined} onClick={() => {setPublicKeyFile(null);;  if (publicInputRef.current) {publicInputRef.current.value = '';}}}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
