import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
    <div className="p-20 h-[100vh] flex bg-black items-center justify-center">
      <h1 className="text-7xl font-bold text-white text-center">Chat with <Link href={'/chat/gemini'} className="hover:text-green-600 duration-200 hover:underline">Gemini</Link></h1>
      <span className="text-white fixed bottom-4 right-4 font-bold bebas-neue-regular">Powered by <img src="https://www.gstatic.com/lamda/images/gemini_wordmark_landing_page_238102af073d0ae2763aa5.svg" alt="" className="h-8" /></span>
    </div>
    </>
  );
}
