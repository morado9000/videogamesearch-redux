
export default function Modal({openState, handleClose, children}) {
    
    return (
        <>
            <div className={openState ? "fixed top-0 left-0 right-0 bottom-0 z-20 width-full height-full bg-black bg-opacity-50" : "hidden" }>
                <div className="flex flex-col rounded-lg items-center justify-center bg-white text-center px-6 mx-auto my-3 md:w-1/2">
                    {children}
                    <div className="self-end border-2 bg-white absolute z-30 px-3 py-1 top-0 rounded-full">
                        <button onClick={handleClose}>
                            <p className="text-2xl">X</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}