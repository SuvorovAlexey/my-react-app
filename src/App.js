import React from 'react';
import './App.css';
import CommentItem from './CommentItem'
import InputForm from './InputForm'


//обозначили переменной получение контекста из localstorage


//запускаем наш основной компонент App (в виде классового компонента)
class App extends React.Component {

  constructor(){
    super();

    let newInfo = localStorage.getItem('newContent');

    let jsonObject = JSON.parse(newInfo);

    //исходное состояние
    this.state = {
      comments: [
        {name: 'Иван', title: 'Я пишу первый комментарий', man: true , date: ' (11.02.2018)'},
        {name: 'Ирина', title: 'А я пишу уже второй комментарий', man: false, date: ' (13.05.2019)'},
        {name: 'Михаил', title: 'А я - третий комментарий', man: true, date: ' (01.01.2020)'}
      ]
    }

    if (!(newInfo == null)) {
      this.state = {
        comments: jsonObject
      }
    }

  }



  addComment(event) {

    //отменяем действие по умолчанию(отправка формы)

    //добавляем определение даты
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() +1;
    let year = d.getFullYear();

    const comments = this.state.comments

    let man = document.getElementById('boy');
    let woman = document.getElementById('girl');

    let newObj = {
      name: document.getElementById("inputName").value,
      title: document.getElementById("inputKomment").value,
      date: '  (' + date + '.' + month + '.' + year + ')'
    }

    if (man.checked) {
      newObj.man = true
    }

    if (woman.checked) {
      newObj.man = false
    }

    comments.push(newObj);

    if ((newObj.name == '' || newObj.title == '') && ((man.checked && woman.checked) || (!man.checked && !woman.checked))) {
      alert('Не введено никаких данных!')
      comments.push('')
    }

    if (newObj.name == '' || newObj.title == '') {
      alert('Не введен комментарий или имя!')
      delete comments.pop()
    }

    if ((man.checked && woman.checked) || (!man.checked && !woman.checked)) {
      alert('Определитесь кто Вы...')
      delete comments.pop()
    }

    let jsonString = JSON.stringify(comments)

    localStorage.setItem('newContent', jsonString);

    //if (!(newObj.name == '') || !(newObj.title == '')) {
      //document.getElementById("inputName").value = ''
      //document.getElementById("inputKomment").value = ''
    //}

    this.setState( {comments} )
  }


  deleteComment(key) {
    const comments = this.state.comments

    comments.splice(key, 1);

    let jsonString = JSON.stringify(comments)

    localStorage.setItem('newContent', jsonString);

    this.setState( {comments} )
  }


  render() {
    return (
      <div className='wrapper'>

        {this.state.comments.map((component, i) => {
          return(
            <CommentItem
              key={i}
              name={component.name}
              title={component.title}
              date={component.date}
              man={component.man}
              deleteComment={this.deleteComment.bind(this, i)}
            />
          )
        })}

        <InputForm
          addComment={this.addComment.bind(this)}
        />

        <div className='lastline'> Данное!!! приложение создано на React. Оно работает с SessionStorage. Вы можете закрыть вкладку или браузер, сохраненные комментарии останутся в приложении.
        </div>

      </div>
    );
  }

}

export default App;
