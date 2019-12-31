import styles from './index.css';
import SiderDemo from './BaseLayout'
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <SiderDemo></SiderDemo>
      {props.children}
    </div>
  );
}

export default BasicLayout;
