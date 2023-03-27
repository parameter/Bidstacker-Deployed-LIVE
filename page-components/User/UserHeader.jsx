import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import styles from './UserHeader.module.css';

const UserHeader = ({ user }) => {
  return (
    <Container className={styles.root} column alignItems="center">
      <div className={styles.avatar}>
        <Avatar size={168} username={user.username} url={user.profilePicture} />
      </div>
      <h1>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.username}>@{user.username}</p>
      </h1>
      <p className={styles.bio}>{user.bio}</p>
    </Container>
  );
};

export default UserHeader;
