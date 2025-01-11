import React from "react";
import "./styles.css";


class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newtodo: "",
      todos: [],
    };
  }

  handleNewtodoChange = (event) => {
    this.setState({
      newtodo: event.target.value,
    });
  };

  addTodo = () => {
    const { newtodo, todos } = this.state; // Access state
    if (newtodo.trim() !== "") {
      this.setState({
        todos: [
          ...todos,
          { id: Date.now(), text: newtodo, completed: false }, 
        ],
        newtodo: "", // Clear input
      });
    }
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle the completed property
      ),
    }));
  };

  removeTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id), // Remove the todo by id
    }));
  };

  render() {
    const { newtodo, todos } = this.state;

    return (
      <div className="todo-container">
        <h1>My Todo List</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newtodo}
            onChange={this.handleNewtodoChange}
            placeholder="Add a new todo"
          />
          <button onClick={this.addTodo}>Add</button>
        </div>
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet! Add one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.toggleTodo(todo.id)} // Toggle completion status
                />
                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => this.removeTodo(todo.id)} // Remove the todo
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ToDoList;
