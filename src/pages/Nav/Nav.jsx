import './Nav.scss'

const Nav = () => {
    return (
        <div className={'nav'}>
            <ul>
                <li>
                    <a href="/">Pizza builder</a>
                </li>
                <li>
                    <a href="/">Ingredients</a>
                </li>
            </ul>
        </div>
    );
};

export default Nav;