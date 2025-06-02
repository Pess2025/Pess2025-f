import React, { useState,useEffect, useRef } from 'react';
import styles from './DecodeReady.module.css';
import checkImg from './assets/check.png';
import loadingImg from './assets/loading.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';
import axios from 'axios';

export default function DecodeReady() {
  const [symmetricDone, setSymmetricDone] = useState(false);
  const [error, setError] = useState('');
  const [loadingDone, setLoadingDone] = useState(false);

  const navigate = useNavigate();

 //사용자가 수행 중인지 알 수 있게 타이머 넣어 둠
  React.useEffect(() => {
      const symTimer = setTimeout(() => setLoadingDone(true), 1000);
      return () => {
        clearTimeout(symTimer);
      };
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/decode/check-files")
         .then(response => {
              const files = response.data;
              const allExist = files["password.txt"] && files["password_hash.txt"] && files["envelope.key"] && files["public.key"];
              if (allExist) {
                setSymmetricDone(true);
              } else {
                setError("필요한 파일이 존재 하지 않습니다.");
              }
            })
        .catch(err => {
          console.error(err);
          setError("오류입니다.");
        });
    }, []);

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
            <li className={styles.active}>
                <div className={styles.stepItem}>
                    <span>2</span>
                    <div className={styles.textBlock}>
                      <div className={styles.text}>복호화 준비</div>
                      <ul className={styles.subList}>
                          <li className={styles.active_mini}>· 파일 확인</li>
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
          <div className={styles.block}>
              <div className={styles.blockHeader}>서버에서 복호화에 사용할 파일 확인</div>
              <div className={styles.blockBody}>
                  {loadingDone && error ? (
                            <p style={{ color: 'red' }}>{error}</p>
                  ) : (
                    <>
                        <p>{loadingDone && symmetricDone ? '대상 파일을 확인 했습니다. 복호화가 가능 합니다.' : '파일을 찾는 중 입니다.'}</p>
                        <img src={loadingDone && symmetricDone ? checkImg : loadingImg} alt="상태 이미지" className={styles.statusIcon} />
                    </>
                  )}
              </div>
            </div>
            {/* 완료되었을 때만 다음 버튼 */}
              {symmetricDone && loadingDone && (
                <div className={styles.buttons}>
                  <button className={styles.primary} onClick={() => navigate(ROUTES.DECODE_DO)}>다음</button>
                </div>
              )}
        </main>
      </div>
    </div>
  );
}
