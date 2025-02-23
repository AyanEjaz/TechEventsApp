"use client";
import Link from "next/link";
import { Button } from "primereact/button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen">
      <h1>Welcome to Tech Events</h1>
      <Link href="/techEvents">
        <Button label="Go to Tech Events" />
      </Link>
    </div>
  );
};

export default Home;
