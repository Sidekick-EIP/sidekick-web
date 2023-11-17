import Link from "next/link";
import { useRouter } from "next/router";

const Stepper = () => {
  const { pathname } = useRouter();

  const getLinkClass = (path: string) => {
    console.log(path === pathname);
    return (
      "text-md text-25 font-semibold " + (path === pathname ? "text-orange-400" : "text-gray-300")
    );
  };

  return (
    <div className="flex items-center justify-center space-x-10">
      <Link href={"/signup"} className={getLinkClass("/signup")}>Compte</Link>
      <Link href={"/signup/infos"} className={getLinkClass("/signup/infos")}>Infos personnel</Link>
      <Link href={"/signup/sport"} className={getLinkClass("/signup/sport")}>Sport</Link>
    </div>
  );
};

export default Stepper;