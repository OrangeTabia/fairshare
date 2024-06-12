import { useModal } from '../../../context/Modal'
import './WalkthroughModal.css'


const WalkthroughModal = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal2 />
        setModalContent(modalComponent);
    }

    return (
        <div className='walkthrough-modal-container'>
            <h1>Welcome to FairShare!</h1>
            <div>
                <p>Let us walk you through a bit of what our site has to offer!</p>
                <p>Click next to continue.</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={handleModalSwap}>Next</button>
                <p>1/6</p>
            </div>
        </div>

    )
}

export default WalkthroughModal


const WalkthroughModal2 = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal3 />
        setModalContent(modalComponent);
    }

    return (
        <div className='walkthrough-modal-container' >
            <h1>Dashboard and Expenses</h1>
            <div>
                <p>If you would like to easily see how much you owe each of your friends or how much they
                    each owe you, check out the Dashboard tab in the navigation bar above.</p>
                <p>If you are looking for details on each of your expenses, check out the Expenses
                    tab in the navigation bar above.</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={handleModalSwap}>Next</button>
                <p>2/6</p>
            </div>
        </div>
    )
}


const WalkthroughModal3 = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal4 />
        setModalContent(modalComponent);
    }


    return (
        <div className='walkthrough-modal-container' >
            <h1>Friends</h1>
            <div>
                <p>On the your left you will find a list of all your friends</p>
                <p>You can add more friends by clicking the &apos;Invite a Friend&apos; button. Or, you can click on a
                    friend to see details about all the expenses and payments there are between you and
                    your selected friend</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={handleModalSwap}>Next</button>
                <p>3/6</p>
            </div>
        </div>
    )
}


const WalkthroughModal4 = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal5 />
        setModalContent(modalComponent);
    }

    return (
        <div className='walkthrough-modal-container' >
            <h1>Add an Expense</h1>
            <div>
                <p>To add an expense between you and a friend, click the &apos;Add Expense&apos; button in the upper middle section of the page.</p>
                <p>Fill out a short form and your friend will be notified they still owe you for that slice of pizza
                    you bought them last week.</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={handleModalSwap}>Next</button>
                <p>4/6</p>
            </div>
        </div>
    )
}


const WalkthroughModal5 = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal6 />
        setModalContent(modalComponent);
    }

    return (
        <div className='walkthrough-modal-container' >
            <h1>Settle Up</h1>
            <div>
                <p>Ready to pay someone back, click the &apos;Settle Up&apos; button in the upper middle section of the page.</p>
                <p>Select which expense you would like to pay towards, how much you are going to pay, and when you would like to pay it.</p>
                <p>Tada! Your friends love you, you always pay back your debts!</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={handleModalSwap}>Next</button>
                <p>5/6</p>
            </div>
        </div>
    )
}


const WalkthroughModal6 = () => {
    const { closeModal } = useModal();

    return (
        <div className='walkthrough-modal-container' >
            <h1>Get Sharing!</h1>
            <div>
                <p>It&apos;s time to get out there and enjoy the world with the people you care about!</p>
                <p>Don&apos;t worry, we will make sure everyone plays fair!</p>
            </div>
            <div className='walkthrough-modal-btn'>
                <button onClick={() => closeModal()}>Finish</button>
                <p>6/6</p>
            </div>
        </div>
    )
}
