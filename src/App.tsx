import { decrement, increment } from "./redux/features/counter/Counter";
import type { RootState } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch()
  const { count } = useAppSelector((state: RootState) => state.counter)

  console.log(count);
  const handleIncrement = () => {
    dispatch(increment(5))
  }
  const handleDecrement = () => {
    dispatch(decrement(1))
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold ">Counter With Redux</h1>

      <div className="mt-4 flex items-center ">
        <button onClick={handleIncrement} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Increment
        </button>
        <div>
          <span className="mx-4 text-2xl">{count}</span>
        </div>
        <button onClick={handleDecrement} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App
