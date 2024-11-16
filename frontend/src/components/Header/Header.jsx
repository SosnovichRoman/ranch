'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
	const [toggle, setToggle] = useState(false)
	useEffect(() => {
		toggle
			? document.documentElement.classList.add('lock')
			: document.documentElement.classList.remove('lock')
	})

	const [scroll, setScroll] = useState(false)
	useEffect(() => {
		setScroll(window.scrollY > 50)
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 50)
		})
	}, [])

	return (
		<header
			className={`header fixed h-[5rem] top-0 left-0 right-0 z-50 ${
				scroll ? 'bg-dark-section bg-opacity-[0.99] shadow-lg' : ''
			}`}
		>
			<div className='header__container flex justify-between items-center h-full'>
				<Link href='/'>
					<img className='h-10' src='img/header/logo.svg' alt='logo' />
				</Link>
				<nav className='hidden md:flex items-center'>
					<ul className='flex items-center gap-8'>
						<li className='text-lg leading-tight text-white font-medium'>
							<Link onClick={() => setToggle(false)} href=''>
								Главная
							</Link>
						</li>
						<li className='text-lg leading-tight text-white font-medium'>
							<Link onClick={() => setToggle(false)} href=''>
								Услуги и цены
							</Link>
						</li>
						<li className='text-lg leading-tight text-white font-medium'>
							<Link onClick={() => setToggle(false)} href=''>
								Проезд
							</Link>
						</li>
						<li className='text-lg leading-tight text-white font-medium'>
							<Link onClick={() => setToggle(false)} href=''>
								Фотоальбом
							</Link>
						</li>
					</ul>
				</nav>
				<button
					className={`icon-menu md:hidden ${toggle ? 'menu-open' : ''}`}
					onClick={() => setToggle(!toggle)}
				>
					<span></span>
				</button>

				<nav
					className={`md:hidden fixed z-[1] overflow-auto overflow-x-hidden left-0
                  w-full h-full bg-slate-100 p-8 pt-20 transition-all duration-300 ease-ease ${
										toggle ? 'top-0' : '-top-full'
									}`}
				>
					<ul className='flex flex-col items-center gap-5'>
						<li className=''>
							<Link onClick={() => setToggle(false)} href=''>
								Главная
							</Link>
						</li>
						<li className=''>
							<Link onClick={() => setToggle(false)} href=''>
								Услуги и цены
							</Link>
						</li>
						<li className=''>
							<Link onClick={() => setToggle(false)} href=''>
								Проезд
							</Link>
						</li>
						<li className=''>
							<Link onClick={() => setToggle(false)} href=''>
								Фотоальбом
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header

//     & __body {
//     position: fixed;
//     z - index: 1;
//     overflow: auto;
//     overflow - x: hidden;
//     left: 0;
//     top: -100 %;
//     width: 100 %;
//     height: 100 %;
//     //background-color: $headerBackgroundColor;
//     padding: 100px 30px 30px 30px;
//     transition: all 0.3s ease;
// }
