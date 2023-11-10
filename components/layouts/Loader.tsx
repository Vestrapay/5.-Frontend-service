import { BounceLoader } from 'react-spinners';
import styles from '@styles/Loader.module.css'

const Loader = () => {
    return (
        <div className={styles?.wrapper || ""}>
            {/* <div className={styles?.loader || ""}> */}
                <BounceLoader color="#6B61E5" />
            {/* </div> */}
        </div>
    );
}

export default Loader;