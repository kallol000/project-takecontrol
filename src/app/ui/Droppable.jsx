import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styles from './css/droppable.module.css'

export function Droppable({id, children}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });

  
  
  return (
    <div ref={setNodeRef} className = {`${id === "delete" ? styles.delete : styles.main} ${isOver ? id === "delete" ? styles.hoveredDelete : styles.hovered : null} `} >
      {children}
    </div>
  );
}