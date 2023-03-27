'use client';
import styles from './loading-ring.module.css';

const LoadingRing = () => (
  <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
    <div className={`spinner ${styles.spinner}`}>
      <svg viewBox="0 0 50 50">
        <circle
          className={`${styles.path}`}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  </div>
);

export default LoadingRing;
