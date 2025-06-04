/*
* 파일명 : Main.jsx
* 설명 : PESS(전자봉투 기반 비밀번호 파일 보관 시스템) 소개 및 기능 안내 메인 페이지
* 작성자 : 정여진
* 작성일 : 2025.05.18.
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Main.css';
import numberIcon from './number_icon.png';
import api from '../../Common/api.js';


const Main = () => {
    const navigate = useNavigate();
    const [showFeatures, setShowFeatures] = useState(false);
    const [message, setMessage] = useState('');
    const toggleFeatures = () => {
        setShowFeatures(prev => !prev);
    };
    const featureList = [
        {
            title: '전자봉투 기반 비밀번호 파일 암호화 및 복호화',
            description: '사용자가 업로드한 .txt 파일을 AES 대칭키로 암호화 \n\n 이 AES 키는 RSA 공개키로 암호화되어,\n 함께 전자봉투(envelope) 형태로 구성됨 \n\n 전자봉투는 서버에 안전하게 저장되며, 사용자는 개인키를 \n 1회만 다운로드하여 직접 보관 \n\n 복호화 시, 전자봉투를 열어 AES 키를 복원하고 파일 내용을 해독'
        },
        {
            title: '전자서명을 통한 위변조 방지',
            description: '암호화 당시의 파일 해시값에 대해 서버의 개인키로 전자서명 생성 \n\n 복호화 시, 공개키로 전자서명 검증 \n → 데이터가 위조 되지 않았음을 확인 가능'
        },
        {
            title: '무결성 검증용 해시값 저장',
            description: '파일 업로드 시 SHA-256 해시값을 계산해 전자봉투 내부에 포함 \n\n 복호화 후 다시 해시값을 계산하여 비교 → 중간 변경, 손상 여부 탐지'
        },
        {
            title: '비밀번호 정보 검색/관리 (Map 구조 활용)',
            description: '복호화된 파일은 키-값 구조로 자동 변환됨 \n (예: "gmail → p@ssword1234") \n\n 용자는 검색창에서 서비스명 입력 → 관련 비번 바로 확인 가능'
        }
    ];

    useEffect(() => {
        api.get('/hello')
            .then(res => {
                console.log('Spring 응답:', res.data);
                setMessage(res.data);
            })
            .catch(err => {
                console.error('API 호출 실패:', err);
            });
    }, []);

    return (
        <div className="main-wrapper">
            <div className="main-content">
                <h1 className="main-title">전자봉투 기반 비밀번호 파일 보관 시스템</h1>

                <div className="project-info-wrapper">
                    <div className="project-info">
                        <div>웹코드보안 기말 프로젝트 (08팀)</div>
                        <div>20220803 정여진, 20220809 진채민</div>
                    </div>
                </div>

                <div className="button-group">
                    <button className="intro-btn" onClick={toggleFeatures}>핵심 기능 소개</button>
                    <button className="start-btn" onClick={() => navigate('/encode')}>암호화</button>
                    <button className="start-btn2" onClick={() => navigate('/decode')}>복호화</button>
                </div>

                <div className={`feature-section ${showFeatures ? 'open' : ''}`}>
                    {featureList.map((feature, idx) => (
                           <div className="feature-box" key={idx}>
                               <div className="left-side">
                                   <div className="icon-number-wrapper">
                                       <img src={numberIcon} alt="ICON" className="number-icon" />
                                       <div className="feature-number">{`0${idx + 1}`}</div>
                                   </div>
                                   <div className="feature-title">{feature.title}</div>
                               </div>
                               <div className="feature-placeholder">
                                 {feature.description.split('\n').map((line, i) => (
                                   <React.Fragment key={i}>
                                     {line}
                                     <br />
                                   </React.Fragment>
                                 ))}
                               </div>
                           </div>
                       ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
