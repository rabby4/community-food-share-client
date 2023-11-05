
const Home = () => {
    return (
        <div>
            <div className="hero min-h-[700px]" style={{ backgroundImage: 'url(https://149797850.v2.pressablecdn.com/wp-content/uploads/2023/07/Feeding-Families-mother-and-daughter.png)' }}>
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="max-w-7xl">
                    <div className="text-white text-center">
                        <h1 className="mb-5 text-7xl font-bold italic">Working Together, <br />To Feed Our Neighbors</h1>
                        <p className="mb-5">Community Food Share is a food bank fighting hunger in Boulder and Broomfield Counties by providing access to fresh, <br />nutritious food through our programs and local partners. To read more about our mission and how we work to ensure <br />all of our neighbors have access to the food they need, click the link below.</p>
                        <button className="btn bg-lime-500 hover:bg-lime-600 text-white border-none px-8">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;