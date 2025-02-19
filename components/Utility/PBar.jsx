import React from 'react'
import styles from '../../styles/Utility/ProgressBar.module.css'
import { buttonBg } from '@/utility/const'

const PBar = ({ height, percentage, pixel, color }) => {
  return (
    <div
      className={styles.progressBar}
      style={{ height: `${height || '3px'}` }}
    >
      <div
        className={styles.progress}
        style={{
          width: `${percentage ? `${percentage}%` : `${pixel + 0}px`}`,
          background: `${color ? `${color}` : `${buttonBg}`}`
        }}
      >

      </div>
    </div>
  )
}

export default PBar
