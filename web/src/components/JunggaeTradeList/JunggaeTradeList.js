import React from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeList.scss';

/**
 * contractInfoList 인덱스
 */
const TYPE = 0;
const STATE = 1;

/**
 * contractType 인덱스
 */
const TRADE = 1;
const RENT = 2;

/**
 * contract state
 * 1 - 계약금 입금
 * 2 - 중도금 입금
 * 3 - 잔금 입금
 * 4 - 등기 등록 신청
 * 5 - 확정일자
 * 100 - 완료
 */
const DOWN_PAYMENT = 1;
const MIDDLE_PAYMENT = 2;
const FINAL_PAYMENT = 3;
const REGISTRATION = 4;
const FIXED_DATE = 5;
const COMPLETED_CONTRACT = 100;

/**
 * activeTab 인덱스
 * 0 - 진행중거래 탭
 * 1 - 완료된거래 탭
 */
const ONGOING_TAB = 0;
const COMPLETED_TAB = 1;

/**
 * list class name
 * 1 - active
 * 2 - first-not-active
 * 3 - INACTIVE
 */
const ACTIVE = 1;
const FIRST_NOT_ACTIVE = 2;
const INACTIVE = 3;

const getListClassName = listClassName => {
  if (listClassName === ACTIVE) {
    return 'active';
  }
  if (listClassName === FIRST_NOT_ACTIVE) {
    return 'first-not-active';
  }
  if (listClassName === INACTIVE) {
    return ''; // className = '' 가 괜찮은지 확인요망
  }
};

const getListItem = (handleSelect, listItemIndex, listClassName) => {
  let itemType;

  switch (listItemIndex) {
  case DOWN_PAYMENT:
    itemType = '계약금';
    break;

  case MIDDLE_PAYMENT:
    itemType = '중도금';
    break;

  case FINAL_PAYMENT:
    itemType = '잔금';
    break;

  case REGISTRATION:
    itemType = '등기신청';
    break;

  case FIXED_DATE:
    itemType = '확정일자';
    break;

  case COMPLETED_CONTRACT:
    itemType = '완료';
    break;

  default:
  }
  return (
    <li className={getListClassName(listClassName)} onClick={handleSelect}>
      {itemType}
    </li>
  );
};

const getTradeProgressbarList = (handleSelect, contractState) => {
  const contractFlow = [
    DOWN_PAYMENT,
    MIDDLE_PAYMENT,
    FINAL_PAYMENT,
    REGISTRATION,
    COMPLETED_CONTRACT
  ];
  const progressbarList = [];

  contractFlow.forEach(flow => {
    if (flow < contractState) {
      progressbarList.push(getListItem(handleSelect, flow, ACTIVE));
    } else if (flow === contractState) {
      progressbarList.push(getListItem(handleSelect, flow, FIRST_NOT_ACTIVE));
    } else {
      progressbarList.push(getListItem(handleSelect, flow, INACTIVE));
    }
  });

  return progressbarList;
};

const getRentProgressbarList = (handleSelect, contractState) => {
  const contractFlow = [
    DOWN_PAYMENT,
    FINAL_PAYMENT,
    FIXED_DATE,
    COMPLETED_CONTRACT
  ];
  const progressbarList = [];

  contractFlow.forEach(flow => {
    if (flow < contractState) {
      progressbarList.push(getListItem(handleSelect, flow, ACTIVE));
    } else if (flow === contractState) {
      progressbarList.push(getListItem(handleSelect, flow, FIRST_NOT_ACTIVE));
    } else {
      progressbarList.push(getListItem(handleSelect, flow, INACTIVE));
    }
  });

  return progressbarList;
};

const getProgressbarList = (handleSelect, contractType, contractState) => {
  if (contractType === TRADE) {
    return getTradeProgressbarList(handleSelect, contractState);
  }
  if (contractType === RENT) {
    return getRentProgressbarList(handleSelect, contractState);
  }
};

const getCard = (handleSelect, contractType, contractState) => {
  let contractData;
  if (contractType === TRADE) {
    contractData = <p>매매 / 10억</p>;
  }
  if (contractType === RENT) {
    contractData = <p>전,월세 / 1000/45 </p>;
  }

  const card = (
    <div className="card">
      <p className="no">No. mxabcff</p>
      <div className="content">
        <div className="detail">
          <div className="image">
            <img src={maemulImage} alt="maemul" />
          </div>
          <div>
            <p>준영타워팰리스</p>
            <p>단독주택</p>
            <p>수원시 영통구 이의동 센트럴타운로 76</p>
            {contractData}
          </div>
        </div>
      </div>
      <div className="progressbar-wrapper">
        <ul className="progressbar">
          {getProgressbarList(handleSelect, contractType, contractState)}
        </ul>
      </div>
    </div>
  );

  return card;
};

const getLists = (handleSelect, contractInfoList, activeTab) => {
  const cards = [];
  Array.from(contractInfoList)
    .reverse()
    .forEach(contractInfo => {
      const contractType = contractInfo[TYPE];
      const contractState = contractInfo[STATE];
      if (activeTab === ONGOING_TAB) {
        if (contractState !== COMPLETED_CONTRACT) {
          cards.push(getCard(handleSelect, contractType, contractState));
        }
      } else if (activeTab === COMPLETED_TAB) {
        if (contractState === COMPLETED_CONTRACT) {
          cards.push(getCard(handleSelect, contractType, contractState));
        }
      }
    });
  return cards;
};

const JunggaeTradeList = ({ handleSelect, contractInfoList, activeTab }) => {
  console.log('Entry : JunggaeTradeList');
  return (
    <div className="JunggaeTradeList">
      <div className="list-wrapper">
        {getLists(handleSelect, contractInfoList, activeTab)}
      </div>
      <div className="sidebar">
        <button>
          <Link to="/contract/edit">계약 올리기</Link>
        </button>
      </div>
    </div>
  );
};

export default JunggaeTradeList;
