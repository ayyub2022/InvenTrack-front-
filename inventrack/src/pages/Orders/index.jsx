import { Helmet } from "react-helmet";
import { closeSVG } from "../../assets/images";
import { Button, Img, Heading, Text, CheckBox, SelectBox, DatePicker, Input } from "../../components";
import  { ReactTable } from "../../components/ReactTable";
import Sidebar11 from "../../components/Sidebar11";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1"},
  { label: "Option2", value: "option2"},
  { label: "Option3", value: "option3"},
];
const table1Data = [
  {
    roworderid: "#7676",
    rowdate: "06/30/2022",
    rowcustomer: "Ramesh Chaudhary",
    rowsaleschannel: "Store name",
    rowdestination: "Lalitpur",
    rowitems: "3",
    rowstatus: "Completed",
  },
  {
    roworderid: "#7676",
    rowdate: "06/30/2022",
    rowcustomer: "Ramesh Chaudhary",
    rowsaleschannel: "Store name",
    rowdestination: "Lalitpur",
    rowitems: "3",
    rowstatus: "Pending",
  },
  {
    roworderid: "#7676",
    rowdate: "06/30/2022",
    rowcustomer: "Ramesh Chaudhary",
    rowsaleschannel: "Store name",
    rowdestination: "Lalitpur",
    rowitems: "3",
    rowstatus: "Completed",
  },
  {
    roworderid: "#7676",
    rowdate: "06/30/2022",
    rowcustomer: "Ramesh Chaudhary",
    rowsaleschannel: "Store name",
    rowdestination: "Lalitpur",
    rowitems: "3",
    rowstatus: "Completed",
  },
  {
    roworderid: "#7676",
    rowdate: "06/30/2022",
    rowcustomer: "Ramesh Chaudhary",
    rowsaleschannel: "Store name",
    rowdestination: "Lalitpur",
    rowitems: "3",
    rowstatus: "Completed",
  }
];

export default function OrdersPage() {
  const [searchBarValue1, setSearchBarValue1] = React.useState("");
  const tableColumns = React.useMemo(() => {
      const tableColumnHelper = createColumnHelper();
      return [
          tableColumnHelper.accessor("columngroup238", {
              cell: (info) => (
                  <div className="flex flex-col items-center px-3">
                      <CheckBox name="group239" label="" id="group239" />
                  </div>
              ),
              header: (info) => (
                  <div className="flex flex-col items-center px-3 py-4">
                      <CheckBox name="group238" label="" id="group238" />
                  </div>
              ),
              meta: { width: "46px" },
          }),
          tableColumnHelper.accessor("roworderid", {
              cell: (info) => (
                  <div className="ml-3.5 flex px-4">
                      <Text as="p">{info.getValue()}</Text>
                  </div>
              ),
              header: (info) => (
                  <div className="ml-3.5 flex p-3">
                      <Text size="textxl" as="p">order ID
                      </Text>
                  </div>
              ),
              meta: { width: "110px" },
          }),
          tableColumnHelper.accessor("rowdate", {
              cell: (info) => (
                  <div className="ml-7 flex px-4">
                      <Text as="p">{info.getValue()}</Text>
                  </div>
              ),
              header: (info) => (
                  <div className="ml-7 flex p-3">
                      <Text size="textxl" as="p">Date</Text>
                  </div>
              ),
              meta: { width: "144px" },
          }),
          tableColumnHelper.accessor("rowcustomer", {
              cell: (info) => (
                  <div className="ml-3 flex flex-1 justify-center px-3">
                      <Text as="p">{info.getValue()}</Text>
                  </div>
              ),
              header: (info) => (
                  <div className="ml-3 flex flex-1 justify-center p-3">
                      <Text size="textxl" as="p">Customer</Text>
                  </div>
              ),
              meta: { width: "186px" },
          }),
          tableColumnHelper.accessor("rowsaleschannel", {
              cell: (info) => (
                  <div className="ml-1.5 flex px-4">
                      <Text as="p">{info.getValue()}</Text>
                  </div>
              ),
              header: (info) => (
                  <div className="ml-1.5 flex px-1.5 py-3">
                      <Text size="textxl" as="p">Sales channel</Text>
                  </div>
              ),
              meta: { width: "152px" },
          }),
          tableColumnHelper.accessor("rowdestination", {
              cell: (info) => (
                  <div className="ml-[22px] flex px-4">
                      <Text as="p">{info.getValue()}</Text>
                  </div>
              ),
              header: (info) => (
                <div className="ml-[22px] flex p-3">
                    <Text size="textxl" as="p">Destination</Text>
                </div>
              ),
              meta: { width: "156px" },
          }),
          table1ColumnHelper.accesor("rowitems", {
            cell: (info) => (
              <div className="ml-[38px] flex px-4">
                <Text as="p">{info.getValue()}</Text>
              </div>
            ),
            header: (info) => (
              <div className="ml-[38px] flex p-3">
                <Text size="textxl" as="p">Items</Text>
              </div>
            ),
            meta: { width: "120px" },
          }),
          table1ColumnHelper.accessor("rowstatus", { cell : (info) => (
            <div className= "ml-5 flex flex-1 jutify -center px-3"><Text
            as="p"
            className="flex items-center justify-center rounded-[14px] bg-green-400 px-[34px] py--0.5 !text-blue_gray-900 sm:px-5">
              {info.getValue()}
              </Text>
              </div>
          ),
          header: (info) => (
            <div className="ml-5 flex flex-1 justify-center p-3">
              <Text size="textxl" as="p">
                Status
              </Text>
            </div>
          ),
          meta: { width: "192px" },
        }),
      ];
  }, []);

  return (
    <>
      <Helmet>
        <title>InvenTrack</title>
        <meta name="description" content="Web site created using create-react-app"/>
        </Helmet>
        <div className="w-full bg-blue_gray-50 shadow-md">
      <header className="bg-white-a700">
            <div className="relative h-[90px] content-center md:h-auto">
            <div className="container-xs flex items-center justify-between gap-5 md:px-5">
              <div className="flex w-[4%] flex-col gap-2 p-2">
                  <div className="h-[2px] bg-black-900"/>
                  <div className="h-[2px] bg-black-900"/>
                  <div className="h-[2px] bg-black-900"/>
              </div>
              <div className="mr-[22px] flex w-[16%] items-center justify-center gap-3.5">
           <a href="#">
             <Button shape="round" className="w-[34px]">
               <img src="images/img_search.svg" />
              </Button>
          </a>
          <a href="#">
            <img src="images/img_bell.svg" alt="Bell" className="h-[24px] w-[24px]" />
          </a>
          <div className="flex flex-1 items-center justify-between gap-5 p-2.5">
            <a href="#">
              <img
                src="images/img_ellipse1.png"
                alt="Image"
                className="h-[40px] w-[40px] rounded-[20px] object-cover"
              />
            </a>
            <Heading size="headingxs" as="p">
              Ann Lee
            </Heading>
            <img src="images/img_down.svg" alt="Down" className="h-[8px] w-[8px]" />
          </div>
        </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max flex-1 bg-white_a700 py-2.5">
          <div className="container-xs flex items-center justify-between gap-5 md:px-5">
            <div className="flex w-[4%] flex-col gap-2 p-2">
            <div className="h-[2px] bg-black-900" />
            <div className="h-[2px] bg-black-900"/>
            <div className="h-[2px] bg-black-900" />
        </div>
        <div className="flex w-[18%] items-center justify-center gap-3.5 p-1">
          <a href="#">
            <Button shape="round" className="w-[34px]">
              <img src="images/img_search.svg" />
            </Button>
          </a>
          <a href="#">
            <img src="images/img_bell.svg" alt="Bell" className="h-[24px] w-[24px]" />
          </a>
          <div className="flex flex-1 items-center justify-center gap-1 p-2.5">
            <a href="#">
              <img
                src="images/img_ellipse1.png"
                alt="Image"
                className="h-[40px] w-[40px] rounded-[20px] object-cover"
              />
            </a>
            <Heading size="headingxs" as="p">
              Ann Lee
            </Heading>
            <img src="images/img_down.svg" alt="Down" className="h-[8px] w-[8px]" />
          </div>
        </div>
      </div>
    </div>
    </div>
      </header>
<div className="flex items-start gap-2">
  <SideBar11 className="bg-gradient" />
  <div ClassName="absolute bottom-0 left-0 right-0 top-0 my-auto ml-2.5 mr-5 flex h-max flex-1 flex-col gap-2.5 bg-white-a700 px-2.5 py-[124px] md:mx-0 md:py-5">
    <div className="flex items-center border-b border-solid border-indigo-50 md:flex-col">
    <Input
  color="blue_gray_100"
  size="xs"
  variant="outline"
  shape="round"
  name="search"
  placeholder={`Search order ID`}
  value={searchBarValue}
  onChange={(e) => setSearchBarValue(e.target.value)}
  prefix={
    <img
      src="images/img_search_gray_900_01.svg"
      alt="Search"
      className="h-[24px] w-[24px] cursor-pointer"
    />
  }
  suffix={
    searchBarValue?.length > 0 ? (
      <CloseSVG onClick={() => setSearchBarValue("")} height={24} width={24} fillColor="#10153fff" />
    ) : null
  }
  className="w-[38%] gap-2.5 text-blue_gray-100 md:w-full"
/>
<div className="flex flex-1 justify-end gap-5 p-5 md:self-stretch sm:flex-col">
  <Datepicker
    name="datepicker"
    className="w-[6%] rounded-[5px] border border-solid border-blue_gray-100 bg-white-A700 p-2 sm:w-full"
/>
<SelectBox
  size="sm"
  shape="round"
  indicator={<img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[24px] w-[24px]" />}
  name="arrowdown"
  placeholder={`Sales`}
  options={dropDownOptions}
  className="w-[18%] gap-2.5 border border-solid border-blue_gray-100 sm:w-full"
/>
<SelectBox
  size="sm"
  shape="round"
  indicator={<img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[24px] w-[24px]" />}
  name="arrowdown_one"
  placeholder={`Status`}
  options={dropDownOptions}
  className="w-[20%] gap-2.5 border border-solid border-blue_gray-100 sm:w-full"
/>
<SelectBox
  size="sm"
  shape="round"
  indicator={<img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[24px] w-[24px]" />}
  name="arrowdown_two"
  placeholder={`Filter`}
  options={dropDownOptions}
  className="w-[16%] gap-2.5 border border-solid border-blue_gray-100 sm:w-full"
/>
</div>
</div>
<ReactTable
  size="xs"
  bodyProps={{ className: ""}}
  headerProps={{ className: "border-black-900 border-b border-solid"}}
  cellProps={{ className: "border-black-900 border-b border-solid"}}
  className="mb-[142px] md:block md:overflow-x-auto md:whitespace-nowrap"
  columns={table1Columns}
  data={table1Data}
  />
  </div>
  <div className="absolute left-0 right-0 top-2.5 my-auto ml-auto mr-2 flex flex-1 items-center justify-center border-b border-solid border-indigo-50 md:relative md:mr-0 md:flex-col">
  <Heading as="h1" className="md:px-5">
    Orders
  </Heading >
<div className="flex flex-1 justify-end p-5 md:flex-col md:self-stretch md:px-5">
  <Button
    color="purple_700"
    size="lg"
    variant="outline"
    shape="round"
    className="min-w-[202px]"
  >
    Export to excel
  </Button>
  <Button
    color="deep_purple_500"
    size="lg"
    variant="outline"
    shape="round"
    className="ml-5 min-w-[196px] md:ml-0"
  >
    Import Orders
  </Button>
  <Button
    size="lg"
    variant="gradient"
    shape="round"
    color="purple_700 deep_purple_500"
    leftIcon={<Img src="images/img_close.svg" alt="Close" className="h-[14px] w-[14px]" />}
    className="ml-5 min-w-[192px] gap-2.5 md:ml-0"
  >
    New Orders
  </Button>
</div>
</div>
</div>
</div>
</>
);
}




