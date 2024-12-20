import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center p-4  shadow-md">

        <Image
          className="hover:cursor-pointer"
          src={"/Instagram.png"}
          width={115}
          height={40}
          alt="InstagramLogo"
        />

   <div className="flex">
    <div className="relative w-64">
          <Image
            src={"/search-icon.png"}
            alt="search-icon"
            width={15}
            height={15}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 bg-gray-800"
          />
        </div>


        <Image
          className="hover:cursor-pointer"
          src={"/notif.png"}
          width={30}
          height={30}
          alt="NotificationIcon"
        />
   </div>
        
      </nav>

      {/* Divider */}
      <div className="w-full h-[0.1px] bg-gray-300"></div>
    </header>
  );
}
