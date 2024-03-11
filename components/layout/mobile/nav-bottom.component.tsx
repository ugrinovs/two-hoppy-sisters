"use client";
import classNames from "classnames";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import InfoIcon from "@mui/icons-material/Info";
import { SfButton } from "@storefront-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarBottom() {
  const router = useRouter();
  const items = [
    {
      label: "Početna",
      icon: <SportsBarIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      label: "Pozovite",
      icon: <PhoneInTalkIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      label: "Info",
      icon: <InfoIcon sx={{ fontSize: "2.5rem" }} />,
      link: "/admin",
    },
  ];

  const [selectedItem, setselectedItem] = useState("");
  function onClickHandler(itemLabel: string, itemLink?: string) {
    setselectedItem(itemLabel);
    console.log("itemLink", itemLink);
    if (itemLink) {
      router.push(itemLink);
    }
  }

  return (
    <nav className="max-w-[500px] bottom-0 w-full left-0 fixed flex flex-row items-stretch">
      {items.map((item) => (
        <SfButton
          key={item.label}
          variant="tertiary"
          slotPrefix={item.icon}
          className={classNames(
            "py-4 flex flex-col h-full w-full rounded-none bg-primary-700 text-white hover:text-white hover:bg-primary-800 active:text-white active:bg-primary-900 items-center",
            { "text-white bg-primary-900": selectedItem === item.label },
          )}
          onClick={() => onClickHandler(item.label, item.link)}
        >
          {item.label}
        </SfButton>
      ))}
    </nav>
  );
}
