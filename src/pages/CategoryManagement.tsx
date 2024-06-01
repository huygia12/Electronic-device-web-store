import { CategoryDialog } from "@/components/categoryDialog";
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
import { Category } from "@/declare";
import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

const colName: string[] = [
  "STT",
  "TÊN DANH MỤC",
  "MÃ DANH MỤC",
  "SỐ SẢN PHẨM",
  "THAO TÁC",
];

const categories: Category[] = [
  {
    id: "00011",
    name: "May Tinh",
    products: 51,
  },
  {
    id: "00012",
    name: "May Tinh",
    products: 23,
  },
  {
    id: "00013",
    name: "May Tinh",
    products: 25,
  },
  {
    id: "00014",
    name: "May Tinh",
    products: 23,
  },
  {
    id: "00015",
    name: "May Tinh",
    products: 22,
  },
  {
    id: "00016",
    name: "May Tinh",
    products: 81,
  },
  {
    id: "00017",
    name: "May Tinh",
    products: 11,
  },
  {
    id: "00018",
    name: "May Tinh",
    products: 24,
  },
  {
    id: "00019",
    name: "May Tinh",
    products: 31,
  },
  {
    id: "00020",
    name: "May Tinh",
    products: 31,
  },
  {
    id: "00022",
    name: "May Tinh",
    products: 41,
  },
];

const CategoryManagement = () => {
  const [existingCategories, setExistingCategories] = useState(categories);
  const [selectedID, setSelectedID] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const deleteCategory = (categoryID: string) => {
    const temp = existingCategories.filter(
      (category) => category.id !== categoryID
    );
    setExistingCategories(temp);
  };

  const handleEditEventCategory = (name: string) => {
    const temp = existingCategories.map((cate) => cate);
    for (const cate of temp) {
      if (cate.id === selectedID) {
        cate.name = name;
      }
    }

    setExistingCategories(temp);
  };

  const handleDialogTriggerEvent = (id: string, name: string) => {
    console.log(id, name);
    setSelectedName(name);
    setSelectedID(id);
  };

  const handleAddCategory = () => {};

  return (
    <>
      <Card className="rounded-2xl shadow-lg my-8">
        <CardContent className="flex justify-between p-6">
          <CategoryDialog
            formTitle="Thêm danh mục mới"
            acceptHandler={handleAddCategory}
          >
            <Button variant="positive" className="text-xl">
              Thêm danh mục mới
              <Plus />
            </Button>
          </CategoryDialog>
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
      <Card className="rounded-2xl shadow-lg mb-8">
        <CardHeader className="py-6 px-10">
          <CardTitle className="text-8">Phân loại danh mục</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col px-6 pb-4">
          <div className="overflow-auto relative h-[58vh]">
            <Table>
              <TableHeader className="border-b-secondary-foreground border-b-2 sticky top-0 bg-white shadow-lg">
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
                {existingCategories.map((cate, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-base">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center  text-base">
                      {cate.name}
                    </TableCell>
                    <TableCell className="text-center text-base">
                      {cate.id}
                    </TableCell>
                    <TableCell className="text-center text-base">
                      {cate.products}
                    </TableCell>
                    <TableCell className="flex items-center justify-center space-x-2">
                      <CategoryDialog
                        formTitle="Sửa thông tin danh mục"
                        category={cate}
                        selectedCategoryLastValue={selectedName}
                        acceptHandler={handleEditEventCategory}
                      >
                        <Button
                          variant="neutral"
                          onClick={() =>
                            handleDialogTriggerEvent(cate.id, cate.name)
                          }
                        >
                          <SquarePen />
                        </Button>
                      </CategoryDialog>
                      <Button
                        variant="negative"
                        onClick={() => deleteCategory(cate.id)}
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

export default CategoryManagement;
