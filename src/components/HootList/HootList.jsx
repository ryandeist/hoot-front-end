// Hook Imports
import { Link } from 'react-router';

// component imports
import Icon from '../Icon/Icon';

// Style Imports
import styles from './HootList.module.css';

const HootList = (props) => {
    return (
        <main className={styles.container}>
            {props.hoots.map((hoot) => (
                <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{hoot.title}</h2>
                                <Icon category={hoot.category} />
                            </div>
                            <p>
                                {`${hoot.author.username} posted on
                                ${new Date(hoot.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{hoot.text}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};


export default HootList;
