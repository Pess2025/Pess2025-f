import React, {useState, useRef} from 'react';
import styles from './Encode.module.css';
import uploadIcon from './assets/upload_icon.png';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../Common/Routes';
import axios from "axios";

export default function Encode() {

    const [privateKeyFile, setPrivateKeyFile] = useState(null);
    const [publicKeyFile, setPublicKeyFile] = useState(null);

    const privateInputRef = useRef();
    const publicInputRef = useRef();

    // 개인키 업로드 여부 확인 상태값
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    const handlePrivateFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setPrivateKeyFile(file);
    };

    const handlePublicFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setPublicKeyFile(file);
    };

    const navigate = useNavigate();

    const privateDropRef = useRef();
    const publicDropRef = useRef();

    const handlePrivateDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setPrivateKeyFile(file);
    };

    const handlePublicDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setPublicKeyFile(file);
    };

    //
    const handleDragOver = (e) => e.preventDefault();
// 서버에 업로드할 준비
    const uploadPrivateKey = async () => {
        if (!privateKeyFile) {
            alert("개인 키 파일을 업로드해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", privateKeyFile);

        try {
            const res = await axios.post("/api/keys/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // 당연히 필수지.
                },
            });
            alert("업로드 성공");
            setIsUploadSuccess(true);
        } catch (e) {
            alert("업로드 실패");
            setIsUploadSuccess(false);
        }
    };

    // 새로운 개인키 만들기
    const handleGenerateKey = async () => {
        try {
            const res = await axios.post("/api/keys/generate", null, {
                responseType: "blob",
            });

            const blob = new Blob([res.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "private.key";
            document.body.appendChild(link);
            link.click();
            link.remove();

            alert("개인키 생성 및 다운로드 완료");
        } catch (e) {
            alert("개인키 생성 실패");
        }
    };

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
                            <button className={styles.keyButton} onClick={handleGenerateKey}>
                                새로운 키 생성하기
                            </button>

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
                                <p className={styles.fileName}>선택된 파일: {privateKeyFile?.name}</p>
                            ) : (
                                <>
                                    <p>파일을 드래그 해서 올려주세요.</p>
                                    <img src={uploadIcon} alt="upload" className={styles.uploadIcon}/>
                                </>
                            )}
                            <input type="file" className={styles.inputHidden} onChange={handlePrivateFileChange}
                                   ref={privateInputRef}/>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.outlined} onClick={() => {
                            setPrivateKeyFile(null);

                            if (privateInputRef.current) {
                                privateInputRef.current.value = '';
                            }
                        }}>취소
                        </button>
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
                                    <img src={uploadIcon} alt="upload" className={styles.uploadIcon}/>
                                </>
                            )}
                            <input type="file" className={styles.inputHidden} onChange={handlePublicFileChange}
                                   ref={publicInputRef}/>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className={styles.primary}
                            onClick={() => {
                                if (isUploadSuccess) {
                                    navigate(ROUTES.ENCODE_READY);
                                } else {
                                    alert("먼저 개인 키를 업로드해주세요.");
                                }
                            }}
                        >
                            완료
                        </button>

                        <button className={styles.outlined} onClick={() => {
                            setPublicKeyFile(null);

                            if (publicInputRef.current) {
                                publicInputRef.current.value = '';
                            }
                        }}>취소
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
