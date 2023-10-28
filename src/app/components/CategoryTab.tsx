const CategoryTab = () => {
  return (
    <div className="container">
      <div className="category-tab flex items-center justify-center gap-8">
        <div className="category-tab__item text-xl font-bold bg-gray-800 rounded-xl">
          <a className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-no-repeat bg-bottom bg-[length:100%_0px] hover:bg-[length:100%_100%] transition-[background-size] px-2 rounded-xl" href="/packages">All</a>
        </div>
        <div className="category-tab__item">
          <a href="/packages?category=popular">Visa</a>
        </div>
        <div className="category-tab__item">
          <a href="/packages?category=latest">Ticket</a>
        </div>
        <div className="category-tab__item">
          <a href="/packages?category=scholarship">Scholarship</a>
        </div>
      </div>
    </div>
  );
}
 
export default CategoryTab;
