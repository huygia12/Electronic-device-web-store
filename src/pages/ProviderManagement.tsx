import { ProviderDialog } from "@/components/providerDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Provider } from "@/declare";
import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

const colName: string[] = [
  "STT",
  "TÊN NHÀ PHÂN PHỐI",
  "MÃ NHÀ PHÂN PHỐI",
  "SỐ SẢN PHẨM",
  "THAO TÁC",
];

const providers: Provider[] = [
  {
    id: "00011",
    name: "MSI",
    products: 51,
  },
  {
    id: "00012",
    name: "Lenovo",
    products: 23,
  },
  {
    id: "00013",
    name: "Acer",
    products: 25,
  },
  {
    id: "00014",
    name: "Sony",
    products: 23,
  },
  {
    id: "00015",
    name: "Asus",
    products: 22,
  },
  {
    id: "00016",
    name: "Iphone",
    products: 81,
  },
  {
    id: "00017",
    name: "ThinkPad",
    products: 11,
  },
  {
    id: "00018",
    name: "Bphone",
    products: 24,
  },
  {
    id: "00019",
    name: "Samsung",
    products: 31,
  },
  {
    id: "00020",
    name: "Vsmart",
    products: 31,
  },
  {
    id: "00022",
    name: "Dell",
    products: 41,
  },
];

const ProviderManagement = () => {
  const [existingproviders, setExistingProvider] = useState(providers);

  const deleteProvider = (providerID: string) => {
    const temp = existingproviders.filter(
      (provider) => provider.id !== providerID
    );
    setExistingProvider(temp);
  };

  return (
    <>
      <Card className="rounded-2xl shadow-lg my-8">
        <CardContent className="flex justify-between p-6">
          <ProviderDialog formTitle="Thêm nhà phân phối mới">
            <Button variant="positive" className="text-xl">
              Thêm nhà phân phối mới
              <Plus />
            </Button>
          </ProviderDialog>
          <div className="relative flex-1 md_grow-0 h-[2.5rem]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="h-full text-xl w-full rounded-lg bg-background pl-8 md_w-[200px] lg_w-[336px]"
            />
          </div>
        </CardContent>
      </Card>

      {/** Table */}
      <Card className="rounded-2xl shadow-lg mb-4">
        <CardHeader className="py-6 px-10">
          <CardTitle className="text-8">Danh sách các nhà phân phối</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col px-6 pb-4">
          <div className="overflow-auto relative h-[58vh]">
            <Table>
              <TableHeader className="border-b-secondary-foreground border-b-2 sticky top-0 bg-white">
                <tr>
                  {colName.map((item, key) => {
                    return (
                      <TableHead
                        key={key}
                        className=" text-center text-black font-extrabold text-[1rem]"
                      >
                        {item}
                      </TableHead>
                    );
                  })}
                </tr>
              </TableHeader>
              <TableBody>
                {existingproviders.map((provider, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-base">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center  text-base">
                      {provider.name}
                    </TableCell>
                    <TableCell className="text-center text-base">
                      {provider.id}
                    </TableCell>
                    <TableCell className="text-center text-base">
                      {provider.products}
                    </TableCell>
                    <TableCell className="flex items-center justify-center space-x-2">
                      <ProviderDialog
                        formTitle="Sửa thông tin nhà phân phối"
                        provider={provider}
                      >
                        <Button variant="neutral">
                          <SquarePen />
                        </Button>
                      </ProviderDialog>
                      <Button
                        variant="negative"
                        onClick={() => deleteProvider(provider.id)}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/** Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ProviderManagement;