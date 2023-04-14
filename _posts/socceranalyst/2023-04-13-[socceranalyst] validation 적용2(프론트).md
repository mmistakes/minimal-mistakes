---
categories: "socceranalyst"
tag: ["validation", "react", "toyproject"]
---

# validation 적용 범위

validation 적용 범위를 다시 생각하게 되었습니다. 왜냐하면 예를 들어서 DB 에서 password 필드를 중간에 다음과 같이 체크를 통해 변경해본다고 하겠습니다. (비밀번호는 8자리 이상)

```mysql
ALTER TABLE `your_table_name`
ADD CONSTRAINT `chk_pw_length` CHECK (LENGTH(`pw`) >= 8);
```

그런데 이전에 가입한 사람의 비밀번호가 '1234' 였다면? 체크 적용에 오류가 발생하게 됩니다. 체크를 적용하려면 사용자 비밀번호를 강제로 변경해야 하죠. 사실 상 불가능합니다.

물론 처음에 규칙을 잘 적용시키고 그대로 사용할 수 있지만, validation 은 서비스에 맞춰서 계속해서 변화할 수 있는거니까요... 

**그래서 "DB 에 Check 까지 사용하며 적용할 필요가 있나" 라는 생각이 들었고 서칭을 하게 되었습니다.**

역시 저와 같은 생각을 가진 분들이 많이 있었습니다.

> [stackoverflow 질문/답변](https://stackoverflow.com/questions/1127122/should-data-validation-be-done-at-the-database-level)
>
> ...
>
> I use database validations as a last resort because database trips are generally more expensive than the two validations discussed above.
>
> I'm definitely not saying "don't put validations in the database", but I would say, don't let that be the only place you put validations.
>
> If your data is consumed by multiple applications, then the most appropriate place would be the middle tier that is (should be) consumed by the multiple apps.
>
> ...

다른 것도 몇개 봤는데요. 결국은 DB 를 단일 어플리케이션에서 사용한다면 DB 검증은 복잡성을 높일 뿐이라는 겁니다. (~~chatGPT 는 계속 적용하라고 하던데요~~)

결론은 NotNull, UN, UQ 등만 적용시켜주도록 하겠습니다. 해당 constraints 는 이전 포스팅인 'validation 적용 1'에 있으며 지금부터 프론트 엔드를 수정해보도록 하겠습니다.



# React 에서 Validation 사용

react 에서 validation 은 주로 정규식 표현과 조건문을 통해서 적용되게 됩니다. 저는 react 는 제대로 공부하지 않아 현재 코드가 매우 복잡한데요. validation 을 사용한 signup.js 의 handleSubmit 입니다. 회원가입까지는 구현해놨습니다.

```react
//앞으로 수정할 코드입니다.

...
const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      memberId: data.get('memberId'),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      nickName: data.get('nickName'),
    };
    const { memberId, email, name, password, rePassword, nickName } = joinData;
    // 아이디 유효성 체크
    const memberIdRegex =  /^(?=.*[a-z])\w{4,20}$/;
    if(!memberIdRegex.test(memberId)) setMemberIdError('아이디는 4~20자의 영문 소문자와 숫자로만 입력해주세요.');
    else setMemberIdError('');

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    if (!passwordRegex.test(password))
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    //닉네임 유효성 검사
    const nickNameRegex = /^([a-zA-Z가-힣]+\d*){1,20}$/;
    if (!nickNameRegex.test(nickName) || nickName.length < 1) setNickNameError('올바른 닉네임을 입력해주세요.');
    else setNickNameError('');


    if (
      memberIdRegex.test(memberId) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      nickNameRegex.test(nickName)
      ) {
      onhandlePost(joinData);
    }
  };
...
```

 여기서는 회원가입만 수행하니까 비교적 간단하지만 다른 복잡한 페이지에 validation 까지 들어가면 코드 가독성이 매우 떨어질 것 같습니다. 그래서 validation 을 검증하는 컴포넌트를 만들고 그 안에 검증함수를 만드는 편이 나을 것 같습니다. 

### validation Component

validation 컴포넌트는 /store/validation 디렉토리에 만들었습니다. 검증이 필요한 부분의 검증식을 하나로 다 모았습니다. **selectbox 나 로직으로 범위를 제한한 부분은 프론트에서 검증할 필요는 없습니다.**

예를 들어서 선수를 생성할 때 selectbox 로 position 을 고르게 됩니다. 이렇듯 일반적으로 사용자가 미리 정의된 옵션 중에서 선택하기 때문에 입력 값에 대한 유효성 검사가 필요하지 않습니다. 사용자가 잘못된 방식으로 폼을 조작하거나, 브라우저의 개발자 도구를 사용해 옵션 값을 변경할 수 있습니다. 이런 경우 서버 측에서 유효성 검사를 수행하면 됩니다.

**validation.js** 

```react
import React, { createContext } from 'react';

export const Validation = createContext({
    error: '',
    memberIdValidator: (memberId) => {},
    emailValidator: (email) => {},
    passwordValidator: (password) => {},
    nameValidator: (name) => {},
    nicknameValidator: (nickname) => {},
    rangeValidator: (value, min, max) => {},
    
});

export const ValidationProvider = ({ children }) => {

    const memberIdValidator = (memberId) => {
        const memberIdRegex =  /^(?=.*[a-z])\w{4,20}$/;
        if(!memberIdRegex.test(memberId)) return '아이디는 4~20자의 영문 소문자와 숫자로만 입력해주세요.';
        else return '';
    };

    const emailValidator = (email) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
        else return '';
    };

    const passwordValidator = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
        if (!passwordRegex.test(password)) return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
        else return '';
    };

    const nameValidator = (name, min, max) => {
        const nameRegex = new RegExp(`^[가-힣a-zA-Z]{${min},${max}}$`);
        if (!nameRegex.test(name))  return `글자 수 ${min}~${max} 사이의 올바른 이름을 입력해주세요.`;
        else return '';
        };

    const nicknameValidator = (nickname) => {
        const nickNameRegex = /^([a-zA-Z가-힣]+\d*){1,20}$/;
        if (!nickNameRegex.test(nickname) || nickname.length < 1) return '올바른 닉네임을 입력해주세요.';
        else return '';
    }
        
    const rangeValidator = (value, min, max) => {
        if (value < min || value > max) return `숫자 범위 ${min}~${max} 사이의 값을 입력해주세요.`;
        else return '';
    };

    const contextValue = {
        memberIdValidator,
        emailValidator,
        passwordValidator,
        nameValidator,
        nicknameValidator,
        rangeValidator,

    }

    return (
        <Validation.Provider value={contextValue}>
            {children}
        </Validation.Provider>
    );
}

```

validation 에는 총 6개의 validator 가 있습니다. 각각은 memberId, email, password, name, nickname, range 를 검증합니다.

검증 결과가 오류이면 Error message 를 반환하고 정상이면 Null 값을 반환합니다. 이를 통해서 각 페이지는 검증을 실시하겠습니다.

이때 nameValidator 와 rangeValidator 는 min, max 값을 숫자로 받아서 범위를 설정합니다. 이렇게 설정해서 페이지에서 각 검증로직에 맞게 공통으로 적용할 수 있습니다. 

### Index.js

모든 페이지에서  `Validation` 컨텍스트를 사용하기 위해서, `index.js` 에서 `ValidationProvider`로 감싸겠습니다. 이렇게 하면 모든 페이지에서  `Validation` 컨텍스트의 값에 접근할 수 있습니다.

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './store/auth/auth-context';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import logo from "./public/image/logo.png";
import logoText from "./public/image/logo-text.png";
import './public/css/app.css';
import AuthContext from './store/auth/auth-context';
import { ValidationProvider } from './store/validation/validation';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root'); // #root는 루트 엘리먼트의 id 입니다.

root.render(
  <AuthContextProvider>
    <ValidationProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ValidationProvider>
  </AuthContextProvider>,
  document.getElementById('root')

);
```



# Validation 적용

## signUp.js

먼저 회원가입 폼에서 validation 을 적용시켜보겠습니다. 코드가 길어서 return 값은 뺐습니다. 궁금하신 분은 git 참고해주세요.

```js
const SignUp = () => {
  
  const theme = createTheme();
  const authCtx = useContext(AuthContext);
  const validation = useContext(Validation);
  const [memberIdError, setMemberIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('loaded');
    }
  }, []);

  const onhandlePost = async (data) => {
    const { memberId, email, name, password, nickName } = data;

    authCtx.signup(memberId, email, password, name, nickName);
    navigate('/login');

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      memberId: data.get('memberId'),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      nickName: data.get('nickName'),
    };
    const { memberId, email, name, password, rePassword, nickName } = joinData;
      
    // 아이디 유효성 체크
    const memberIdCheck = validation.memberIdValidator(memberId);
    setMemberIdError(memberIdCheck);

    // 이메일 유효성 체크
    const emailCheck = validation.emailValidator(email);
    setEmailError(emailCheck);

    // 비밀번호 유효성 체크
    const passwordCheck = validation.passwordValidator(password);
    setPasswordState(passwordCheck);

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    setPasswordError('');

    // 이름 유효성 검사
    const nameCheck = validation.nameValidator(name, 1, 20);
    setNameError(nameCheck);
    
    //닉네임 유효성 검사
    const nickNameCheck = validation.nicknameValidator(nickName);
    setNickNameError(nickNameCheck);


    if (
      !memberIdCheck && 
      !emailCheck && 
      !passwordCheck && 
      password === rePassword && 
      !nameCheck && 
      !nickNameCheck
      ) {
        onhandlePost(joinData);
      }
  };
```

**memberId 유효성 체크** 하나만 보겠습니다. 나머지는 똑같으니까요

```js
const memberIdCheck = validation.memberIdValidator(memberId);
setMemberIdError(memberIdCheck);

...
if (
  !memberIdCheck && 
  !emailCheck && 
  !passwordCheck && 
  password === rePassword && 
  !nameCheck && 
  !nickNameCheck
  ) {
    onhandlePost(joinData);
  }
```

 먼저 useContext 를 통해 `const validation = useContext(Validation);` 으로 Validation 선언하여 가져옵니다.

그 다음 validation.memberIdValidator 를 통해 `memberId` 를 넘겨서 유효성 검사를 합니다. 이때 오류이면 오류메세지가, 정상이면 `''` (공백) 이 `memberIdError` 에 들어갑니다.

`memberIdCheck` 가 공백이면 boolean 값이 false 가 되고, 오류메세지가 있으면 true 가 됩니다. 이를 통해 마지막에 `onhandlePost()` 를 실행할지 말지 결정하게 됩니다.

## CreatePlayer.js

선수를 생성, 추가하는 CreatePlayer.js 컴포넌트입니다. 해당 컴포넌트에서 검증할 부분은 PlayerName 입니다. position 은 selectbox 이니 검증하지 않겠습니다.

검증을 실시하는 부분만(submitHandler) 보도록 하겠습니다.

```js
...
const onhandlePost = async (playerName, playerPosition) => {
    setIsLoading(true);
    playerCtx.createPlayer(playerName, playerPosition);
    setIsLoading(false);
    onCancel();
  };

  const submitHandler = async (event) => {    
    //form 의 Submit 이 작동하지 않도록 넣어줍니다.
    event.preventDefault();

    const playerName = PlayerNameInputRef.current.value;
    const playerPosition = PlayerPositionInputRef.current.value;


    //플레이어 이름 유효성 체크
    const playerNameCheck = validation.nameValidator(playerName, 1, 30);
    setPlayerNameError(playerNameCheck);

    if(!playerNameCheck) {
      console.log("onhandlePost");
      onhandlePost(playerName, playerPosition);
    }

  }


  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
};
...
```

위에서 유효성을 체크하는 부분은 `const playerNameCheck = validation.nameValidator(playerName, 1, 30);` 입니다. 1~30 글자의 영문자, 한글입니다.

그리고 선수명 Input box 밑에 다음과 같이 넣어서 에러메세지를 표시해줍니다.

```react
<div>
  <label htmlFor='playerName' class='content'>선수 이름 : </label>
  <input class='input-box' type='text' id='playerName' style={{marginLeft:'15px', width:'150px'}} required ref={PlayerNameInputRef}/>
  <div className='error'>{playerNameError}</div>
</div>
```



## CreateGame.js

다음은 Game 을 생성하는 컴포넌트입니다. 마찬가지로 text input 에만 적용시켜주도록 합니다.

```java
const CreateGameHandler = async (ReqPlayers) => {
        const gameNameInput = GameNameInputRef.current.value;
        const opponentInput = OpponentInputRef.current.value;
        const locationInput = LocationInputRef.current.value;
        const GFInput = GFInputRef.current.value;
        const GAInput = GAInputRef.current.value;
        const createdAtInput = createdAt;

        //gameName validation
        const gameNameCheck = validation.nameValidator(gameNameInput, 1, 100);
        setGameNameError(gameNameCheck);

        //opponent validation
        const opponentCheck = validation.nameValidator(opponentInput, 0, 100);
        setOpponentError(opponentCheck);

        //location validation
        const locationCheck = validation.nameValidator(locationInput, 0, 100);
        setLocationError(locationCheck);

        //GF validation
        const GFCheck = validation.rangeValidator(GFInput, 0, 100);
        setGFError(GFCheck);

        //GA validation
        const GACheck = validation.rangeValidator(GAInput, 0, 100);
        setGAError(GACheck);
        
        if(!gameNameCheck && !opponentCheck && !locationCheck && !GFCheck && !GACheck) {
          setIsLoading(true);
          gameCtx.createGame(gameNameInput, opponentInput, locationInput, GFInput, GAInput, createdAtInput, ReqPlayers);
          setIsLoading(false);   
          navigate('/games');
        }
    }
```

validation 내용은 모두 똑같습니다. 경기를 생성하는 `gameCtx.createGame();` 는 따로 빼주지 않고 바로 실행하도록 하겠습니다. 

마찬가지로 아래와 같이 error 메세지를 출력하도록 설정합니다.

```react
<p><span class='content'>경기명  : </span><input class='input-box-wide' type="text" required ref={GameNameInputRef}/></p>
    <div className='error'>{gameNameError}</div>
    <p><span class='content' style={{marginRight:'15px'}}>위치  : </span><input class='input-box-wide' type="text" required ref={LocationInputRef}/></p>
    <div className='error'>{locationError}</div>
    <p><span class='content' style={{marginRight:'15px'}}>상대  : </span><input class='input-box-wide' type="text" required ref={OpponentInputRef}/></p>
    <div className='error'>{opponentError}</div>
    <p><span class='content' style={{marginRight:'15px'}}>득점  : </span><input class='input-box-wide' type="number" required ref={GFInputRef}/></p>
    <div className='error'>{GFError}</div>
    <p><span class='content' style={{marginRight:'15px'}}>실점  : </span><input class='input-box-wide' type="number" required ref={GAInputRef}/></p>
    <div className='error'>{GAError}</div>
```

![image-20230414204555222](../../images/2023-04-13-[socceranalyst] validation 적용2(프론트)/image-20230414204555222.png)

- bootstrap 의 p 태그가 적용되어서 inputbox 의 아래쪽 margin 1rem 입니다. 디자인이 너무 별로입니다. 슬픕니다. css 는 나중에 만집시다.

## GameDetail.js

경기 정보, 경기에 참여한 선수 기록을 보는 GameDetail 컴포넌트입니다. 해당 컴포넌트에서 검증할 정보는 createGame 과 완전히 똑같아서 검증 코드만 넣어놓겠습니다.

```react
//handleUpdateGame 을 실행하는 함수
  const handleUpdateGameClick = async () => {
    const confirmEdit = window.confirm('경기 내용을 수정하시겠습니까?');
    if(confirmEdit) {
      const gameNameInput = GameNameInputRef.current.value;
      const opponentInput = OpponentInputRef.current.value;
      const locationInput = LocationInputRef.current.value;
      const GFInput = parseInt(GFInputRef.current.value);
      const GAInput = parseInt(GAInputRef.current.value);
      const createdAtInput = createdAt;

      //gameName validation
      const gameNameCheck = validation.nameValidator(gameNameInput, 1, 100);
      setGameNameError(gameNameCheck);
      console.log(gameNameCheck)

      //opponent validation
      const opponentCheck = validation.nameValidator(opponentInput, 0, 100);
      setOpponentError(opponentCheck);

      //location validation
      const locationCheck = validation.nameValidator(locationInput, 0, 100);
      setLocationError(locationCheck);

      //GF validation
      const GFCheck = validation.rangeValidator(GFInput, 0, 100);
      setGFError(GFCheck);

      //GA validation
      const GACheck = validation.rangeValidator(GAInput, 0, 100);
      setGAError(GACheck);

      if(!gameNameCheck && !opponentCheck && !locationCheck && !GFCheck && !GACheck) {
        handleUpdateGame(selectedGame.id, gameNameInput, opponentInput, locationInput, GFInput, GAInput, createdAtInput);
      }
    }
  }
```



# DB 의 Validation

앞서 서술했듯이 단일 앱에서 정보를 받는 DB 의 Validation 은 큰 의미가 없습니다. workbench 를 활용해서 NotNull, UNsigned 정도의 값만 넣도록 합시다.

예를 들어 Member Table 은 다음과 같습니다.

![image-20230414212907146](../../images/2023-04-13-[socceranalyst] validation 적용2(프론트)/image-20230414212907146.png)

저 칸을 밑으로 늘리지 못하겠습니다 ㅠㅠ

저기서 Datatype 은 VARCHAR(255) 인데요. 영문자와 숫자는 utf8mb4(utf-8) 에서 1byte, 특수문자는 1~3bytes, 한글은 3bytes 를 차지한다고 합니다. 즉 한글로만 100글자를 채우는 playerName, gameName, location 등은 VARCHAR(300) 이 되어야 합니다.

하지만 MYSQL 에서는 length information 을 저장하기 위해 1bytes 를 사용하고, 255bytes 가 넘어가면 2bytes 를 사용합니다. 따라서 최소 VARCHAR(302) 는 되어야 합니다.

저는 VARCHAR(255) 이면 무조건 255 만큼의 공간을 차지한다고 생각했었는데요. 그게 아니라 입력된 값만큼만 공간을 차지한다고 합니다... ㅎㅎ

그래서 웬만한 필드는 VARCHAR(255) 로 지정하고, 한글 100글자 이상은 VARCHAR(302) 으로 지정하겠습니다.

# 마치며

이렇게 validation 이 끝났습니다. 아직 부족한 점이 많지만 급한 불은 껐다고 생각하겠습니다.

Validation 에서 중요 변경사항이 있으면 다시 포스팅해보겠습니다.

# 이슈 추가

+추가 1 : gameDetail 페이지에서 선수 추가 시 validation 이 없습니다.

- 다음과 같이 현재 game 내 player 를 filter 로  돌려서 그 id 와 추가되는 player 의 id 를 비교합니다.

- 같은 id 가 있으면 alert('이미 추가된 플레이어입니다.') 를 띄웁니다.

- 함수 내에서 변수 `let state = true` 를 설정해서 false 이면 addPlayer 를 진행하지 않습니다.

- ```react
  const handleAddPlayer = async () => {
      let state = true;
      setAddPlayerState(true);
      const gameId = selectedGame.id;
      const playerId = parseInt(AddplayerIdInputRef.current.value);
      const gamePosition = AddGamePositionInputRef.current.value;
      const mainSub = AddMainSubInputRef.current.value;
  
      selectedGame.gamePlayerResponseDto.filter(player => {
        if(player.id == playerId) {
          window.alert('이미 추가된 플레이어입니다.');
          state = false;
        }
      })
      if(state){
        setIsLoading(true);
        await gameCtx.addPlayer(gameId, playerId, gamePosition, mainSub);
        setIsLoading(false);
        setAddPlayerState(false);
      }
    }
  ```

  

+추가 2 : gameName, Location, Opponent 에 숫자를 못넣습니다.

- 다음과 같은 검증식을 만들어서 적용하겠습니다. (min ~ max 글자 수, 모든 글자 허용)

- ```react
  const volumnValidator = (value, min, max) => {
      const volumnRegex = new RegExp(`^.{${min},${max}}$`);
      if (!volumnRegex.test(value)) return `글자 수 ${min}~${max} 사이의 값을 입력해주세요.`;
      else return '';
  };
  ```

+추가 3 : DB 에서 타입 에러 발생

![image-20230414231212649](../../images/2023-04-13-[socceranalyst] validation 적용2(프론트)/image-20230414231212649.png)

잘 안보이네요... MYSQL 에 location 이 int 로 지정되어있었습니다. 그래서 ec2 의 백엔드 로그파일에 `Incorrect integer value: '' for column 'location' at row 1` 와 같은 오류가 떴습니다.