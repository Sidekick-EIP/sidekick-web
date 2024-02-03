import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/router";

const Stepper = () => {
  const mobile = useMediaQuery('(max-width:639px)');
  const { pathname } = useRouter();

  const getLinkClass = (path: string) => {
    console.log(path === pathname);
    return (
      "text-md text-25 font-semibold " + (path === pathname ? "text-orange-400" : "text-gray-300")
    );
  };

  return (
    mobile ? (
      <div className="flex items-center justify-center space-x-10">
        <Link href={"/signup"} className={getLinkClass("/signup")}>1</Link>
        <Link href={"/signup/infos"} className={getLinkClass("/signup/infos")}>2</Link>
        <Link href={"/signup/sport"} className={getLinkClass("/signup/sport")}>3</Link>
      </div>
    ) : (
      <div className="hidden sm:flex items-center justify-center space-x-10">
        <Link href={"/signup"} className={getLinkClass("/signup")}>Compte</Link>
        <Link href={"/signup/infos"} className={getLinkClass("/signup/infos")}>Infos</Link>
        <Link href={"/signup/sport"} className={getLinkClass("/signup/sport")}>Sport</Link>
      </div>
    )
  );
};

export default Stepper;