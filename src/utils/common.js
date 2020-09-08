import {useState} from 'react';

// 날짜 포맷 변경
function formatDate(date) { 
    const d = new Date(date)
    const year = d.getFullYear(); 
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day; 
    
    return [year, month, day].join('-'); 
}

// 금액에 , 찍기
function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 포인트 구분
function pointType(point) {
    if(point >= 0) return "적립"
    else return "사용"
}

const useInput = (initialState) => {
    const [value, setValue] = useState(initialState);
    const onChange = e => setValue(e.target.value);
    const reset = resetValue => setValue(resetValue);
    return {value, onChange, reset};
}

export {
    formatDate,
    pointType,
    comma,
    useInput
}