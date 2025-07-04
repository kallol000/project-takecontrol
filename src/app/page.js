import Home from "./home/page";
import { fetchProjects } from "./lib/data";
// Supports weights 200-800
import '@fontsource-variable/plus-jakarta-sans';
// Supports weights 100-900
// import '@fontsource-variable/inter';

export default async function Main() {

  const data = await fetchProjects()
  // console.log(data)

  return (
    <div>
        <Home data = {data}></Home>
    </div>
  );
}
