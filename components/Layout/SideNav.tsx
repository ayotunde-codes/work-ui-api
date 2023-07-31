import Button from "../Button";
import Hambuger from "@/assets/icons/hamburger.svg";
import React from "react";
import { Avatar } from "antd";

export default function SideNav() {
  return (
    <aside className="sticky top-0 left-0 h-screen bg-white w-max shadow-[0px_4px_23px_0px_rgba(0,0,0,0.05)] py-[50px] px-[12px]">
      <nav className="grid gap-[94px] h-full grid-rows-[max-content_max-content_auto] w-max">
        <Button className="pb-0">
          <Hambuger />
        </Button>

        <div className="grid gap-[46px]">
          <Button>
            <img src="/home-icon.png" width={24} />
          </Button>

          <Button>
            <img src="/list-icon.png" width={24} />
          </Button>
        </div>

        <div className="grid gap-[24px] self-end  grid-rows-[max-content_max-content]">
          <Button>
            <Avatar size={47} className="!bg-[#1D4ED8] !text-white]">
              NT
            </Avatar>
          </Button>
        </div>
      </nav>
    </aside>
  );
}
