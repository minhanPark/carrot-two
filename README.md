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
