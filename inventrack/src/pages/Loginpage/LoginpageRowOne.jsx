import { Img, Text, Button, CheckBox, Input } from "../../components";
import InventoryManagement from "../../components/InventoryManagement";
import React from "react";

export default function LoginpageRowOne() {
  return (
    <div className="flex">
      <div className="container-xs flex px-[30px] md:px-5">
        <div className="flex w-full gap-2.5 rounded-[5px] bg-white-A700 p-2.5 md:flex-col">
          <div className="flex w-[34%] flex-col gap-2.5 p-2.5 md:w-full">
            <InventoryManagement
              registerLink="Login"
              manageInventoryText="See your growth and get support!"
              className="gap-7"
            />
            <div className="mb-1 flex flex-col gap-3.5 p-2.5">
              <Button
                color="black_900"
                size="sm"
                variant="outline"
                rightIcon={
                  <Img
                    src="images/img_flatcoloriconsgoogle.svg"
                    alt="flat-color-icons-google"
                    className="h-[32px] w-[32px]"
                  />
                }
                className="gap-2.5 self-stretch rounded-[26px]">
                Sign in with google
                </Button>