import React from "react";
import { Schedule } from "../icons/schedule";
import { Time } from "../icons/time";
import { Maps } from "../icons/maps";
import useMenuStore from "../state/menu";
import { twMerge } from "tailwind-merge";
import { Love } from "../icons/love";
import { AnimatePresence, motion } from "framer-motion";
import SlideComp, { Direction } from "../components/slide-comp";
import { variants } from "../App";
import {RulesIcon} from "../icons/RulesIcon.tsx";

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  const { activeMenu, changeMenu } = useMenuStore();
  return (
    <div className="font-mulish w-screen h-screen bg-violet-400 flex justify-center overflow-hidden">
      <div className="w-screen md:w-[640px] bg-[#f9f9fb] bg-[url(/img/background.jpeg)] bg-center bg-cover h-screen relative flex items-center justify-center">
        {/*<div className="absolute z-0 left-0 w-full h-full">*/}
        {/*  <img src="/img/background.jpeg" className="object-center object-cover" alt="ornamen-top" />*/}
        {/*</div>*/}
        <div className="relative z-50">{props.children}</div>
        <div className="absolute md:block bottom-10 left-0 z-50 w-screen md:w-[640px] flex justify-center">
          <div className="w-10/12 md:w-full h-14 flex justify-around gap-6">
            {icons.map((Icon, idx) => {
              return (
                <SlideComp
                  key={idx}
                  direction={
                    idx === 0
                      ? Direction.Left
                      : idx === 4
                      ? Direction.Right
                      : Direction.Up
                  }
                  className="w-full h-full"
                >
                  <div
                    className={twMerge(
                      "bg-gradient-to-t from-amber-600 to-amber-300 rounded w-full h-full p-2 fill-black stroke-black text-black flex justify-center items-center",
                      activeMenu === idx
                        ? "fill-amber-800 stroke-amber-800 text-amber-800 bg-amber-600"
                        : ""
                    )}
                    onClick={() => changeMenu(idx)}
                  >
                    <Icon />
                  </div>
                </SlideComp>
              );
            })}
          </div>
        </div>
        {/*<div className="absolute bottom-0 left-0 w-full">*/}
        {/*  <img src="/img/bg_ornamen_bot.png" alt="ornamen-top" />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

const icons = [Schedule, Maps, Time, RulesIcon, Love];

export default MainLayout;
