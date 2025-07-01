import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [userData, setUserData] = useState({ site: "", username: "", password: "" })
    const [copyalt, setCopyalt] = useState({ index: null, field: null })
    const [passwordList, setPasswordList] = useState([])
    const [passvalue, setPassvalue] = useState(false)
    const imgRef = useRef(true)
    const passRef = useRef()

    function changeImg(e) {
        if (passvalue) {
            e.target.src = "./eye.png"
            setPassvalue(false)
        } else {
            e.target.src = "./hidden.png"
            setPassvalue(true)
        }
    }

    useEffect(() => {
        const passwords = localStorage.getItem("localpasses")
        if (passwords) {
            setPasswordList(JSON.parse(passwords))
        }
    }, [])


    useEffect(() => {
        if (passvalue) {
            passRef.current.type = "text"
        } else {
            passRef.current.type = "password"
        }
    }, [passvalue])


    function savePassword() {
        const { site, username, password } = userData

        //Check if all fields are empty
        if (!site.trim() || !username.trim() || !password.trim()) {
            alert("Please fill at least one field before saving.")
            return
        }

        setPasswordList([...passwordList, userData])
        localStorage.setItem("localpasses", JSON.stringify([...passwordList, userData]))
        console.log([...passwordList, userData])
        setUserData({ site: "", username: "", password: "" })
        toast('saved pass!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    function copyitem(item) {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(item)

    }

    function editItem(index){
        setUserData(passwordList.filter((_, i) => i === index)[0])
        setPasswordList(passwordList.filter((_, i) => i !== index))
    }

    function deleteItem(index) {
    if (!window.confirm("Are you sure you want to delete this password?")) return;
    const newList = passwordList.filter((_, i) => i !== index);
    setPasswordList(newList);
    localStorage.setItem("localpasses", JSON.stringify(newList));
    toast('Deleted Pass!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
}

    return (
        <div className='rounded-sm sm:min-h-[calc(100vh-118px)] min-h-[calc(100vh-135px)]  dark:text-white'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className='text-center font-bold text-2xl m-4 sm:m-0'><span>&lt;</span>
                <span className='text-emerald-700 dark:text-emerald-500'>Pass</span><span>OP</span>
                <span>/&gt;</span>
            </h1>
            <p className='text-center text-emerald-900 dark:text-emerald-500 text-md font-semibold'>Your own Password Manager</p>
            <div className='sm:hidden text-sm text-center italic underline font-semibold'>(For Mobile Devices: Rotate your device for better view of the table)</div>
            <div className='py-4 lg:px-40 rounded-md mx-auto lg:max-w-6xl md:w-full px-2 mt-4'>
                <div className='w-full flex flex-col gap-3'>
                    <input placeholder='Enter Site URL' value={userData.site} onChange={handleChange} type="text" className='bg-white dark:bg-gray-600 dark:text-white rounded-md px-2 py-2 outline-emerald-400 outline-2 focus:outline-emerald-800 dark:focus:outline-white' name='site' />
                    <div className='flex flex-col md:flex-row justify-center gap-3'>
                        <div className='md:w-1/2'>
                            <input placeholder='Username' value={userData.username} onChange={handleChange} type="text" className='bg-white dark:bg-gray-600 dark:text-white rounded-md px-2 py-2 outline-emerald-400 outline-2 focus:outline-emerald-800 w-full dark:focus:outline-white' name='username' />
                        </div>
                        <div className='flex gap-2 md:w-1/2'>
                            <input placeholder='Password' value={userData.password} onChange={handleChange} type={passvalue ? "text" : "password"} ref={passRef} className='bg-white dark:bg-gray-600 dark:text-white rounded-md px-2 py-0.5 outline-emerald-400 outline-2 focus:outline-emerald-800 w-full dark:focus:outline-white' name='password' />
                        <img src="/eye.png" onClick={(e) => changeImg(e)} alt="showPass" width={40} className='cursor-pointer bg-green-500 p-2 rounded-md' />
                        </div>
                    </div>
                    <button onClick={savePassword} className='cursor-pointer flex justify-center items-center bg-emerald-500 w-fit mx-auto px-3 py-1 rounded-md text-white hover:text-black hover:bg-green-600 my-2'>
                        <lord-icon
                            src={"https://cdn.lordicon.com/tsrgicte.json"}
                            trigger={"hover"}
                            style={{ width: "30px", height: "30px" }}>
                        </lord-icon>Save Pass
                    </button>
                </div>
                <div className={`relative overflow-x-auto mt-4 rounded-md ${passwordList.length !== 0 ? "outline-1" : "outline-0"} outline-gray-300 w-full`}>
                    {passwordList.length === 0 && <div className='text-center font-bold'>No password to show</div>}

                    {passwordList.length !== 0 &&
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-emerald-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Site
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordList.map((password, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 w-full">
                                            <th scope="row" className="max-w-[250px] px-6 py-4 font-medium text-gray-900 break-words dark:text-white hover:underline">
                                                <a href={password.site} target='_blank'>{password.site}</a>
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center justify-between gap-1'>
                                                    <span>{password.username}</span>
                                                    <img src={copyalt.index === index && copyalt.field === "username" ? "/copy.gif" : "/copyhover.png"} onMouseOver={() => setCopyalt({ index, field: "username" })} onMouseOut={() => setCopyalt({ index: null, field: null })} onClick={() => copyitem(password.username)} alt="copy" width={20} className='cursor-pointer' />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center justify-between gap-1'>
                                                    <span>{password.password}</span>
                                                    <img src={copyalt.index === index && copyalt.field === "password" ? "/copy.gif" : "/copyhover.png"} onMouseOver={() => setCopyalt({ index, field: "password" })} onMouseOut={() => setCopyalt({ index: null, field: null })} onClick={() => copyitem(password.password)} alt="copy" width={20} className='cursor-pointer' />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center gap-3'>
                                                    <span className='editicon' onClick={() => editItem(index)}><lord-icon
                                                        src="https://cdn.lordicon.com/fikcyfpp.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon></span>
                                                    <span className='deleteicon' onClick={() => deleteItem(index)}><lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon></span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
