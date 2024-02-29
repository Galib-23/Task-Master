
interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAddTodo: (e: React.FormEvent) => void;
}

const InputField = ({todo, setTodo, handleAddTodo}: Props) => {
    return (
        <div className="flex justify-center">
            <form onSubmit={handleAddTodo}>
                <div className="join">
                    <input
                     value={todo}
                     onChange={
                        (e)=> {setTodo(e.target.value)}
                     }
                     className="input input-bordered join-item" placeholder="Enter A Task" />
                    <button className="btn join-item bg-cyan-400">Go</button>
                </div>
            </form>
        </div>
    )
}

export default InputField
