import React from 'react';
import styles from '../styles/MyLists.module.css';

const ListCard = ({ list, onSelect }) => {
  return (
    <div className={styles.listCard} onClick={() => onSelect(list)}>
      <h3>{list.name}</h3>
    </div>
  );
};

export default ListCard;
