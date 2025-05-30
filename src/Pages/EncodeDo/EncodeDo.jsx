import React, { useState } from 'react';
import styles from './EncodeDo.module.css';
import checkImg from './assets/check.png';
import loadingImg from './assets/loading.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Common/Routes';

export default function EncodeDo() {
  const [symmetricDone, setSymmetricDone] = useState(false);

  const navigate = useNavigate();

  // 테스트용 타이머 -> 시간에 따라 상태 보여줌 / 백엔드 개발 후에는 타이머 말고 값 리턴 확인하고 바뀌도록 변경 해야함
  React.useEffect(() => {
    const symTimer = setTimeout(() => setSymmetricDone(true), 2000);
    return () => {
      clearTimeout(symTimer);
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
                            <div className={styles.text}>암호화 준비</div>
                        </div>
                    </div>
                </li>
                <li className={styles.actived}>
                    <div className={styles.stepRow}>
                    <div className={styles.stepItem}>
                        <span>2</span>
                        <div className={styles.text}>비밀번호 파일 업로드</div>
                        </div>
                    
                    </div>
                </li>
                <li className={styles.active}>
                    <div className={styles.stepItem}>
                        <span>3</span>
                        <div className={styles.textBlock}>
                            <div className={styles.text}>해시 값 생성 및 전자서명 생성</div>
                            <ul className={styles.subList}>
                                    <li className={styles.active_mini}>· 파일 암호화</li>
                            </ul>
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

          {/* 해시 값 생성 및 전자서명을 활용하여 암호화 */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>해시 값 생성 및 전자서명을 활용하여 암호화</div>
            <div className={styles.blockBody}>
              <p>{symmetricDone ? '암호화가 완료 되었습니다. ' : '암호화가 진행 중입니다.'}</p>
              <img src={symmetricDone ? checkImg : loadingImg} alt="상태 이미지" className={styles.statusIcon} />
            </div>
          </div>
          {symmetricDone && (
            <div className={styles.buttons}>
              <button className={styles.primary} onClick={() => navigate(ROUTES.ENCODE_DOWNLOAD)}>다음</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
