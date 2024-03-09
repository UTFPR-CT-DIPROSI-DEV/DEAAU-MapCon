import React from 'react';
import styles from './loading.module.css';

export default function Loading(props){
    return (<div className={styles.loading}>
            <div className={styles.text_loading}>Carregando...</div>
                <div className={styles.lds_ellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>  
            </div>)
}