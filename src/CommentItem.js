import React from 'react';

const styles = {
  li: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    borderBottom: '1px solid black'
  },
  button: {
    borderRadius: '15px',
    border: 'none',
    backgroundColor: 'white'
  }
}

//Функциональный компонент. Дочернему компоненту не нужно собственное состояние.
const CommentItem = (props) => {          //через props компонент получает данные от app.js которые будет обрабатывать
  const className = props.man ? 'man' : 'woman';

  return(
    <li
      className={className}
      style={styles.li}
    >
      {props.name + " говорит: " + props.title}
      {props.date}

      <button
      style={styles.button}
        onClick={props.deleteComment}
      >
        &#10008;
      </button>
    </li>
  )
}

export default CommentItem
