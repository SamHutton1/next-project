import React from 'react'
import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'
import styles from '../../styles/Confetti.module.css'
import HeadElement from '@/components/HeadElement'


function ConfettiPage() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })


    return (
        <div className={styles.main}>
            <HeadElement />

            <button className={`btn btn-primary ${styles.confettiButton}`} onClick={() => setPressed(!pressed)}>
                {pressed ? "Press To Stop" : "Press Me"}
            </button>

            {pressed ? <Confetti
                width={width}
                height={height}
            /> : null}

        </div>
    )
}

export default ConfettiPage;