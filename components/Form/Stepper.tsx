import Link from "next/link";
import { useRouter } from "next/router";

const Stepper = () => {
  const { pathname } = useRouter();

  const getLinkClass = (path: string) => {
    console.log(path === pathname);
    return (
      "text-md text-25 font-semibold " + (path === pathname ? "text-orange-400" : "text-white")
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Link href={"/signup"} className={getLinkClass("/signup")}>Email</Link>
      <Link href={"/signup/infos"} className={getLinkClass("/signup/infos")}>Infos</Link>
      <Link href={"/signup/sport"} className={getLinkClass("/signup/sport")}>Sport</Link>
    </div>
  );
};

export default Stepper;