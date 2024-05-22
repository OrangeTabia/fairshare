import './SecondaryNavigation.css';

function SecondaryNavigation({ pageTitle }) {
    return (
        <header id="secondary-nav-header">
            <h2 id="page-title">{pageTitle}</h2>
            <nav>
                <div>Add Expense Modal</div>
                <div>Settle Up Modal</div>
            </nav>
        </header>
    )
}

export default SecondaryNavigation;
