import { useReducer, useState } from "react";

function App() {
  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const reducerTodo = (state, action) => {
    switch (action.type) {
      case "adding":
        return {
          todos: [...state.todos, action.payload],
        };
      case "deleting":
        return {
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case "updating":
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
          ),
        };
      default:
        return state;
    }
  };

  const initialState = {
    todos: [],
  };

  const [state, dispatchTodo] = useReducer(reducerTodo, initialState);

  const addNewItem = () => {
    dispatchTodo({
      type: "adding",
      payload: {
        id: Date.now(),
        text: newItem,
      },
    });
    setNewItem("");
  };

  const removeItem = (id) => {
    dispatchTodo({
      type: "deleting",
      payload: id,
    });
  };

  const editItem = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    dispatchTodo({
      type: "updating",
      payload: {
        id,
        text: editingText,
      },
    });
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="App">
      <p>useReducer로 할일 메모 만들어 보기</p>
      <input
        placeholder="여기에 할일을 입력"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button onClick={addNewItem}>할일 추가</button>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}ㄴ
                />
                <button onClick={() => saveEdit(todo.id)}>저장</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => editItem(todo.id, todo.text)}>수정</button>
                <button onClick={() => removeItem(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;