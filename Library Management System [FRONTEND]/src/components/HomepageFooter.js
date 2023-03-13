import { useEffect, useState } from "react";

const HomepageFooter = () => {

  const [realtimeToday, setRealtimeToday] = useState(
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRealtimeToday(
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(new Date())
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const content = (
    <section>
      <section className="homepage_footer_img">
        <img
          src="https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png"
          alt="Library Img1"
        />
      </section>
      <footer className="homepage_footer">
        <nav className="homepage_footer_nav">
          <p className="text">Current User: </p>
          <p className="text">Status: </p>
        </nav>
        <nav className="homepage_footer_nav">
          <p className="text">{realtimeToday}</p>
        </nav>
      </footer>
    </section>
  );
  return content;
};

export default HomepageFooter;
