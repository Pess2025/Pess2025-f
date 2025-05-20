import React, { useState, useRef } from 'react';
import styles from './DecodeDo.module.css';
import checkImg from './assets/check.png';
import loadingImg from './assets/loading.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function DecodeDo() {
  const [symmetricDone, setSymmetricDone] = useState(false);
  const [textDecryptionDone, setTextDecryptionDone] = useState(false);

  const navigate = useNavigate();

  // 테스트용 타이머 -> 시간에 따라 상태 보여줌 / 백엔드 개발 후에는 타이머 말고 값 리턴 확인하고 바뀌도록 변경 해야함
  React.useEffect(() => {
    const symTimer = setTimeout(() => setSymmetricDone(true), 2000);
    const textTimer = setTimeout(() => setTextDecryptionDone(true), 4000);
    return () => {
      clearTimeout(symTimer);
      clearTimeout(textTimer);
    };
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
            <li className={styles.active}>
                <div className={styles.stepItem}>
                    <span>3</span>
                    <div className={styles.textBlock}>
                        <div className={styles.text}>복호화 수행</div>
                        <ul className={styles.subList}>
                                <li className={styles.active_mini}>· 대칭키 복호화</li>
                                <li className={symmetricDone ? styles.active_mini : styles.active_already}>· 텍스트 파일 복호화</li>
                        </ul>
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

          {/* 전자봉투에서 대칭키 복호화 */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>전자봉투에서 대칭키 복호화</div>
            <div className={styles.blockBody}>
              <p>{symmetricDone ? '대칭키 복호화가 완료 되었습니다.' : '대칭키 복호화 중 입니다.'}</p>
              <img src={symmetricDone ? checkImg : loadingImg} alt="상태 이미지" className={styles.statusIcon} />
            </div>
          </div>

          <div className={styles.arrow}>↓</div>

          {/* 대칭키로 텍스트 파일 복호화 */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>대칭키로 텍스트 파일 복호화</div>
            <div className={styles.blockBody}>
              <p>{textDecryptionDone ? '텍스트 파일 복호화가 완료 되었습니다.' : '텍스트 파일 복호화 중 입니다.'}</p>
              <img src={textDecryptionDone ? checkImg : loadingImg} alt="상태 이미지" className={styles.statusIcon} />
            </div>
          </div>

          {/* 완료되었을 때만 다음 버튼 */}
          {symmetricDone && textDecryptionDone && (
            <div className={styles.buttons}>
              <button className={styles.primary} onClick={() => navigate(ROUTES.RESULT)}>다음</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
