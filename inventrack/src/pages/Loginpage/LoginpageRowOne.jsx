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
<div className="mb-[26px] flex flex-col gap-3.5">
  <div className="flex flex-col gap-3.5">
    <div className="flex flex-col items-start gap-1 p-2.5">
      <Text as="p" className="text-gray-900_01">
        Email
      </Text>
      <Input
        shape="round"
        type="email"
        name="email"
        placeholder={"Enter your email"}
        className="self-stretch border border-gray-500"
      />
    </div>
    <div className="mx-2.5 mb-2.5 flex flex-col items-start gap-1 md:mx-0">
      <Text as="p" className="text-gray-900_01">
        Password
      </Text>
      <Input
        shape="round"
        type="password"
        name="password"
        placeholder={"minimum 8 characters"}
        className="self-stretch border border-gray-500"
      />
    </div>
  </div>
  <div className="flex justify-between gap-5 p-2.5">
    <CheckBox
      name="rememberme"
      label="Remember me"
      id="rememberme"
      className="gap-4 text-[16px] text-black-900"
    />
    <a href="#">
      <Text as="p" className="!font-medium !text-gray-900_01">
        Forgot password?
        <Text>
    </a>
  </div>
  <a href="#" target= "_blank">
    <Button
    color="gray_900_01"
    size="xl"
    className="self-stretch rounded-[20px] border border-solid border-gray-500">
      Login
    </Button>
  </a>
  <div className="flex p-2.5">
    <Text as="p"className="!font-medium!text-gray-900_01">
      <span className="text-gray-900_02">Not registered yet?</span>
      <span className="text-gray-900_01">nbsp;Create&nbsp;</span>
      <span className="text-gray-900_01">a new account</span>
    </Text>
    </div>
    </div>
    </div>
    </div>
    <div className="flex-1 p-25 md:self-stretch">
      <Img src="images/img_image_3.png " alt="Imagethree" className="h-[780px] w-full object-cover md:h-auto"/>
      </div>
      </div>
      </div>
      </div>
    );
}
