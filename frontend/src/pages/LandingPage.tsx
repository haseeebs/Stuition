import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <section id="section1" className="min-h-screen bg-third p-8 flex items-center justify-center">
          <h2 className="text-3xl font-bold">Section 1</h2>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;