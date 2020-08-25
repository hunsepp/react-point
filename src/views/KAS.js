import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const onChange = e => setValue(e.target.value);
  return {value, onChange};
}

function KAS() {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState(0);
  const [result, setResult] = useState('ready');
  const [list, setList] = useState([]);

  const privateKey = useInput('0x3743fcf1ba8f2c9175674f6f470a8de919a91c3ef54cd6d9276cb011d654c189');
  const inputPublic = useInput('0xa85badfd203ae6fabffa302d5470854eee2385d7');
  const plusToken = useInput(0);
  const inputPrivate = useInput('0x3743fcf1ba8f2c9175674f6f470a8de919a91c3ef54cd6d9276cb011d654c189');
  const minusToken = useInput(0);

  // 개인키로 지갑 연동
  const integrate = () => {
    axios.post('/api/integrate', {privateKey: privateKey.value})
    .then(({data}) => {
      sessionStorage.setItem('walletInstance', JSON.stringify(data));
      setAddress(data.address);
    }, console.log)
  }

  // 지갑 연동 해제
  const removeWallet = () => {
    axios.get('/api/remove')
    .then(() => {
      sessionStorage.clear();
      setAddress(null);
    }, console.log);
  }

  // 토큰 적립
  const saveToken = () => {
    setResult('pending...');
    axios.get('/api/save', {
      params: {
        address: inputPublic.value,
        value: plusToken.value
      }
    })
    .then(({data}) => {
      // 토큰 내역 업데이트
      tokenList();

      // 결과 업데이트
      setResult(
        <a target="_blank" href={`https://baobab.scope.klaytn.com/tx/${data.transactionHash}?tabId=eventLog`}>{data.transactionHash}</a>
      )
    });
  }

  // 토큰 사용
  const useToken = () => {
    setResult('pending...');
    axios.post('/api/use', {
      privateKey: inputPrivate.value, 
      value: minusToken.value
    })
    .then(({data}) => {
      // 토큰 내역 업데이트
      tokenList();

      // 결과 업데이트
      setResult(
        <a target="_blank" href={`https://baobab.scope.klaytn.com/tx/${data.transactionHash}?tabId=eventLog`}>{data.transactionHash}</a>
      )
    });
  }

  // 토큰 적립 사용 내역
  const tokenList = () => {
    axios.get('/api/list')
    .then(({data}) => setList(data.items));
  }

  // 세션에 저장된 지갑이 있을 경우 주소 가져오기
  useEffect(() => {
    // 초기화시 토큰 사용 내역 출력
    tokenList();

    const walletSession = sessionStorage.getItem('walletInstance');

    if(walletSession) {
      try {
        setAddress(JSON.parse(walletSession).address);
      } catch(e) {
        sessionStorage.clear();
      }
    }
  }, []);

  // address 변경 시 클레이 잔액 확인
  useEffect(() => {
    if(!address) return;

    axios.get(`/api/balance/${address}`)
    .then(({data}) => {
      setBalance(data);
    }, console.log);
  }, [address])

  return (
    <div>
      {/* 지갑 연동 후 */}
      {address ? 
        <div>
          <div>address: {address}</div>
          <div>klay: {balance} klay</div>
          <div><button onClick={removeWallet}>연동 해제</button></div>
          <hr />

          <div>
            <div>공개키 : <input type="text" {...inputPublic} /></div>
            <div>포인트 : <input type="number" {...plusToken} /></div>
            <div><button onClick={saveToken}>적립</button></div>
          </div>
          <hr />

          <div>
            <div>개인키 : <input type="text" {...inputPrivate} /></div>
            <div>포인트 : <input type="number" {...minusToken} /></div>
            <div><button onClick={useToken}>사용</button></div>
          </div>
          <hr />
        </div>
      :
      // 지갑 연동 전
        <div>
          <input type="text" {...privateKey} />
          <button onClick={integrate}>연동</button>
        </div>
      }

      <div>결과 : {result}</div>

      {/* 적립 사용 내역 */}
      <div>
        <table>
          <thead>
            <tr>
              <th>from</th>
              <th>to</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {list.map((token, idx) => {
              return (
                <tr key={idx}>
                  <td>{token.from}</td>
                  <td>{token.to}</td>
                  <td>{token.value}</td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KAS;