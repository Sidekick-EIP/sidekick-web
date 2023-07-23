import Link from "next/link";
import { useRouter } from "next/router";

const Stepper = () => {
  const { pathname } = useRouter();

  const getLinkClass = (path: string) => {
    return (
      "text-md font-semibold " + (path === pathname ? "text-orange-400" : undefined)
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