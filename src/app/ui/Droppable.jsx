import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styles from './css/droppable.module.css'

export function Droppable({id, children}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });

  
  
  return (
    <div ref={setNodeRef} className = {`${styles.main} ${isOver ? styles.hovered : null} `} >
      {children}
    </div>
  );
}