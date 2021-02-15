import Form from "../components/Form";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar isLogin={true} />
      <Form />
    </div>
  );
}
