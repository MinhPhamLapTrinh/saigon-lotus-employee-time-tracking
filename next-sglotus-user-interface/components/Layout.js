import NavBar from "./NavBar";
export default function Layout(props) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-purple-300">{props.children}</div>
    </>
  );
}
