import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import { MenuContext } from './context/menuContext';
import { MdAccountCircle } from "react-icons/md";
import { useSession, signIn, signOut } from "next-auth/react"
import { jwtDecode } from 'jwt-decode';


const Navbar = ({ user, logout }) => {

  const [isLoggedIN, setIsLoggedIN] = useState(user)
  const [open, setOpen] = useState(true)
  const { openHam, toggleMenu } = useContext(MenuContext)
  const router = useRouter();
  // const isVideosPage = router.pathname === '/' || router.pathname === '/videos' || router.pathname.startsWith('/videos/');
  const isLearnPage = router.pathname === '/learn' || router.pathname.startsWith('/learn/');
  const { data: session, status } = useSession()
  const isSession = (status == "authenticated") || isLoggedIN;
  const [image, setImage] = useState('');

  // console.log(status)

  const firstLetter = session?.user?.name?.charAt(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !session) {
      const decoded = jwtDecode(token);
      setImage(decoded.image);
    } else if (session && !token) {
      setImage(session.user.image);
    }
    if (!token && !session) {
      setImage('https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais');
    }
  }, [session]);

  function toggle() {
    if (open == false)
      setOpen(true)
    else
      setOpen(false)
  }

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <div className={`${styles.nav}`}>
        <nav className={`navbar navbar-expand-lg px-2 ${styles.navbar} ${styles.nav1}`}>
          <div className={`container-fluid`} >
            <Link href="/" className={styles.containerFluid}><span className={"textpurple"}><b className={`${styles.codebyte} fontBold`}>&lt;/&gt; Codebyte</b></span></Link>
            <b onMouseOver={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}>
              {isSession && (
                <>
                  <img src={`${image}`} className={`${styles.accountImg} ${styles.account1}`} onMouseOver={() => { setIsHovered(true) }}
                    onMouseLeave={() => { setIsHovered(false) }} alt=' ' />{isHovered && <ul className={`${styles.accdrop}`} style={{ display: isHovered ? 'block' : 'none' }}>
                      <Link href={'/myaccount'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>My account</li></Link>
                      <li className={`nav-item ${styles.nav_item}`} onClick={logout}>Logout</li>
                    </ul>}</>
              )}
            </b>
            <div className={`${styles.hamburger}`} data-bs-toggle="collapse" type="button" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}>
              <div
                className={`${styles.hamburgerMenu1} ${open ? '' : styles.open}`}
              >
                <div className={`${styles.bar}`} ></div>
                <div className={`${styles.bar}`} ></div>
                <div className={`${styles.bar}`} ></div>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className={`${styles.navul} navbar-nav me-auto mb-2 mb-lg-0 px-3`} id='links'>
                <li className={`nav-item ${styles.navItem}`} >
                  <Link className={`nav-link text-black `} aria-current="page" href="/" >Home</Link>
                </li>
                <li className={`nav-item ${styles.navItem}`} >
                  <Link className={`nav-link text-black `} aria-current="page" href="/learn">Learn</Link>
                </li>
                <li className={`nav-item ${styles.navItem}`} >
                  <Link className={`nav-link text-black`} aria-current="page" href="/courses">Courses</Link>
                </li>
                <li className={`nav-item ${styles.navItem}`} >
                  <Link className={`nav-link text-black`} aria-current="page" href="/about">About Us</Link>
                </li>
                <li className={`nav-item ${styles.navItem}`} >
                  <Link className={`nav-link text-black`} aria-current="page" href="/contact">Contact Us</Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className={`${styles.serBox} form-control me-2`} type="search" placeholder="Search" aria-label="Search" />
                <button className={`btn ${styles.button}`} type="submit">Search</button>
              </form>
              {!isSession && (<Link href={"/login"}><button className={` btn mx-2 ${styles.button1}`} type="submit">Login</button></Link>)}
              <b onMouseOver={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}>
                {isSession && (
                  <>
                    <img src={`${image}`} className={`${styles.accountImg} ${styles.account}`} onMouseOver={() => { setIsHovered(true) }}
                      onMouseLeave={() => { setIsHovered(false) }} alt=' ' />{isHovered && <ul className={`${styles.accdrop}`} style={{ display: isHovered ? 'block' : 'none' }}>
                        <Link href={'/myaccount'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>My account</li></Link>
                        <li className={`nav-item ${styles.nav_item}`} onClick={logout}>Logout</li>
                      </ul>}</>
                )}
              </b>
            </div>
          </div>
        </nav>
        <div className={styles.menu}>
          {isLearnPage && (
            <div className={`${styles.hamburger}`} >
              <div
                className={`${styles.hamburgerMenu} ${openHam ? '' : styles.open}`}
                onClick={toggleMenu}>
                <div className={`${styles.bar}`} onClick={toggleMenu}></div>
                <div className={`${styles.bar}`} onClick={toggleMenu}></div>
                <div className={`${styles.bar}`} onClick={toggleMenu}></div>
              </div>
            </div>
          )}
          {/* <div id="scroll_left_btn" class={`${styles.scrollleft} w3-hide-medium w3-hide-small`} style={{display: 'block'}}>
            <span onmousedown="scrollmenow(-1)" onmouseup="stopscrollmenow()" onmouseout="stopscrollmenow()">&nbsp;&nbsp;&nbsp;❮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div> */}
          <div className={`${styles.scrollmenu}`}>
            <div className={styles.scrollmenuContent}>
              <Link href="/learn/html/html-home">HTML</Link>
              <Link href="/learn/css/css1">CSS</Link>
              <Link href="/contact">JAVASCRIPT</Link>
              <Link href="/about">C</Link>
              <Link href="/support">C++</Link>
              <Link href="/blog">PYTHON</Link>
              <Link href="/tools">REACT</Link>
              <Link href="/base">NEXTJS</Link>
              <Link href="/custom">BOOTSTRAP</Link>
              <Link href="/more">TAILWIND CSS</Link>
              <Link href="/logo">JAVA</Link>
              <Link href="/friends">JQUERY</Link>
              <Link href="/partners">NODEJS</Link>
              <Link href="/people">FONTAWESOME</Link>
              <Link href="/work">HOW TO</Link>
              <Link href="/work">SQL</Link>
              <Link href="/work">PHP</Link>
              <Link href="/work">MONGODB</Link>
              <Link href="/work">AI</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
