import React from "react";

export default function TabsRender({ component1, component2, title1, title2 }) {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-zinc-600"
                  : "text-zinc-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              {title1}
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-zinc-600"
                  : "text-zinc-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              {title2}
            </a>
          </li>
        </ul>
        <div className="tab-content tab-space">
          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
            {component1}
          </div>
          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
            {component2}
          </div>
        </div>
      </div>
    </div>
  );
}
