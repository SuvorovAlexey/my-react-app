import React from 'react';

const styles = {
  form: {
    display: 'block',
    marginTop: '50px'

  },
  input: {
    display: 'block',
    marginTop: '50px',
    width: '450px',
    height: '25px',
    border: '3px solid black'
  },
  input2: {
    display: 'block',
    marginTop: '10px',
    height: '25px',
    border: '3px solid black'
  },
  label: {
    display: 'block',
    marginTop: '50px'
  },
  button2: {
    display: 'block',
    marginTop: '25px',
    borderRadius: '25px',
    border: 'none',
    height: '30px',
    width: '130px'
  }
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(); //говорим что начальный стейт мы получим из функции getDefaultState()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() { //функция с заданным НАЧАЛЬНЫМ стейтом для элементов InputForm
    return {
      boy: false, //Начальное значение чекбокса "мужчина"
      girl: false,  //Начальное значение чекбокса "мужчина"
      comment: '', //Начальное значение комментария
      name: '' //Начальное значение имени
    };
  }

  handleChange(event) {
    const target = event.target; //event.target - это элемент, на котором произошло событие
    const value = target.type === 'checkbox' ? target.checked : target.value; //если элемент на котором произошло событие это 'checkbox', то тогода для него checked (выбран), иначе - value
    const name = target.name;

    this.setState({ //тут устанавливаем значение, которое будет в полях в момент ввода текста
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Далее - валидация элементов. Внутри компонента самой формы. Убрал, для читаемости
    // Какая тут будет валидация? Она же происходит внутри функции addComment( ), которая в компоненте app.js

    this.props.addComment({  //функция по добавлению коммента в список
      ...this.state  // "..." - это же Spread/Rest оператор? Что в этом случае он разбивает или собирает?
    });

    this.setState( this.getDefaultState() );
  }


  render() {
    return(
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <input
              style = {styles.input}
              id = 'inputKomment'
              placeholder = "Введите комментарий"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
          />
          <input
              style = {styles.input2}
              id = 'inputName'
              placeholder = "Введите имя"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
          />

          <label style={styles.form}>
            <input
                type = 'checkbox'
                id = 'boy'
                name = 'boy'
                checked={this.state.boy}
                onChange={this.handleChange}
            />
            Я мужчина
          </label>

          <label>
            <input type = 'checkbox'
                   id = 'girl'
                   name = 'girl'
                   checked={this.state.girl}
                   onChange={this.handleChange}
            />
            Я женщина
          </label>

          <button
              type="submit"
              style={styles.button2}
          > Добавить </button>

        </form>
    )
  }

}

export default InputForm
