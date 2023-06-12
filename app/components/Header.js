import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Pie, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import{
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from 'chart.js'

ChartJS.register(LineElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Legend,
  PointElement
  )

  const random = (min= number, max= number) => Math.floor(Math.random() * (max - min + 1) + min)

  

//  const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         backgroundColor: '#E9A0A0',
//         borderColor: 'rgba(13, 202, 240, 1)',
//         pointHoverBackgroundColor: '#fff',
//         borderWidth: 2,
//         data:  [
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                 ],
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: 'Dataset 2',
//         backgroundColor:'#9BDD7C',
//         borderColor: 'rgba(25, 135, 84, 1)',
//         pointHoverBackgroundColor: '#fff',
//         borderWidth: 2,
//         data: [
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                   random(50, 200),
//                 ],
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//     ],
//   };

export default function Header() {

  const{data:session,status} = useSession({required:true})
  const clickPoint = useRef();
  const handleFocus = () => {
      clickPoint.current.style.display = "none";
  };
  const handleBlur = () => {
      clickPoint.current.style.display = "block";
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleImageClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


const [data, setchartData] = useState(
  {
    datasets:[],
  }
); 


useEffect(()=>{
  let prodPrice = [];
  let prodStock = [];
  axios.get('https://www.balldontlie.io/api/v1/games')
      .then(res => {
        // console.log(res.data.data);
        for(const dataObj of res.data.data){
          prodPrice.push(parseInt(dataObj.home_team_score))
          prodStock.push(parseInt(dataObj.visitor_team_score))
        }
      }).catch(err =>{
        console.log(err)
      })
      console.log('dataaa',prodPrice,prodStock)




  setchartData({
    labels: ["John", "Kevin", "Geroge", "Micheal", "Oreo"],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: '#E9A0A0',
        borderColor: 'rgba(13, 202, 240, 1)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: prodPrice,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        backgroundColor:'#9BDD7C',
        borderColor: 'rgba(25, 135, 84, 1)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: prodStock,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
},[])


return (

  <div className='mt-[2rem]- 2xl:w-5/6 lg:w-9/12 sm:w-3/4 w-full h-full sm:px-10'>
     <div className="flex h-20 sm:flex-row flex-col mt-4 px-5 sm:w-full sm:pl-10 sm:mx-auto sm:justify-between sm:items-center">
          <h3 className="text-[24px] font-black">Dashboard</h3>
          <div className="flex items-center justify-between w:[300px] sm:w-[390px]">
            <div className="relative">
              <input
                type="text"
                className="block p-2 pl-10 w-[260px] sm:w-full h-[32px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                placeholder="Search Here..."
                onFocus={handleFocus} 
                onBlur={handleBlur}
              />
              <div className="absolute top-1.5 left-2 items-center" ref={clickPoint}>
                <svg className="w-5 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className='mx-2'>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11.586V8C16 4.783 13.815 2.073 10.855 1.258C10.562 0.52 9.846 0 9 0C8.154 0 7.438 0.52 7.145 1.258C4.185 2.074 2 4.783 2 8V11.586L0.293001 13.293C0.199958 13.3857 0.126171 13.4959 0.0758854 13.6172C0.0256001 13.7386 -0.000189449 13.8687 1.04767e-06 14V16C1.04767e-06 16.2652 0.105358 16.5196 0.292894 16.7071C0.480431 16.8946 0.734785 17 1 17H17C17.2652 17 17.5196 16.8946 17.7071 16.7071C17.8946 16.5196 18 16.2652 18 16V14C18.0002 13.8687 17.9744 13.7386 17.9241 13.6172C17.8738 13.4959 17.8 13.3857 17.707 13.293L16 11.586ZM16 15H2V14.414L3.707 12.707C3.80004 12.6143 3.87383 12.5041 3.92412 12.3828C3.9744 12.2614 4.00019 12.1313 4 12V8C4 5.243 6.243 3 9 3C11.757 3 14 5.243 14 8V12C14 12.266 14.105 12.52 14.293 12.707L16 14.414V15ZM9 20C9.6193 20.0008 10.2235 19.8086 10.7285 19.4502C11.2335 19.0917 11.6143 18.5849 11.818 18H6.182C6.38566 18.5849 6.76648 19.0917 7.27151 19.4502C7.77654 19.8086 8.3807 20.0008 9 20Z" fill="black" />
              </svg>
            </div>
            <div className='h-[50px] w-[70px] align-center cursor-pointer'>
              <img className="rounded-full" width={40} height={40} onClick={handleImageClick} src={session.user.image}/>
                {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul className='bg-gray-100'>
                    <button onClick={() => signOut('Google')} ><li>SignOut</li></button>
                  </ul>
                </div>
                )}
          </div>
          </div>
        </div>

      <div className="grid grid-cols-1 gap-4 mt-9 sm:grid-cols-2 lg:grid-cols-4 w-[320px] sm:w-full justify-items-center mx-auto">
          <div className=" w-full sm:w-[230px] h-[120px] p-4 transition-shadow border rounded-[20px] shadow-sm bg-[#DDEFE0] hover:shadow-lg relative">
              <div className="flex items-start justify-between">
                <div className="flex flex-col mt-8 space-y-2">
                  <span className="text-black text-[14px]">Total Revenues</span>
                  <span className="text-[24px] font-sans font-[700]">$2,129,430</span>
                </div>
                <div className="absolute right-6">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2 12C12.488 12 11.792 12.2111 11.1999 12.6067C10.6079 13.0023 10.1465 13.5645 9.87403 14.2223C9.60156 14.8802 9.53026 15.604 9.66917 16.3023C9.80808 17.0007 10.1509 17.6421 10.6544 18.1456C11.1579 18.6491 11.7993 18.9919 12.4977 19.1308C13.196 19.2697 13.9198 19.1984 14.5777 18.926C15.2355 18.6535 15.7977 18.1921 16.1933 17.6001C16.5889 17.008 16.8 16.312 16.8 15.6C16.8 14.6452 16.4207 13.7295 15.7456 13.0544C15.0705 12.3793 14.1548 12 13.2 12ZM13.2 16.8C12.9627 16.8 12.7307 16.7296 12.5333 16.5978C12.336 16.4659 12.1822 16.2785 12.0913 16.0592C12.0005 15.8399 11.9768 15.5987 12.0231 15.3659C12.0694 15.1331 12.1836 14.9193 12.3515 14.7515C12.5193 14.5836 12.7331 14.4694 12.9659 14.4231C13.1987 14.3768 13.4399 14.4005 13.6592 14.4913C13.8785 14.5822 14.0659 14.736 14.1978 14.9333C14.3296 15.1307 14.4 15.3627 14.4 15.6C14.4 15.9183 14.2736 16.2235 14.0485 16.4485C13.8235 16.6736 13.5183 16.8 13.2 16.8ZM12.348 9.252C12.4621 9.36125 12.5967 9.44689 12.744 9.504C12.8876 9.56749 13.043 9.60028 13.2 9.60028C13.357 9.60028 13.5124 9.56749 13.656 9.504C13.8033 9.44689 13.9379 9.36125 14.052 9.252L16.8 6.552C17.0323 6.31967 17.1628 6.00456 17.1628 5.676C17.1628 5.34744 17.0323 5.03233 16.8 4.8C16.5677 4.56767 16.2526 4.43715 15.924 4.43715C15.5954 4.43715 15.2803 4.56767 15.048 4.8L14.4 5.508V1.2C14.4 0.88174 14.2736 0.576515 14.0485 0.351472C13.8235 0.126428 13.5183 0 13.2 0C12.8817 0 12.5765 0.126428 12.3515 0.351472C12.1264 0.576515 12 0.88174 12 1.2V5.508L11.352 4.8C11.1197 4.56767 10.8046 4.43715 10.476 4.43715C10.1474 4.43715 9.83233 4.56767 9.6 4.8C9.36767 5.03233 9.23715 5.34744 9.23715 5.676C9.23715 6.00456 9.36767 6.31967 9.6 6.552L12.348 9.252ZM21.6 15.6C21.6 15.3627 21.5296 15.1307 21.3978 14.9333C21.2659 14.736 21.0785 14.5822 20.8592 14.4913C20.6399 14.4005 20.3987 14.3768 20.1659 14.4231C19.9331 14.4694 19.7193 14.5836 19.5515 14.7515C19.3836 14.9193 19.2694 15.1331 19.2231 15.3659C19.1768 15.5987 19.2005 15.8399 19.2913 16.0592C19.3822 16.2785 19.536 16.4659 19.7333 16.5978C19.9307 16.7296 20.1627 16.8 20.4 16.8C20.7183 16.8 21.0235 16.6736 21.2485 16.4485C21.4736 16.2235 21.6 15.9183 21.6 15.6ZM22.8 7.2H19.2C18.8817 7.2 18.5765 7.32643 18.3515 7.55147C18.1264 7.77652 18 8.08174 18 8.4C18 8.71826 18.1264 9.02348 18.3515 9.24853C18.5765 9.47357 18.8817 9.6 19.2 9.6H22.8C23.1183 9.6 23.4235 9.72643 23.6485 9.95147C23.8736 10.1765 24 10.4817 24 10.8V20.4C24 20.7183 23.8736 21.0235 23.6485 21.2485C23.4235 21.4736 23.1183 21.6 22.8 21.6H3.6C3.28174 21.6 2.97652 21.4736 2.75147 21.2485C2.52643 21.0235 2.4 20.7183 2.4 20.4V10.8C2.4 10.4817 2.52643 10.1765 2.75147 9.95147C2.97652 9.72643 3.28174 9.6 3.6 9.6H7.2C7.51826 9.6 7.82348 9.47357 8.04853 9.24853C8.27357 9.02348 8.4 8.71826 8.4 8.4C8.4 8.08174 8.27357 7.77652 8.04853 7.55147C7.82348 7.32643 7.51826 7.2 7.2 7.2H3.6C2.64522 7.2 1.72955 7.57928 1.05442 8.25442C0.379285 8.92955 0 9.84522 0 10.8V20.4C0 21.3548 0.379285 22.2705 1.05442 22.9456C1.72955 23.6207 2.64522 24 3.6 24H22.8C23.7548 24 24.6705 23.6207 25.3456 22.9456C26.0207 22.2705 26.4 21.3548 26.4 20.4V10.8C26.4 9.84522 26.0207 8.92955 25.3456 8.25442C24.6705 7.57928 23.7548 7.2 22.8 7.2ZM4.8 15.6C4.8 15.8373 4.87038 16.0693 5.00224 16.2667C5.13409 16.464 5.32151 16.6178 5.54078 16.7087C5.76005 16.7995 6.00133 16.8232 6.23411 16.7769C6.46689 16.7306 6.6807 16.6164 6.84853 16.4485C7.01635 16.2807 7.13064 16.0669 7.17694 15.8341C7.22324 15.6013 7.19948 15.3601 7.10865 15.1408C7.01783 14.9215 6.86402 14.7341 6.66668 14.6022C6.46934 14.4704 6.23734 14.4 6 14.4C5.68174 14.4 5.37652 14.5264 5.15147 14.7515C4.92643 14.9765 4.8 15.2817 4.8 15.6Z" fill="black"/>
                </svg>
                </div>
              </div>
            </div>
            <div className=" w-full sm:w-[230px] h-[120px] p-4 transition-shadow border rounded-[20px] shadow-sm bg-[#F4ECDD] hover:shadow-lg relative">
              <div className="flex items-start justify-between">
                <div className="flex flex-col mt-8 space-y-2">
                  <span className="text-black text-[14px]">Total Revenues</span>
                  <span className="text-[24px] font-sans font-bold">$2,129,430</span>
                </div>
                <div className="absolute right-6">
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.53233 6.27406C4.78083 6.52048 5.11661 6.65874 5.46657 6.65874C5.81653 6.65874 6.15232 6.52048 6.40081 6.27406C6.52318 6.15278 6.62031 6.00845 6.6866 5.84943C6.75288 5.6904 6.78701 5.51982 6.78701 5.34753C6.78701 5.17524 6.75288 5.00466 6.6866 4.84564C6.62031 4.68661 6.52318 4.54229 6.40081 4.42101C6.15232 4.17459 5.81653 4.03633 5.46657 4.03633C5.11661 4.03633 4.78083 4.17459 4.53233 4.42101C4.01807 4.93355 4.01807 5.76323 4.53233 6.27406ZM19.6533 13.988C19.9737 13.6705 20.228 13.2927 20.4016 12.8763C20.5752 12.46 20.6645 12.0134 20.6645 11.5624C20.6645 11.1113 20.5752 10.6647 20.4016 10.2484C20.228 9.83207 19.9737 9.45425 19.6533 9.13677L11.4937 1.0286C10.8484 0.388352 9.97715 0.0275497 9.06811 0.0240828L3.47296 8.39041e-05C3.01798 -0.00309353 2.5669 0.084005 2.14582 0.256338C1.72474 0.42867 1.34202 0.682813 1.01982 1.00406C0.697618 1.3253 0.442341 1.70726 0.268757 2.12783C0.0951729 2.5484 0.00673103 2.99922 0.00855446 3.4542L0.049696 9.2362C0.0571117 10.1382 0.420628 11.0008 1.06108 11.6361L9.10068 19.6243C9.74973 20.2672 10.6264 20.6279 11.54 20.6279C12.4536 20.6279 13.3302 20.2672 13.9793 19.6243L19.6533 13.988ZM18.4328 10.3487C18.593 10.5075 18.7202 10.6964 18.8069 10.9045C18.8937 11.1127 18.9384 11.336 18.9384 11.5615C18.9384 11.787 18.8937 12.0103 18.8069 12.2185C18.7202 12.4267 18.593 12.6156 18.4328 12.7743L12.7588 18.414C12.0851 19.0826 10.9932 19.0826 10.3195 18.414L2.27987 10.4241C1.9602 10.1063 1.77906 9.67499 1.7759 9.2242L1.73304 3.4422C1.7319 3.21453 1.77598 2.98891 1.86274 2.77841C1.94949 2.56792 2.07719 2.37676 2.23841 2.21601C2.39964 2.05526 2.59118 1.92814 2.80193 1.84201C3.01268 1.75588 3.23844 1.71247 3.4661 1.71428L9.06125 1.73828C9.51607 1.73979 9.95203 1.92021 10.2749 2.24054L18.4345 10.3487H18.4328ZM20.5755 14.9993C20.8058 15.6156 20.8539 16.2851 20.7141 16.928C20.5743 17.5709 20.2524 18.1599 19.787 18.6249L16.4203 21.9916C15.7836 22.6283 15.0277 23.1334 14.1958 23.478C13.3638 23.8226 12.4722 24 11.5717 24C10.6712 24 9.77956 23.8226 8.94763 23.478C8.1157 23.1334 7.3598 22.6283 6.72308 21.9916L0.754234 16.0227C0.271885 15.541 0.000585556 14.8874 -1.52588e-05 14.2057V12.8686L6.72308 19.5917C6.84136 19.71 6.96307 19.8231 7.08649 19.9294L7.93502 20.7796C8.41257 21.2572 8.97952 21.6361 9.60351 21.8946C10.2275 22.1531 10.8963 22.2862 11.5717 22.2862C12.2471 22.2862 12.9159 22.1531 13.5399 21.8946C14.1639 21.6361 14.7308 21.2572 15.2084 20.7796L16.0638 19.9242C16.1864 19.8176 16.3054 19.7066 16.4203 19.5917L19.787 16.225C20.1349 15.8779 20.4039 15.4599 20.5755 14.9993Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className=" w-full sm:w-[230px] h-[120px] p-4 transition-shadow border rounded-[20px] shadow-sm bg-[#EFDADA] hover:shadow-lg relative">
              <div className="flex items-start justify-between">
                <div className="flex flex-col mt-8 space-y-2">
                  <span className="text-black text-[14px]">Total Revenues</span>
                  <span className="text-[24px] font-sans font-bold">$2,129,430</span>
                </div>
                <div className="absolute right-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.538 12.6334C23.0273 11.9869 23.2981 11.1948 23.2981 10.3706C23.2981 9.06299 22.5671 7.82528 21.3906 7.13507C21.0877 6.95741 20.7428 6.8639 20.3917 6.86423H13.4081L13.5828 3.28506C13.6236 2.42011 13.3178 1.59886 12.7237 0.972718C12.4321 0.6641 12.0804 0.418552 11.6902 0.251249C11.3 0.0839457 10.8796 -0.0015581 10.455 2.1493e-05C8.94066 2.1493e-05 7.60101 1.01931 7.19912 2.47836L4.69748 11.5355H0.931925C0.416454 11.5355 0 11.952 0 12.4674V23.0681C0 23.5835 0.416454 24 0.931925 24H18.4434C18.7113 24 18.9734 23.9476 19.2151 23.8427C20.6014 23.2515 21.4954 21.8973 21.4954 20.3946C21.4954 20.0277 21.443 19.6665 21.3382 19.3171C21.8274 18.6706 22.0983 17.8784 22.0983 17.0542C22.0983 16.6873 22.0459 16.3262 21.941 15.9767C22.4303 15.3302 22.7011 14.5381 22.7011 13.7139C22.6953 13.3469 22.6429 12.9829 22.538 12.6334ZM2.09683 21.9032V13.6323H4.45577V21.9032H2.09683ZM20.6305 11.6229L19.9927 12.1762L20.3975 12.9159C20.5309 13.1596 20.6 13.4332 20.5985 13.711C20.5985 14.1915 20.3888 14.6487 20.0277 14.9632L19.3899 15.5166L19.7947 16.2563C19.928 16.5 19.9972 16.7736 19.9956 17.0513C19.9956 17.5319 19.7859 17.9891 19.4248 18.3036L18.787 18.8569L19.1918 19.5967C19.3252 19.8403 19.3943 20.1139 19.3928 20.3917C19.3928 21.0441 19.0084 21.6323 18.4143 21.9003H6.31962V13.5391L9.21732 3.04043C9.29204 2.77133 9.45244 2.53393 9.67421 2.36419C9.89598 2.19445 10.167 2.10162 10.4463 2.09976C10.6676 2.09976 10.886 2.16383 11.0608 2.29489C11.3491 2.51039 11.5034 2.83657 11.486 3.18313L11.2064 8.96106H20.3626C20.8809 9.2785 21.2013 9.81436 21.2013 10.3706C21.2013 10.8511 20.9916 11.3054 20.6305 11.6229Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
              <div className=" w-full sm:w-[230px] h-[120px] p-4 transition-shadow border rounded-[20px] shadow-sm bg-[#DEE0EF] hover:shadow-lg relative">
              <div className="flex items-start justify-between">
                <div className="flex flex-col mt-8 space-y-2">
                  <span className="text-black text-[14px]">Total Revenues</span>
                  <span className="text-[24px] font-sans font-bold">$2,129,430</span>
                </div>
                <div className="absolute right-6">
                <svg width="37" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.258 16.762C18.8939 15.6753 20.1365 14.0908 20.802 12.243C21.4674 10.3952 21.5202 8.38221 20.9526 6.50202C20.3851 4.62183 19.2273 2.97432 17.6506 1.80331C16.0739 0.632294 14.1621 0 12.1981 0C10.2341 0 8.32234 0.632294 6.74566 1.80331C5.16897 2.97432 4.01117 4.62183 3.44361 6.50202C2.87605 8.38221 2.92889 10.3952 3.5943 12.243C4.25971 14.0908 5.50235 15.6753 7.1383 16.762C4.34954 17.7907 1.93924 19.6426 0.226895 22.0723C0.133477 22.2032 0.066866 22.3512 0.0308976 22.508C-0.00507071 22.6647 -0.00968636 22.827 0.0173165 22.9855C0.0443194 23.144 0.102407 23.2956 0.188236 23.4316C0.274066 23.5675 0.385941 23.6852 0.517422 23.7777C0.648903 23.8703 0.797392 23.9359 0.954343 23.9709C1.11129 24.0058 1.2736 24.0094 1.43193 23.9813C1.59026 23.9533 1.74148 23.8942 1.87688 23.8075C2.01229 23.7208 2.1292 23.6081 2.22089 23.476C3.34616 21.8752 4.84008 20.5687 6.57652 19.6668C8.31297 18.7648 10.2409 18.2939 12.1977 18.2939C14.1544 18.2938 16.0824 18.7646 17.8189 19.6664C19.5554 20.5683 21.0494 21.8747 22.1748 23.4754C22.2669 23.6065 22.3839 23.7182 22.5192 23.8041C22.6545 23.8899 22.8054 23.9483 22.9633 23.9758C23.1211 24.0032 23.2828 23.9994 23.4392 23.9643C23.5956 23.9293 23.7435 23.8637 23.8745 23.7715C24.0055 23.6792 24.117 23.562 24.2027 23.4266C24.2884 23.2912 24.3466 23.1403 24.3739 22.9824C24.4012 22.8245 24.3972 22.6628 24.3619 22.5065C24.3267 22.3501 24.261 22.2023 24.1686 22.0714C22.4563 19.6421 20.0463 17.7905 17.258 16.7618V16.762ZM5.49195 9.14935C5.49195 7.82301 5.88525 6.52645 6.62213 5.42364C7.35901 4.32082 8.40636 3.46129 9.63174 2.95372C10.8571 2.44615 12.2055 2.31335 13.5063 2.5721C14.8072 2.83086 16.0021 3.46955 16.94 4.40742C17.8778 5.34528 18.5165 6.5402 18.7753 7.84105C19.0341 9.14191 18.9013 10.4903 18.3937 11.7157C17.8861 12.941 17.0266 13.9884 15.9238 14.7253C14.821 15.4621 13.5244 15.8555 12.1981 15.8555C10.4201 15.8534 8.71555 15.1463 7.45835 13.8891C6.20115 12.6319 5.49397 10.9273 5.49195 9.14935ZM36.2986 23.7705C36.1677 23.8627 36.0199 23.9282 35.8636 23.9633C35.7074 23.9984 35.5458 24.0023 35.388 23.9749C35.2302 23.9476 35.0794 23.8894 34.9442 23.8037C34.8089 23.718 34.6918 23.6065 34.5996 23.4756C33.4729 21.8763 31.9787 20.5709 30.2426 19.6692C28.5065 18.7676 26.5792 18.2959 24.6229 18.294C24.2996 18.294 23.9894 18.1656 23.7608 17.9369C23.5321 17.7083 23.4036 17.3981 23.4036 17.0747C23.4036 16.7514 23.5321 16.4412 23.7608 16.2126C23.9894 15.9839 24.2996 15.8555 24.6229 15.8555C25.5806 15.8544 26.5269 15.6482 27.3982 15.2508C28.2694 14.8535 29.0455 14.2741 29.6742 13.5517C30.3028 12.8293 30.7695 11.9807 31.0427 11.0628C31.316 10.145 31.3895 9.17931 31.2583 8.23071C31.1271 7.28211 30.7943 6.3726 30.2822 5.56338C29.7701 4.75416 29.0907 4.064 28.2896 3.53933C27.4885 3.01466 26.5843 2.66765 25.6378 2.52165C24.6914 2.37565 23.7247 2.43404 22.8027 2.6929C22.4918 2.77911 22.1595 2.73862 21.8784 2.58029C21.5973 2.42196 21.3905 2.15869 21.3031 1.84815C21.2157 1.53761 21.255 1.20511 21.4123 0.923458C21.5696 0.641807 21.8321 0.433966 22.1423 0.345454C24.2398 -0.24633 26.4797 -0.0694359 28.4583 0.844256C30.4368 1.75795 32.024 3.34834 32.9336 5.32879C33.8433 7.30924 34.0156 9.54948 33.4196 11.6458C32.8235 13.742 31.4983 15.5564 29.6827 16.762C32.4711 17.7906 34.8812 19.6423 36.5935 22.0716C36.7797 22.336 36.8532 22.6635 36.7979 22.9821C36.7426 23.3007 36.563 23.5843 36.2986 23.7705Z" fill="black"/>
                  </svg>  

                </div>
              </div>
            </div>
        </div>



        {/* Charts */}
      <div className='grid h-[360px] xl:w-[1100px] bg-white md:w-[600px] sm:w-[700px] lg:w-[800px] w-full rounded-[20px] p-5 sm:p-[2rem] mt-[2rem] mx-auto'>
        <div className='ml-5'> 
          <h3 className='text-lg font-[900] text-black'>Activities</h3>
          <p className='text-[14px] text-gray-600'>May - June 2021</p>
        </div>
        <div className='h-[180px]  xl:w-[1000px] md:w-[550px] lg:w-[700px] sm:w-[500px] w-full'>
          <Line
            data={data}
            options={{
              responsive:true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  max: 150,
                  ticks: {
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </div>
      </div>


      <div className="grid mt-9  lg:w-[1150px] sm:w-[700px] sm:grid-cols-1 items-center lg:grid-cols-2">
            <div className="sm:w-[520px] sm:p-2  mb-5 sm:mb-0 h-[256px] transition-shadow border rounded-[20px] shadow-sm bg-[#fff] hover:shadow-lg">
                  <div className=' mx-auto sm:px-[3rem] mt-5 flex items-center justify-around sm:justify-between'>
                    <p className='text-[18px] font-bold'>Top products</p>
                    <p className='text-[12px]'>May - June 2021</p>
                  </div>
                  <div className='flex flex-row'>
                  <div className='sm:ml-[40px] w-[200px] flex flex-row'>
                    <Pie
                      data = {{
                        labels: ['Basic Tees', 'Custom Short Pants', 'Super Hoodies'],
                        datasets: [{
                          labels: ['Shirt', 'Jeans', 'Pants'],
                          data: [2,6,9],
                          backgroundColor:['#98D89E','#EE8484','#F6DC7D'],
                          radius:75
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display:false
                          },
                        }
                      }}
                    />
                  </div>
                  <div className='p-4 sm:p-5 sm:ml-5'>  
                      <div className='flex flex-row font-extrabold text-[14px]  items-center justify-items-start h-[50px]'> 
                        <div className='w-2 h-2 rounded-full bg-[#98D89E]'></div>
                        <p className=' ml-5 mt-5 '>Basic Tees <br/><span className='text-gray-300 text-[12px]'>51%</span></p>
                      </div>
                      <div className='flex flex-row font-extrabold text-[14px]  items-center justify-items-start  h-[50px]'> 
                        <div className='w-2 h-2 rounded-full bg-[#EE8484]'></div>
                        <p className=' ml-5 mt-5'>Custom Short Pants<br/><span className='text-gray-300 text-[12px]'>51%</span></p>
                      </div>
                      <div className='flex font-extrabold text-[14px] items-center justify-items-start h-[50px]'> 
                        <div className='w-2 h-2 rounded-full bg-[#F6DC7D]'></div>
                        <p className=' ml-5 mt-5'>Super Hoodies<br/><span className='text-gray-300 text-[12px]'>51%</span></p>
                      </div>
                    </div>
                    </div> 
            </div>


              <div className="w-full sm:w-[520px] h-[256px] sm:p-2 transition-shadow border rounded-[20px] shadow-sm bg-white hover:shadow-lg">
                  <div className='sm:w-[400px] mx-auto mt-5 flex items-center justify-between px-10'>
                    <p className='text-[18px] font-bold'>Today’s schedule</p>
                    <p className='text-[12px]'>See All </p>
                  </div>

                  <div className='flex flex-col'>
                    <div className='flex ml-5 mt-5'>
                      <div className='w-1 h-[66px] bg-[#9BDD7C]'></div>
                      <div className='flex flex-col items-center align-center'>
                        <p className='text-[14px] font-bold text-[#666666] ml-5'>Meeting with suppliers from Kuta Bali <br/><span className='text-[12px] font-thin'>14.00-15.00 </span><br/><span className='text-[12px] font-thin'> at Sunset Road, Kuta, Bali </span> </p>
                      </div>
                    </div>

                    <div className='flex ml-5 mt-5'>
                      <div className='w-1 h-[66px] bg-[#6972C3]'></div>
                      <div className='flex flex-col items-center align-center'>
                        <p className='text-[14px] font-bold text-[#666666] ml-5'>Check operation at Giga Factory 1 <br/><span className='text-[12px] font-thin'>18.00-20.00</span><br/><span className='text-[12px] font-thin'> at Central Jakarta  </span></p>
                      </div>
                    </div>
                  </div>

              </div>
      </div>
  </div>
    )
  }
