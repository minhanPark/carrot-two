# Next.js 연습

## 자주 쓸만한 기능

### ring

```jsx
<div className="space-x-2">
  <button className="w-5 h-5 bg-yellow-500 rounded-full focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
  <button className="w-5 h-5 bg-indigo-500 rounded-full focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
  <button className="w-5 h-5 bg-teal-500 rounded-full focus:ring-2 ring-offset-2 ring-teal-500 transition" />
</div>
```

ring-2, ring-offset-2, ring-yellow-500 등 링 관련 속성 주면 버튼 예쁘게 꾸미게 가능. transition으로 애니메이션도 처리가능

### group

```jsx
<div className="group">
  <div>
    <div className="group-hover:text-red-500">텍스트</div>
  </div>
</div>
```

부모 엘리먼트의 상태에 기반해서 엘리먼트에게 스타일을 줄 필요가 있을 때 'group' 클래스와 'group-\*' modifier들을 사용하면 됨

> peer 라는 것도 있는데 그룹하고 사용방법은 똑같고, 형제 element의 상태에 기반해서 엘리먼트에 스타일을 줄 수 있음

```jsx
<form className="flex flex-col space-y-2 bg-blue-500 p-5 focus-within:bg-teal-300">
  <div>
    <input
      type="text"
      required
      placeholder="Username"
      className="required:border-2 border-yellow-400 placeholder:text-teal-300 peer"
    />
    <span className="hidden peer-focus:block">유저네임</span>
  </div>
  <div>
    <input
      type="password"
      required
      placeholder="Password"
      className="invalid:bg-red-500 peer"
    />
    <span className="hidden peer-focus:block">패스워드</span>
  </div>
  <input type="submit" value="Login" className="bg-white" />
</form>
```

peer 예시  
폼 등에서 쓰고 싶다면 div 등으로 나눠주면 확실히 peer를 구분해줄 수 있음

### form modifier

```jsx
<form className="flex flex-col space-y-2 bg-blue-500 p-5 focus-within:bg-teal-300">
  <input
    type="text"
    required
    placeholder="Username"
    className="required:border-2 border-yellow-400 placeholder:text-teal-300"
  />
  <input
    type="password"
    required
    placeholder="Password"
    className="invalid:bg-red-500"
  />
  <input type="submit" value="Login" className="bg-white" />
</form>
```

focus-within: 을 주면 form 안에 focus(인풋창 선택 등)가 되었을 때 효과줄 수 있음  
required: 을 주면 필수값일 때 효과줄 수 있음  
placeholder: 을 주면 placeholder에 효과줄 수 있음  
invalid: 을 주면 invalid한 상태일 때 효과줄 수 있음

> selector들은 중첩해서 사용할 수 있다. (file:hover:text-red-500 같은 형태로)

### 반응형

tailwind css는 "모바일 우선"으로 작업 후 브레이크 포인트를 높여나가야 함.

### dark mode

tailwind에서 다크모드를 사용하려면 두가지 방식이 있음

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "media", // 또는 class
};
```

위와 같이 tailwind.config.js 파일에 darkMode를 설정해주면 된다. 기본값은 "media"로 되어있고, media는 브라우저에서 다크모드를 사용하는 지를 받아서 해당 값에 따라 다크모드를 보여준다. class는 페이지에서 다크모드 사용 토글 등이 있어서 그 토글 버튼으로 body에 .dark 등을 전달해주는 방식을 사용할 때 설정이다.

### Just In Time compiler(JIT)

tailwind는 클래스를 사용할 때마다 해당 클래스는 만들어줌(그래서 가벼움).  
또한 내가 원하는 형태의 클래스가 없다면 생성할 수 있다.

```jsx
<div className="bg-[url('/vercel.svg')]"></div>
<h2 className="text-[1000px] text-[#000]">dddd</h2>
```

### React-hook-form에서 에러처리

```jsx
const { handeSubmit } = useForm();
// handleSubmit의 두번째 인수로 onInvalid를 전달하면 더 깔끔하게 에러처리 가능
const onInvalid = (error: FieldErrors) => {
  //error는 필드 중에 에러가 어디에 생겼는 지 알려줌
  //각각의 에러메시지를 설정해서 프론트단에서 깔끔하게 에러를 처리할 수 있다.
};
```

### 하나의 인풋에만 onChange모드를 사용하기?

https://stackoverflow.com/questions/71724431/how-to-apply-mode-onchange-only-to-specific-input-element-in-useform-react-hook  
이런 부분을 보면 많이들 도전하고는 있는 것 같은데 trigger속성과 useFormState를 활용해서 하고 있는 것 같다.  
아니면 watch("email")이런식으로 이메일 부분만 watch하고 상황에 따라 트리거를 발생시켜야하나 ..?  
정확한 답은 발견 못했음

### api에서 받을 때 req.body와 req.body.email의 차이

req.body는 req의 내용을 'content-type' 기준으로 파싱한다.  
그러니 프론트에서 보낼 때 content-type을 지정하지 않으면 req.body에 값은 있어도, req.body.email처럼 바로 접근은 못하게 한다.  
즉 content-type을 프론트에서 지정해주자

```js
fetch("/api/users/enter", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
});
```

여기서 또 중요한건 **JSON.stringify**이다.

> JSON.stringify는 Javascript 값이나 객체를 JSON 문자열로 변환  
> JSON.parse는 JSON 문자열의 구문을 분석하고, 그 결과에서 Javascript 값이나 객체를 생성

콘텐트 타입을 정했으니 JSON으로 변환해서 보내줘야함.  
기본적으로 axios는 "Content-Type": "application/json"이 적용되어 있고, 경험상? 알아서 변환해서 보내준다.

### 인증을 위해서 iron-session을 이용할 수 있음

iron-session은 데이터를 저장하기 위해 서명되고 암호화된 쿠키를 사용하는 Node.js stateless session유틸리티이다.

nextjs에서 모든 api에는 실제 백엔드 없이 개별적으로 동작한다. 그래서 각 페이지마다 type과 설정을 따로 해주어야함

```ts
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
```

가령 위와 같은 설정이다. 그래서 **wrapper를 설정해주면 더 편하게 사용가능**하다.

```ts
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrot-session",
  password: process.env.SESSION_PASSWORD as string,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
```

위와 같은 형태로 wrapper를 만들어가면됨

### 인증을 이용하려면 next-auth많이 이용함

근데 프리즈마에 합치려면 번거롭고 복붙할 부분이 많음.  
iron-session에다가 sns 로그인만 붙이는 방법 찾으면 좋을듯

### Prisma에서 모델의 타입을 만들어 준다.

```js
model Product {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      Int
  image       String
  name        String
  price       Int
  description String   @db.VarChar(2000)
}
```

만약 위와 같이 모델을 만들었다고 하자.  
그러면 프리즈마는 활용할 수 있도록 타입도 만들어준다. 프론트에서는 그 타입을 쓰면 편함.

### 관계 맵핑 되어있는 데이터 불러오기

```js
const product = await client.product.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
```

위처럼 user를 불러오려면 **include**를 이용해서 user를 불러오겠다고 알려줘야한다.  
user값을 다 갖고 오려면 user에 true를 전달하면 되고, 위처럼 selelct를 통해 불러오고 싶은 값만 지정해줘도 된다.

```js
where: {
      id: +id!.toString(),
    },
```

이 부분에서는 [id]가 string, string[], undefined가 될 수 있다고 타입스크립트가 알려줘서 위처럼 처리했다. 니콜라스 강의엔 undefined는 타입에 없었는데 추가되어 있었음. 그래서 ! 처리해줌
