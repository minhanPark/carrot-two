import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 flex flex-col space-y-5">
      <div className="bg-white p-10 rounded-2xl shadow-xl group">
        <span className="font-semibold text-3xl">Select Item</span>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex justify-between my-2 first-of-type:bg-blue-500"
          >
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="text-gray-500">Grey Desk</span>
          <span className="font-semibold">$180</span>
        </div>
        <div className="mt-2 pt-2 border-t-2 border-dashed flex justify-between">
          <span>Total</span>
          <span className="font-semibold">$199</span>
        </div>
        <div className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-2/3 mx-auto group-hover:text-red-500">
          Checkout
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <div className="space-x-2">
          <button className="w-5 h-5 bg-yellow-500 rounded-full focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
          <button className="w-5 h-5 bg-indigo-500 rounded-full focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
          <button className="w-5 h-5 bg-teal-500 rounded-full focus:ring-2 ring-offset-2 ring-teal-500 transition" />
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
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
        <div className="bg-[url('/vercel.svg')]"></div>
        <h2 className="text-[1000px] text-[#000]">dddd</h2>
      </div>
    </div>
  );
};

export default Home;
