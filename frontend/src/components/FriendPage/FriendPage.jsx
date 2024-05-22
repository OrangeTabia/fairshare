import { useParams } from "react-router-dom";

function FriendPage() {
    const { friendId } = useParams();

    return <h1>Friend {friendId} Page</h1>
}

export default FriendPage;
