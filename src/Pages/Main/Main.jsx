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
                    <button className="start-btn" onClick={() => navigate('/encode')}>암호화 및 복호화 시작하기</button>
                    <button className="start-btn" onClick={() => navigate('/decode')}>복호화</button> {/* 임시 테스트용 */}
                </div>

                <div className={`feature-section ${showFeatures ? 'open' : ''}`}>
                    {[1, 2, 3, 4].map((num) => (
                        <div className="feature-box" key={num}>
                            <div className="left-side">
                                <div className="icon-number-wrapper">
                                    <img src={numberIcon} alt="ICON" className="number-icon" />
                                    <div className="feature-number">{`0${num}`}</div>
                                </div>
                                <div className="feature-title">비밀번호 파일 암호화 후 저장하는 기능</div>
                            </div>
                            <div className="feature-placeholder">
                                여기에 기능 설명이 들어갑니다.
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
