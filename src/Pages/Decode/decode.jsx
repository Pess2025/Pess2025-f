import React, { useState, useRef } from 'react';
import styles from './Decode.module.css';
import uploadIcon from './assets/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';
import axios from 'axios';

export default function Decode() {
  const [privateKeyFile, setPrivateKeyFile] = useState(null);

  const privateKeyInputRef = useRef();

  const handlePrivateKeyFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPrivateKeyFile(file);
  };

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!privateKeyFile) {
      alert("개인키 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('file', privateKeyFile); // 실제 File 객체 전달

    try {
      await axios.post('api/keys/decode/upload', formData);
      alert("개인키 업로드 성공!");
      navigate(ROUTES.DECODE_READY); // 다음 단계로 이동
    } catch (error) {
      console.error(error);
      alert("업로드 실패: 암호화에 사용한 PrivateKey가 아닙니다.");
    }
  };


  const privateKeyDropRef = useRef();

  const handlePrivateKeyDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPrivateKeyFile(file);
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
                        <div className={styles.text}>개인 키 업로드</div>
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
                    <div className={styles.text}>키 검색</div>
                </div>
                </div>
            </li>
          </ul>
        </aside>

        <main className={styles.main}>
          <h2>복호화</h2>
          <div
            className={styles.uploadBox_PrivateKey}
            onDrop={handlePrivateKeyDrop}
            onDragOver={handleDragOver}
            onClick={() => privateKeyInputRef.current?.click()}
            ref={privateKeyDropRef}
          >
            <p className={styles.uploadTitle}>개인 키 파일 업로드(.key)</p>
            <div className={styles.uploadArea}>
              {privateKeyFile ? (
                <p className={styles.fileName}>
                    선택된 파일: {typeof privateKeyFile === 'string' ? privateKeyFile : privateKeyFile.name}
                </p>
              ) : (
                <>
                  <p>파일을 드래그하거나 선택하세요.</p>
                  <img src={uploadIcon} alt="upload" className={styles.uploadIcon} />
                </>
              )}
              <input type="file" className={styles.inputHidden} onChange={handlePrivateKeyFileChange} ref={privateKeyInputRef}/>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={handleUpload}>완료</button>
            <button className={styles.outlined} onClick={() => {setPrivateKeyFile(null);;  if (privateKeyInputRef.current) {privateKeyInputRef.current.value = '';}}}>취소</button>
          </div>
        </main>
      </div>
    </div>
  );
}
