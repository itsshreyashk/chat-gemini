'use client'

import React, { useEffect, useState, useRef } from 'react'

const Page = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [chatCache, setChatCache] = useState<{
        id: String,
        sentBy: String,
        message: String,
    }[]>([])
    const getResponse = async (): Promise<boolean> => {
        const response = await fetch('http://localhost:8080/api/getResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: textAreaRef.current?.value
            })
        })
        const data = await response.json()
        setChatCache([...chatCache, {
            id: data.id,
            sentBy: "bot",
            message: data.response
        }])
        return true;
    }
    async function addUserMsgAndGetResponse(): Promise<boolean> {
        setChatCache([
            ...chatCache,
            {
                id: 'XYZ',
                sentBy: 'user',
                message: `${textAreaRef.current?.value}`,
            }
        ])

        if (await getResponse()) {
            if (textAreaRef.current) {
                textAreaRef.current.value = "";
            }
            return true;
        } else {
            return false;
        }

    }
    useEffect(() => {
        document.title = "Chat with Gemini"
        document.body.style.backgroundColor = "#212121"
        return () => {
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,0,0" />
            <div className="px-4 py-3 flex space-x-0">
                <button className="btn text-white border border-gray-500 text-sm active:border-white active:border-3 relative btn-neutral btn-small flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-lg ml-2 juice:hidden"><div className="flex w-full gap-2 items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z" fill="currentColor"></path></svg></div></button>
                <div className="space-x-0 py-1 hover:bg-gray-600 cursor-pointer px-3 rounded-lg active:opacity-70">

                    <span className={`px-3 py-1 text-xl font-semibold text-white font-[${'Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'
                        }]`}>ChatGPT</span>
                    <span className='text-gray-200 py-0 relative text-xl'>3.5 <span className="material-symbols-outlined absolute bottom-[-2px]">
                        keyboard_arrow_down
                    </span></span>
                </div>

            </div>
            <div className="bg-[transparent] h-full">
                {
                    chatCache.map((item, index) => (
                        <div key={index} id={`${item.sentBy}-sent-${item.id}`} className='px-4'>
                            <span className='font-bold text-gray-200'>{((item.sentBy) == "bot") ? 'Gemini' : 'User'}</span>
                            <div className="w-full flex justify-center p-2">
                                <span className='text-gray-300 w-[90vw] max-w-[600px] text-sm poppins-regular'>{item.message}</span>
                            </div>
                        </div>
                    ))
                }


            </div>
            <div className="fixed bottom-0 flex w-screen px-2 py-2 items-center justify-center">
                <textarea ref={textAreaRef} id="prompt-textarea" rows={1} placeholder="Message ChatGPT…" className="m-0 backdrop-blur-xl rounded-2xl w-[90%] max-w-[700px] border border-gray-300 outline-none focus:outline-gray-200 focus:outline-4 focus:border-[transparent] text-white w-full resize-none dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh] max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-4 md:pl-6" onKeyPress={async (e: any) => {
                    if (e.key === "Enter") {
                        if (await addUserMsgAndGetResponse()) {
                            console.log('Done');
                        } else {
                            console.log('Problem');

                        }
                    }
                }}></textarea>
                <button type="button" id='send-btn' className='p-2 active:opacity-70' onClick={async (e: any) => {
                    if (await addUserMsgAndGetResponse()) {
                        console.log('Done');
                    } else {
                        console.log('Problem');

                    }
                }}>
                    <span className="material-symbols-outlined bg-white p-2 rounded-xl">
                        arrow_upward
                    </span>
                </button>
            </div>
        </>
    )
}

export default Page