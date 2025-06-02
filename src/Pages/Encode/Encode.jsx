/**
 * 파일명 : Encode.jsx
 * 설명 : 개인키, 공개키 업로드를 통한 암호화 준비 화면입니다.
 *
 * 작성자 : 진채민, 정여진
 * 작성일 : 2025.05.22.~2025.05.26.
 * */

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


    /**
     * 사용자가 파일 선택창을 통해서 개인 키 업로드 시 호출되는 함수입니다.
     * 즉, <input type="file"/> 을 통해 파일을 선택한 경우
     *
     * 1. 사용자가 선택한 파일을 가져옴.
     * 2. 그 파일을 상태값에 저장하고 (setPrivateKeyFile)
     * 3. 업로드 요청(POST)
     * */
    const handlePrivateFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPrivateKeyFile(file);

            // 바로 업로드 시도
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("/api/keys/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("개인 키 업로드 성공");
                setIsUploadSuccess(true);
            } catch (e) {
                alert("개인 키 업로드 실패");
                setIsUploadSuccess(false);
            }
        }
    };

    const handlePublicFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPublicKeyFile(file);

            const formData = new FormData();
            formData.append("file", file);

            try {
                await axios.post("/api/keys/upload-public", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("공개 키 업로드 성공");
            } catch (e) {
                alert("공개 키 업로드 실패");
            }
        }
    };

    const navigate = useNavigate();

    const privateDropRef = useRef();
    const publicDropRef = useRef();


    /**
     * 사용자가 파일을 드롭했을 때 호출됩니다. 마우스로.
     * 1. 브라우저 기본 동작은 방지
     * 2. 드롭된 파일을 가져옴
     * 3. 상태값을 저장하고 서버로 업로드합니다.
     * */
    const handlePrivateDrop = async (e) => {
        e.preventDefault(); // 기본 동작 방지.
        const file = e.dataTransfer.files[0];
        if (file) {
            setPrivateKeyFile(file);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("/api/keys/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("개인 키 업로드 성공");
                setIsUploadSuccess(true);
            } catch (e) {
                alert("개인 키 업로드 실패");
                setIsUploadSuccess(false);
            }
        }
    };

    const handlePublicDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setPublicKeyFile(file);

            const formData = new FormData();
            formData.append("file", file);

            try {
                await axios.post("/api/keys/upload-public", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("공개 키 업로드 성공");
            } catch (e) {
                alert("공개 키 업로드 실패");
            }
        }
    };


    //
    const handleDragOver = (e) => e.preventDefault();

    /**
     * 백엔드에서 새로운 개인키를 생성하고, 해당 키 파일을 사용자가 자동 다운로드 받을 수 있게 해주는 함수입니다.
     * */
    const handlePrivateGenerateKey = async () => {
        try {
            const res = await axios.post("/api/keys/generate", null, {
                responseType: "blob",
            }); // binary 로 받기

            const blob = new Blob([res.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob); // 브라우저에서 자동 다운로드 받을 수 있음.
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

    const handlePublicGenerateKey = async () => {
        try {
            const res = await axios.post("/api/keys/generate", null, {
                responseType: "blob",
            }); // binary 로 받기

            const blob = new Blob([res.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob); // 브라우저에서 자동 다운로드 받을 수 있음.
            const link = document.createElement("a");
            link.href = url;
            link.download = "public.key";
            document.body.appendChild(link);
            link.click();
            link.remove();

            alert("공개키 생성 및 다운로드 완료");
        } catch (e) {
            alert("공개키 생성 실패");
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
                            <button className={styles.keyButton} onClick={handlePrivateGenerateKey}>
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

                    <div className={styles.noKeyGroup}>
                        <p className={styles.noKeyText}>키가 없다면? →</p>
                        <button className={styles.keyButton} onClick={handlePublicGenerateKey}>
                            새로운 키 생성하기
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
                                <p className={styles.fileName}>선택된 파일: {publicKeyFile.name}</p>
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
