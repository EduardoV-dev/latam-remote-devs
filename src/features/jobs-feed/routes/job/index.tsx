import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';
import { Button } from 'antd';

export const Job = (): JSX.Element => (
    <section className={styles.container}>
        <header className={styles.header}>
            <section className={styles.data}>
                <p>Senior React Developer</p>
                <span>
                    Nowoptics
                    <LinkIcon />
                </span>
                <Button type="primary">Aplicar</Button>
            </section>

            <section>
                <p className={styles.headline}>Habilidades Requeridas</p>

                <div className="group">
                    {[...new Array(7)].map(() => (
                        <span className="skill-badge">React</span>
                    ))}
                </div>
            </section>
        </header>

        <hr className={styles.separator} />

        <article>
            <p className={styles.headline}>Detalles de la Oferta</p>

            {[...new Array(3)].map(() => (
                <p>
                    At quis risus sed vulputate odio ut enim blandit volutpat.
                    Nullam eget felis eget nunc lobortis mattis. Donec massa
                    sapien faucibus et molestie. Sit amet volutpat consequat
                    mauris nunc. Tortor dignissim convallis aenean et tortor at
                    risus. Lacus suspendisse faucibus interdum posuere. Massa
                    tincidunt nunc pulvinar sapien et ligula. Risus nec feugiat
                    in fermentum posuere urna nec tincidunt praesent. Nascetur
                    ridiculus mus mauris vitae ultricies leo. Augue neque
                    gravida in fermentum et sollicitudin ac orci phasellus.
                    Tristique sollicitudin nibh sit amet. Volutpat odio
                    facilisis mauris sit. Velit aliquet sagittis id consectetur
                    purus ut faucibus pulvinar. Amet nisl purus in mollis nunc
                    sed. Pretium aenean pharetra magna ac placerat vestibulum
                    lectus mauris ultrices. Sed euismod nisi porta lorem mollis
                    aliquam ut porttitor leo. Semper eget duis at tellus at urna
                    condimentum. Mi proin sed libero enim sed faucibus turpis
                    in. Urna nunc id cursus metus aliquam eleifend mi in nulla.
                    Augue neque gravida in fermentum.
                </p>
            ))}
        </article>
    </section>
);

Job.displayName = 'Job';
