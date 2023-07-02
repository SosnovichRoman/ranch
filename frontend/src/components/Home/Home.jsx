import React from 'react'
import Service from './Service'

const Home = () => {

    const services = [
        {
            id: '1',
            title: 'Обучение верховой езде',
            description: 'Тренировки на манеже будут полезны не только новичкам, но и более опытным всадникам',
            img: 'img/home/services/01.png',
            link: '',
            buttonText: 'Оставить заявку',
        },
        {
            id: '2',
            title: 'Обучение верховой езде',
            description: 'Тренировки на манеже будут полезны не только новичкам, но и более опытным всадникам',
            img: 'img/home/services/02.png',
            link: '',
            buttonText: 'Оставить заявку',
        },
        {
            id: '3',
            title: 'Обучение верховой езде',
            description: 'Тренировки на манеже будут полезны не только новичкам, но и более опытным всадникам',
            img: 'img/home/services/03.png',
            link: '',
            buttonText: 'Оставить заявку',
        },
        {
            id: '4',
            title: 'Обучение верховой езде',
            description: 'Тренировки на манеже будут полезны не только новичкам, но и более опытным всадникам',
            img: 'img/home/services/04.png',
            link: '',
            buttonText: 'Оставить заявку',
        }
    ]

    return (
        <main>
            <section className='relative'>
                <img src='img/home/hero.png' className='absolute w-full h-full inset-0 object-cover' />
                <div className='relative z-10 __container h-[800px] flex items-center'>
                    <div className=''>
                        <h1>
                            <span className='text-[#E1E1E1] text-[2rem] leading-tight'>Конная усадьба</span>
                            <br />
                            <span className='heading-1 text-white'>Буцевичи</span>
                        </h1>
                        <p className='mt-8 text-xl font-medium text-white'>Клуб счастливых наездников и лошадей!</p>
                    </div>
                </div>
            </section>
            <section className=' bg-grey-noise'>
                <div className='__container py-20'>
                    <h2 className='heading-2'>Наши услуги</h2>
                    <div className='mt-10 grid grid-cols-4 gap-[30px]'>
                        {services.map((service) => <Service service={service} />)}
                    </div>
                </div>
            </section>
            <section>
                <div className='__container py-20'>
                    <h2 className='heading-2'>Пару слов о нас</h2>
                    <div className='grid grid-cols-2 gap-20 mt-10'>
                        <div className='relative h-[400px]'>
                            <img src='img/home/about/01.png' className='relative z-10 h-full w-full object-cover shadow-card-shadow' />
                            <div className='absolute inset-0 rotate-[-5deg] bg-primary'></div>
                        </div>
                        <div className=''>
                            <h3 className='heading-3'>Добро пожаловать на агроусадьбу Буцевичи!</h3>
                            <p className='default-text text-unactive mt-8'>
                                Приветствуем вас на сайте Конной усадьбы Буцевичи.
                                Мы занимаемся организацией отдыха на природе, обучаем верховой езде, организуем конные прогулки,
                                а также успешно проводим в нашей усадьбе тематические праздники, в основе которых душевная атмосфера,
                                активный отдых, веселая программа и, конечно же, лошади!
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-20 mt-20'>
                        <div className=''>
                            <h3 className='heading-3'>С заботой о каждом</h3>
                            <p className='default-text text-unactive mt-8'>
                                На нашем рачно живут не только кони, но и кошки, собаки, козы и даже соколы.
                                Мы окружаем заботой каждое живое существо на нашей усадьбе.
                                Вот почему наши лошадки так дружелюбны и всегда будут рады, если вы их покормите.
                            </p>
                        </div>
                        <div className='relative h-[400px]'>
                            <img src='img/home/about/02.png' className='relative z-10 h-full w-full object-cover shadow-card-shadow' />
                            <div className='absolute inset-0 rotate-[5deg] bg-primary'></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-grey-noise'>
                <div className='__container py-20'>
                    <h2 className='heading-2'>Как добраться</h2>
                    <div className='grid grid-cols-2 gap-20 mt-10'>
                        <div className='space-y-5'>
                            <h3 className='heading-3'>На автомобиле</h3>
                            <div className='default-text text-unactive'>
                                <p>Шоссе Р58 направление на Мядель (съезд с кольцевой или выезд из города в районе д.Новинки). До усадьбы ровно 25 км.</p>
                                <ol className='list-decimal pl-[1.5em] space-y-1 mt-1'>
                                    <li>Едем прямо по трассе Р58 примерно 14 км от МКАД.</li>
                                    <li>На кольце Радошковичи-Мядель (не пропустите!) поворачиваем направо на Мядель (оставаясь на Р58).</li>
                                    <li>Едем 5 км и поворачиваем налево на “АБРЫЦКУЮ СЛАБАДУ” (внимание: указатель стоит слева!).</li>
                                    <li>2.5 км по гравийке/асфальту до д.БУЦЕВИЧИ (внимание: в лесу есть ещё один указатель на “Абрыцкую Слабаду” направо, НЕ поворачивайте, проезжайте прямо).</li>
                                    <li>Вы увидите нас слева от дороги на подъезде к д.Буцевичи.</li>
                                </ol>
                            </div>
                            <h3 className='heading-3'>На маршрутке</h3>
                            <p className='default-text text-unactive'>
                                Маршрут № 1540
                                <br />
                                Минск (Комаровский рынок)-Юзуфово
                            </p>
                        </div>
                        <img src='img/home/map.png' className='h-[550px] shadow-card-shadow' />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home