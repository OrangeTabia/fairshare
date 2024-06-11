import { useModal } from '../../../context/Modal'
import './WalkthroughModal.css'


const WalkthroughModal = () => {
    const { setModalContent } = useModal();

    const handleModalSwap = () => {
        const modalComponent = <WalkthroughModal2 />
        setModalContent(modalComponent);
    }

    return (
        <div>
            <h1>Welcome to FairShare!</h1>
            <p>Click next to continue.</p>
            <div>
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
        <div>
            <h1>Dashboard and Expenses</h1>

            <p>If you would like to easily see how much you owe each of your friends or how much they each owe you, check out the Dashboard tab</p>
            <p>If you are looking for a more indepth description of the expenses you are connected to check out the Expenses tab.</p>
            <div>
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
        <div>
            <h1>Friends</h1>

            <p>On the your left you will find a list of all your friends</p>
            <p>You can add more friends by clicking the 'Invite a Friend' button below, or you can click on a
                friend you already have to receive a detailed outline of any open or closed expenses you are a
                part of. Or view any payments you have made </p>
            <div>
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
        <div>
            <h1>Add an Expense</h1>

            <p>To add an expense between you and a friend, click the 'Add Expense' button.</p>
            <p>fill out a short form and your friend will be notified they still owe you for that slice of pizza
                you bought them last week.</p>
            <div>
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
        <div>
            <h1>Settle Up</h1>

            <p>Ready to pay someone back, click the 'Settle Up' button above.</p>
            <p>Select which expense you would like to pay towards, how much you are going to pay, and when you would like to pay it.</p>
            <p>Tada! Your friends love you, you always pay back your debts!</p>
            <div>
                <button onClick={handleModalSwap}>Next</button>
                <p>5/6</p>
            </div>
        </div>
    )
}


const WalkthroughModal6 = () => {
    const { closeModal } = useModal();

    return (
        <div>
            <h1>Get Sharing!</h1>

            <p>It's time to get out there and enjoy the world with the people you care about!</p>
            <p>Don't worry, we will make sure everyone plays fair!</p>
            <div>
                <button onClick={() => closeModal()}>Finish</button>
                <p>6/6</p>
            </div>
        </div>
    )
}
