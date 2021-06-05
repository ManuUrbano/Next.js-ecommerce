import TopBar from "./TopBar";
import Menu from "./Menu";

export default function Header({ categories, subCategories }) {
    return (
        <div className="header">
            <TopBar/>
            <Menu categories={categories} subCategories={subCategories} />
        </div>
    )
}
