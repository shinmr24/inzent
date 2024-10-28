import qs from "qs";
import { access_token, is_login } from "./store";

const fastapi = (operation, url, params, success_callback, failure_callback) => {
  let method = operation
  let content_type = 'application/json'
  let body = JSON.stringify(params)

  if(operation === 'login') {
    method = 'post'
    content_type = 'application/x-www-form-urlencoded'
    body = qs.stringify(params)
  }

  let _url = import.meta.env.VITE_SERVER_URL+url

  if(method === 'get') {
    _url += "?" + new URLSearchParams(params)
  }

  let options = {
    method : method,
    headers : {
      "Content-Type" : content_type
    }
  }

  // Store의 값을 비동기적으로 가져오기 위해 구독
  const unsubscribeToken = access_token.subscribe(token => {
    if (is_login) {
      if (token) {
        options.headers["Authorization"] = 'Bearer ' + token; // token을 문자열로 사용
      }
    }
  });

  // Store의 값을 구독하여 로그인 상태 확인
  const unsubscribeLogin = is_login.subscribe(loggedIn => {
    if (loggedIn) {
      // Authorization 헤더 설정
      // 이 부분은 다음에서 수정
    }
  });

  if(method !== 'get') {
    options['body'] = body
  }

  console.log(options);
  
  fetch(_url, options)
    .then(response => {
      if(response.status === 204) {
        success_callback(null);
        console.log('success with no content');
      } else {
        response.json()
          .then(json => {
            if(response.status >= 200 && response.status < 300) {
              if(success_callback) {
                success_callback(json);
                console.log('succ');
              }
            } else {
              if(failure_callback) {
                failure_callback(json);
                console.log('fail');
              } else {
                alert(JSON.stringify(json));
                console.log('fail2');
              }
            }
          })
          .catch(error => {
            alert(JSON.stringify(error));
            console.log('error');
          });
      }
    });

  // 구독 해제
  unsubscribeToken();
  unsubscribeLogin();
}

export default fastapi