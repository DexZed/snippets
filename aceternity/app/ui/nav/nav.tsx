"use client";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/app/components/ui/navbar-menu";
import { cn } from "@/app/lib/utils";
import React, { useState } from "react";

type Props = { className?: string };

function Nav({ className }: Props) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <nav
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem active={active} setActive={setActive} item="Assignments">
          <div className="flex flex-col text-xm space-y-2">
            <HoveredLink href={"#"}>See All</HoveredLink>
            <HoveredLink href={"#"}> Create one</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem active={active} setActive={setActive} item="Featured">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Assignment 1"
              href=""
              src="https://i.ibb.co.com/s6D0J5n/npc1.jpg"
              description="First Assignment"
            />
            <ProductItem
              title="Assignment 2"
              href=""
              src="https://i.ibb.co.com/KzQJFh3/img1.jpg"
              description="Second Assignment"
            />
            <ProductItem
              title="Assignment 3"
              href=""
              src="https://i.ibb.co.com/Cv88yZt/onesan2.jpg"
              description="Third Assignment"/>
          </div>
        </MenuItem>
      </Menu>
    </nav>
  );
}

export default Nav;
